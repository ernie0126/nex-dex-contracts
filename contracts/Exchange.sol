// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
pragma abicoder v2;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {NftOracle} from "./NftOracle.sol";

// @title Nex Exchange smart contract

contract Exchange is Ownable, Pausable, ReentrancyGuard {

  using SafeMath for uint256;

  NftOracle public nftOracle;
  AggregatorV3Interface public priceFeed;

  address public adminAddress; // address of the admin
  address public operatorAddress; // address of the operator
  address public ETHER = address(0);

  uint256 public roundNumber; // current epoch for prediction round
  uint256 public oracleLatestRoundId; // price oracle (Chainlink)
  uint256 public latestPrice; // price oracle (Chainlink)
  bytes32 public latestRequestId; // latest oracle request id (Chainlink)
  bytes32 public lastRequestId; // last oracle request id (Chainlink)

  bytes32 public specId; //bytes32 jobId
  uint256 public payment; //link amount for call oracle in wei 10000000000000000
  address public assetAddress; //nft address
  string public pricingAsset; // ETH or USD

  enum Position {
    Bull,
    Bear
  }

  struct Round {
    uint256 startTimestamp;
    uint256 price;
    uint256 bullMargin;
    uint256 bullMarginDebt;
    uint256 bullAmount;
    uint256 bearMargin;
    uint256 bearMarginDebt;
    uint256 bearAmount;
    uint256 totalAmount;
    address bullAddress;
    address bearAddress;
    bool isActive;
  }

  struct BetInfo {
    Position position;
    uint256 amount;
    bool claimed; // default false
  }

  struct DateAndPrice {
    uint128 date;
    uint128 price;
  }

  mapping(uint256 => Round) public rounds;
  mapping(address => uint256[]) public userRounds;
  mapping(uint256 => mapping(address => BetInfo)) public ledger;
  mapping(address => mapping(address => uint256)) public collateral; //collateral[tokenaddress][useraddress]

  event BetBear(address indexed sender, uint256 indexed epoch, uint256 amount);
  event BetBull(address indexed sender, uint256 indexed epoch, uint256 amount);

  event NewAdminAddress(address admin);
  event NewOperatorAddress(address operator);
  event NewOracle(address oracle);

  event Pause(uint256 indexed epoch);

  event StartRound(uint256 indexed epoch);

  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);

  constructor(
    address _nftOracleAddress,
    bytes32 _specId,
    uint256 _payment,
    address _assetAddress,
    string memory _pricingAsset,
    address _priceFeed
  ) {
    nftOracle = NftOracle(_nftOracleAddress);
    bytes32 requestId = nftOracle.getFloorPrice(_specId, _payment, _assetAddress, _pricingAsset);
    latestRequestId = requestId;
    priceFeed = AggregatorV3Interface(_priceFeed);
  }

  modifier onlyAdmin() {
    require(msg.sender == adminAddress, "Not admin");
    _;
  }

  modifier onlyAdminOrOperator() {
    require(msg.sender == adminAddress || msg.sender == operatorAddress, "Not operator/admin");
    _;
  }

  modifier onlyOperator() {
    require(msg.sender == operatorAddress, "Not operator");
    _;
  }

  modifier notContract() {
    require(!_isContract(msg.sender), "Contract not allowed");
    require(msg.sender == tx.origin, "Proxy contract not allowed");
    _;
  }

  //show collateral balance in usdc
  function showUsdBalance() public view returns (uint256) {
    uint256 ethBalance = collateral[ETHER][msg.sender];
    (, int256 ethPrice, , , ) = priceFeed.latestRoundData();
    return ethBalance.mul(uint256(ethPrice));
  }

  //deposit collateral
  function depositEther() public payable {
    collateral[ETHER][msg.sender] = collateral[ETHER][msg.sender].add(msg.value);
    emit Deposit(ETHER, msg.sender, msg.value, collateral[ETHER][msg.sender]);
  }

  //withdraw collateral
  function withdrawEther(uint256 _amount) public {
    require(
      collateral[ETHER][msg.sender] >= _amount,
      "Desire amount is more than collateral balance"
    );
    collateral[ETHER][msg.sender] = collateral[ETHER][msg.sender].sub(_amount);
    payable(msg.sender).transfer(_amount);
    emit Withdraw(ETHER, msg.sender, _amount, collateral[ETHER][msg.sender]);
  }

  //create bear position by usdc input parameter
  function betBearUsd(uint256 _usdMargin, uint256 leverageRate) public whenNotPaused nonReentrant {
    (, int256 ethPrice, , , ) = priceFeed.latestRoundData();
    uint256 etherAmount = _usdMargin / uint256(ethPrice);
    betBearEth(etherAmount, leverageRate);
  }

  //user decide to create a bear position using ether parameter
  function betBearEth(uint256 _margin, uint256 leverageRate) public whenNotPaused nonReentrant {
    require(
      3 >= leverageRate,
      "The maximum leverage rate is 3"
    );
    require(
      collateral[ETHER][msg.sender] >= _margin,
      "Your bet margin should be lesser than your collateral"
    );
    collateral[ETHER][msg.sender] -= _margin;
    rounds[roundNumber].bearAddress = msg.sender;
    rounds[roundNumber].bearMargin = _margin;
    rounds[roundNumber].bearMarginDebt = _margin*leverageRate - _margin;
    rounds[roundNumber].bearAmount += _margin*leverageRate;
    rounds[roundNumber].totalAmount += _margin*leverageRate;

    if (rounds[roundNumber].bullAmount > 0 && rounds[roundNumber].isActive == false) {
      rounds[roundNumber].isActive = true;
      rounds[roundNumber].startTimestamp = block.timestamp;
      roundNumber += 1;
    }
  }

  //create bull position by usdc input parameter
  function betBullUsdc(uint256 _usdMargin, uint256 leverageRate) public whenNotPaused nonReentrant {
    (, int256 ethPrice, , , ) = priceFeed.latestRoundData();
    uint256 etherAmount = _usdMargin / uint256(ethPrice);
    betBullEth(etherAmount, leverageRate);
  }

  //user decide to create a bull position with ether
  function betBullEth(uint256 _margin, uint256 leverageRate) public whenNotPaused nonReentrant {
    require(
      3 >= leverageRate,
      "The maximum leverage rate is 3"
    );
    require(
      collateral[ETHER][msg.sender] >= _margin,
      "Your bet amount should be lesset than your collateral"
    );
    collateral[ETHER][msg.sender] -= _margin;
    rounds[roundNumber].bullAddress = msg.sender;
    rounds[roundNumber].bullMargin = _margin;
    rounds[roundNumber].bullMarginDebt = _margin*leverageRate - _margin;
    rounds[roundNumber].bullAmount += _margin*leverageRate;
    rounds[roundNumber].totalAmount += _margin*leverageRate;

    if (rounds[roundNumber].bearAmount > 0 && rounds[roundNumber].isActive == false) {
      rounds[roundNumber].isActive = true;
      rounds[roundNumber].startTimestamp = block.timestamp;
      roundNumber += 1;
    }
  }

  //request price from the oracle and save the requrest id
  //should be called befor adjust collateral
  //It should be called every 24 hour
  function requestPrice() public onlyOwner {
    bytes32 requestId = nftOracle.getFloorPrice(specId, payment, assetAddress, pricingAsset);
    if (requestId != latestRequestId) {
      lastRequestId = latestRequestId;
      latestRequestId = requestId;
    }
  }

  //get index price of orders
  function getIndexPrice() public view returns(uint256){
      uint totalPrice;
      uint totalTrades;
    for(uint256 i = 0; i <= roundNumber; i++){
      if(rounds[i].isActive == true){
        totalPrice += rounds[i].price;
        totalTrades ++;
      }
    }
    return totalPrice/totalTrades;
  }

//partial liquidation adjust the debt and margin amount to through user back in the safe rate
//If margin/debt <40 this function should be activate in order to adjust the position and funds
  function PartialLiquidation(address _user) public onlyOwner{
    for (uint256 i = 0; i <= roundNumber; i++) {

      if(rounds[i].bullAddress == _user && rounds[i].isActive == true){
        uint256 margin = rounds[i].bullMargin;
        uint256 bullAmount = rounds[i].bullAmount;
        if(bullAmount*100/margin < 40){
          uint256 partialAmount = (100*bullAmount-60*margin)/40;
          rounds[i].bullMargin -= partialAmount;
          rounds[i].bullMarginDebt -= partialAmount;
          rounds[i].bullAmount -= 2*partialAmount;
          rounds[i].totalAmount -= 2*partialAmount;
        }
      }

      if(rounds[i].bearAddress == _user && rounds[i].isActive == true){
        uint256 margin = rounds[i].bearMargin;
        uint256 bearAmount = rounds[i].bearAmount;
        if(bearAmount*100/margin < 40){
          uint256 partialAmount = (100*bearAmount-60*margin)/40;
          rounds[i].bearMargin -= partialAmount;
          rounds[i].bearMarginDebt -= partialAmount;
          rounds[i].bearAmount -= 2*partialAmount;
          rounds[i].totalAmount -= 2*partialAmount;
        }
      }
    }
  }

  //Admin executive adjust to calculate profit and loss per minute
  //@notice call the requestPrice() per day before that
  //It should be called every 1 hour
  function adjustCollateral() public whenNotPaused onlyOwner {
    uint256 newPrice;
    uint256 oldPrice;
    uint256 newOraclePrice = nftOracle.showPrice(latestRequestId);
    uint256 oldOraclePrice = nftOracle.showPrice(lastRequestId);
    uint256 indexPrice = getIndexPrice();
    //if index preice is near the oracle price(lesser than 20% difference) set the index price as the newPrice
    if(indexPrice*100/newOraclePrice <= 120 && indexPrice*100/newOraclePrice >= 80){
      newPrice = indexPrice;
      oldPrice = oldOraclePrice;
    }else{
      newPrice = newOraclePrice;
      oldPrice = oldOraclePrice;
    }

    if (newPrice != 0 && newPrice / oldPrice < 2 && (newPrice * 10) / oldPrice > 5) {
      for (uint256 i = 0; i <= roundNumber; i++) {
        Round storage round = rounds[i];

        if (round.isActive == true) {
          uint256 reward;

          if (newPrice > oldPrice) {
            reward = (rounds[i].bearAmount * (newPrice - oldPrice)) / oldPrice/24;
            if (
              //check if position amount is lesser than 50% of collater amount start liquidation
              rounds[i].bearMarginDebt > 0 &&
              (rounds[i].bearMarginDebt - rounds[i].bearMargin)*100/rounds[i].bearMargin < 50
            ) {
              collateral[ETHER][rounds[i].bearAddress] += rounds[i].bearMargin;
              rounds[i].totalAmount -= rounds[i].bearAmount;
              rounds[i].bearAddress = address(0);
              rounds[i].bearAmount = 0;
              rounds[i].bearMargin = 0;
              rounds[i].bearMarginDebt = 0;
              rounds[i].isActive = false;
              latestPrice = newPrice;
            } else {
              rounds[i].bearAmount -= reward;
              rounds[i].bearMargin -= reward;
              rounds[i].bullAmount += reward;
              rounds[i].bullMargin += reward;
              latestPrice = newPrice;
            }
          }

          if (newPrice < oldPrice) {
            reward = (rounds[i].bullAmount * (oldPrice - newPrice)) / newPrice/24;
            if (
              //check if position amount is lesser than 50% of collater amount start liquidation
              rounds[i].bullMarginDebt > 0 &&
              (rounds[i].bullMarginDebt - rounds[i].bullMargin)*100/rounds[i].bullMargin < 50
            ) {
              collateral[ETHER][rounds[i].bullAddress] += rounds[i].bullMargin;
              rounds[i].totalAmount -= rounds[i].bullAmount;
              rounds[i].bullAddress = address(0);
              rounds[i].bullAmount = 0;
              rounds[i].bullMargin = 0;
              rounds[i].bullMarginDebt = 0;
              rounds[i].isActive = false;
              latestPrice = newPrice;
            } else {
              rounds[i].bullAmount -= reward;
              rounds[i].bullMargin -= reward;
              rounds[i].bearAmount += reward;
              rounds[i].bearMargin += reward;
              latestPrice = newPrice;
            }
          }

        }
      }
    }
  }
  

  function _isContract(address account) internal view returns (bool) {
    uint256 size;
    assembly {
      size := extcodesize(account)
    }
    return size > 0;
  }
}
