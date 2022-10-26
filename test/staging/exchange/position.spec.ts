import { numToBytes32, stringToBytes } from "@chainlink/test-helpers/dist/src/helpers"
import { assert, expect } from "chai"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { network, deployments, ethers, run } from "hardhat"
import { developmentChains, networkConfig } from "../../../helper-hardhat-config"
import { APIConsumer, LinkToken, MockOracle } from "../../../typechain"

const chainId = 31337;
const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId].jobId!);
const toEther = (e:any) => ethers.utils.formatEther(e);
const toWei = (e: string) => ethers.utils.parseEther(e);

!developmentChains.includes(network.name)
? describe.skip
: describe("Exchange Unit Tests", async function () {
      let exchange:any
      let nftOracle:any
      let linkToken: LinkToken
      let mockOracle: MockOracle
      let usdc:any
      let accounts:any

      beforeEach(async () => {
        await deployments.fixture(["mocks", "nftOracle", "exchange", "token"]);
        linkToken = await ethers.getContract("LinkToken")
        const linkTokenAddress: string = linkToken.address
        nftOracle = await ethers.getContract("NftOracle")
        await run("fund-link", { contract: nftOracle.address, linkaddress: linkTokenAddress })
        exchange = await ethers.getContract("Exchange")
        mockOracle = await ethers.getContract("MockOracle")
        usdc = await ethers.getContract("Token")
        accounts = await ethers.provider.getSigner()
      })

      async function setOraclePrice(newPrice:any){
        const transaction = await nftOracle.getFloorPrice(
          jobId,
          '1000000000000000000',
          process.env.NFT_ADDRESS,
          'ETH'
      )
      const transactionReceipt = await transaction.wait(1)
      if (!transactionReceipt.events) return
      const requestId: string = transactionReceipt.events[0].topics[1]
      await mockOracle.fulfillOracleRequest(requestId, numToBytes32(newPrice*10**14))
      }
      
      it("Test open and close long position", async () => {
        const [owner, account1, account2] = await ethers.getSigners();
        await setOraclePrice(1.5);
        // console.log(toEther(await exchange.showPriceETH()))
        await exchange.initialVirtualPool(toWei('5'));
        //owner deposit collateral
        await usdc.approve(exchange.address, toWei('1000'));
        await exchange.depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, owner.address))).to.equal('1000.0')
        
        //account1 deposit collateral
        await usdc.transfer(account1.address, toWei('1000'))
        await usdc.connect(account1).approve(exchange.address, toWei('1000'));
        await exchange.connect(account1).depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, account1.address))).to.equal('1000.0')

        //account1 deposit collateral
        await usdc.transfer(account2.address, toWei('1000'))
        await usdc.connect(account2).approve(exchange.address, toWei('1000'));
        await exchange.connect(account2).depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, account2.address))).to.equal('1000.0')
        
        await exchange.openLongPosition(toWei('130'))
        console.log(toEther(await exchange.getAccountValue(owner.address)));
        console.log(toEther(await exchange.uservBaycBalance(owner.address)));
        console.log(toEther(await exchange.uservUsdBalance(owner.address)));
        const ownerAssetSize = await exchange.uservBaycBalance(owner.address);
        console.log('owner position national 1 :',toEther(await exchange.getPositionNotional(owner.address)));
        console.log('first collateral:', toEther(await exchange.collateral(usdc.address, owner.address)));
        console.log('owner margin 1 :', Number(await exchange.userMargin(owner.address)))
        console.log('p1:', toEther(await exchange.getCurrentExchangePrice()))
        await exchange.connect(account1).openShortPosition(toWei('150'))
        await exchange.connect(account2).openShortPosition(toWei('150'))
        console.log('p2:', toEther(await exchange.getCurrentExchangePrice()))
        console.log('owner margin 2 :', Number(await exchange.userMargin(owner.address)))
        console.log('owner position national 2 :',toEther(await exchange.getPositionNotional(owner.address)));
        // console.log('owner unrealized pnl :', toEther(await exchange.))
        await exchange.closePosition(ownerAssetSize);
        console.log('owner position national 3 :',toEther(await exchange.getPositionNotional(owner.address)));
        console.log('owner margin 3 :', Number(await exchange.userMargin(owner.address)))
        console.log(toEther(await exchange.uservBaycBalance(owner.address)));
        console.log(toEther(await exchange.uservUsdBalance(owner.address)));
        console.log('final collateral:', toEther(await exchange.collateral(usdc.address, owner.address)));
      })


      it("Test open and close short position", async () => {
        const [owner, account1, account2] = await ethers.getSigners();
        await setOraclePrice(1.5);
        // console.log(toEther(await exchange.showPriceETH()))
        await exchange.initialVirtualPool(toWei('5'));
        //owner deposit collateral
        await usdc.approve(exchange.address, toWei('1000'));
        await exchange.depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, owner.address))).to.equal('1000.0')
        
        //account1 deposit collateral
        await usdc.transfer(account1.address, toWei('1000'))
        await usdc.connect(account1).approve(exchange.address, toWei('1000'));
        await exchange.connect(account1).depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, account1.address))).to.equal('1000.0')

        //account1 deposit collateral
        await usdc.transfer(account2.address, toWei('1000'))
        await usdc.connect(account2).approve(exchange.address, toWei('1000'));
        await exchange.connect(account2).depositCollateral(toWei('1000'));
        expect(toEther(await exchange.collateral(usdc.address, account2.address))).to.equal('1000.0')
        
        await exchange.openShortPosition(toWei('130'))
        console.log(toEther(await exchange.getAccountValue(owner.address)));
        console.log(toEther(await exchange.uservBaycBalance(owner.address)));
        console.log(toEther(await exchange.uservUsdBalance(owner.address)));
        const ownerAssetSize = await exchange.uservBaycBalance(owner.address);
        console.log('owner position national 1 :',toEther(await exchange.getPositionNotional(owner.address)));
        console.log('first collateral:', toEther(await exchange.collateral(usdc.address, owner.address)));
        console.log('owner margin 1 :', Number(await exchange.userMargin(owner.address)))
        console.log('p1:', toEther(await exchange.getCurrentExchangePrice()))
        await exchange.connect(account1).openShortPosition(toWei('150'))
        await exchange.connect(account2).openShortPosition(toWei('150'))
        console.log('p2:', toEther(await exchange.getCurrentExchangePrice()))
        console.log('owner margin 2 :', Number(await exchange.userMargin(owner.address)))
        console.log('owner position national 2 :',toEther(await exchange.getPositionNotional(owner.address)));
        // console.log('owner unrealized pnl :', toEther(await exchange.))
        // console.log(Math.abs(ownerAssetSize))
        await exchange.closePosition(Math.abs(ownerAssetSize).toString());
        console.log(toEther(await exchange.uservBaycBalance(owner.address)));
        await exchange.closePositionComplete();
        console.log('owner position national 3 :',toEther(await exchange.getPositionNotional(owner.address)));
        console.log('owner margin 3 :', Number(await exchange.userMargin(owner.address)))
        console.log(toEther(await exchange.uservBaycBalance(owner.address)));
        console.log(toEther(await exchange.uservUsdBalance(owner.address)));
        console.log('final collateral:', toEther(await exchange.collateral(usdc.address, owner.address)));
        return
      })
    })