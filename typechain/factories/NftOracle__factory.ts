/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NftOracle, NftOracleInterface } from "../NftOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FailedTransferLINK",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "bytes4",
        name: "_callbackFunctionId",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "cancelRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_estimate",
        type: "uint256",
      },
    ],
    name: "fulfillPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_result",
        type: "bytes32",
      },
    ],
    name: "fulfillTimesampAndFloorPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_specId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_assetAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_pricingAsset",
        type: "string",
      },
    ],
    name: "getEstimate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_specId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_assetAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_pricingAsset",
        type: "string",
      },
    ],
    name: "getFloorPrice",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_requestId",
        type: "bytes32",
      },
    ],
    name: "getTimestampAndFloorPrice",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "timestamp",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "floorPrice",
            type: "uint128",
          },
        ],
        internalType: "struct NftOracle.TimestampAndFloorPrice",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_specId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_assetAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_pricingAsset",
        type: "string",
      },
    ],
    name: "getTimestampAndFloorPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRequestId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "requestIdPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "requestIdTimestampAndFloorPrice",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_payee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600160045534801561001557600080fd5b5060405162001681380380620016818339810160408190526100369161008f565b600280546001600160a01b0319166001600160a01b038416179055600380546001600160a01b0319166001600160a01b03831617905550506100c2565b80516001600160a01b038116811461008a57600080fd5b919050565b600080604083850312156100a257600080fd5b6100ab83610073565b91506100b960208401610073565b90509250929050565b6115af80620000d26000396000f3fe608060405234801561001057600080fd5b50600436106100e95760003560e01c8063a6e4d7061161008c578063b76c27ba11610066578063b76c27ba14610242578063d2cda3b914610255578063d39e6dc614610275578063ec65d0f81461029557600080fd5b8063a6e4d706146101fc578063b0a807db1461020f578063b18b78dd1461022257600080fd5b806354b7faae116100c857806354b7faae1461019f5780637adbf973146101b45780638d2a648d146101e0578063a035b1fe146101f357600080fd5b8062c06d1b146100ee5780631aa46f59146101145780632622871a1461011d575b600080fd5b6101016100fc3660046110b4565b6102a8565b6040519081526020015b60405180910390f35b61010160095481565b61017861012b36600461111e565b60408051808201909152600080825260208201525060408051808201825260008381526007602081815293822054608081901c84529490915282526001600160801b039092169082015290565b6040805182516001600160801b03908116825260209384015116928101929092520161010b565b6101b26101ad366004611137565b6103a5565b005b6101b26101c2366004611163565b600380546001600160a01b0319166001600160a01b03831617905550565b6101b26101ee366004611187565b61046c565b61010160085481565b6101b261020a3660046110b4565b610501565b6101b261021d366004611187565b6105d9565b61022a610667565b6040516001600160a01b03909116815260200161010b565b6101b26102503660046111a9565b610680565b61010161026336600461111e565b60076020526000908152604090205481565b61010161028336600461111e565b60066020526000908152604090205481565b6101b26102a336600461121c565b610783565b6000806102bd8730638d2a648d60e01b610795565b90506103286040518060400160405280600c81526020016b61737365744164647265737360a01b81525086604051602001610310919060609190911b6bffffffffffffffffffffffff1916815260140190565b60408051601f198184030181529190528391906107ba565b6103906040518060400160405280600c81526020016b1c1c9a58da5b99d05cdcd95d60a21b81525085858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508694939250506107d89050565b61039a81876107f6565b979650505050505050565b60006103b96002546001600160a01b031690565b60405163a9059cbb60e01b81526001600160a01b038581166004830152602482018590529192509082169063a9059cbb906044016020604051808303816000875af115801561040c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104309190611268565b61046457604051637ab2f97760e01b81526001600160a01b0384166004820152602481018390526044015b60405180910390fd5b505050565b50565b60008281526005602052604090205482906001600160a01b031633146104a45760405162461bcd60e51b815260040161045b9061128a565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a2506000828152600660205260409020819055600855600955565b60006105148663b0a807db60e01b610819565b905061055e6040518060400160405280600c81526020016b61737365744164647265737360a01b8152508560405160200161031091906001600160a01b0391909116815260200190565b6105c66040518060400160405280600c81526020016b1c1c9a58da5b99d05cdcd95d60a21b81525084848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508694939250506107d89050565b6105d0818661083d565b50505050505050565b60008281526005602052604090205482906001600160a01b031633146106115760405162461bcd60e51b815260040161045b9061128a565b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a25060009182526007602052604090912055565b600061067b6003546001600160a01b031690565b905090565b600061069387638d2a648d60e01b610819565b90506106dd6040518060400160405280600c81526020016b61737365744164647265737360a01b8152508660405160200161031091906001600160a01b0391909116815260200190565b6040805180820190915260078152661d1bdad95b925960ca1b602082015261070790829086610857565b61076f6040518060400160405280600c81526020016b1c1c9a58da5b99d05cdcd95d60a21b81525084848080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508694939250506107d89050565b610779818761083d565b5050505050505050565b61078f84848484610875565b50505050565b61079d61101b565b6107a561101b565b6107b181868686610947565b95945050505050565b60808301516107c99083610984565b6080830151610464908261099b565b60808301516107e79083610984565b60808301516104649082610984565b600354600090610810906001600160a01b031684846109a8565b90505b92915050565b61082161101b565b61082961101b565b61083581853086610947565b949350505050565b600354600090610810906001600160a01b03168484610a3b565b60808301516108669083610984565b60808301516104649082610a82565b60008481526005602052604080822080546001600160a01b0319811690915590516001600160a01b039091169186917fe1fe3afa0f7f761ff0a8b89086790efd5140d2907ebd5b7ff6bfcb5e075fd4c59190a2604051636ee4d55360e01b815260048101869052602481018590526001600160e01b031984166044820152606481018390526001600160a01b03821690636ee4d55390608401600060405180830381600087803b15801561092857600080fd5b505af115801561093c573d6000803e3d6000fd5b505050505050505050565b61094f61101b565b61095f8560800151610100610aac565b50509183526001600160a01b031660208301526001600160e01b031916604082015290565b6109918260038351610b11565b6104648282610c20565b6109918260028351610b11565b6004546000906109b98160016112e8565b600455835160408086015160808701515191516000936320214ca360e11b936109f19386938493923092918a9160019160240161134d565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091529050610a3186838684610c47565b9695505050505050565b600454600090610a4c8160016112e8565b60045583516040808601516080870151519151600093633c6d41b960e01b936109f19386938493928991600291906024016113b5565b67ffffffffffffffff811115610aa057610a9c8282610da5565b5050565b610a9c82600083610b11565b604080518082019091526060815260006020820152610acc60208361140a565b15610af457610adc60208361140a565b610ae790602061142c565b610af190836112e8565b91505b506020828101829052604080518085526000815290920101905290565b60178167ffffffffffffffff1611610b365761078f8360e0600585901b168317610ddc565b60ff8167ffffffffffffffff1611610b7457610b5d836018611fe0600586901b1617610ddc565b5061078f8367ffffffffffffffff83166001610e01565b61ffff8167ffffffffffffffff1611610bb357610b9c836019611fe0600586901b1617610ddc565b5061078f8367ffffffffffffffff83166002610e01565b63ffffffff8167ffffffffffffffff1611610bf457610bdd83601a611fe0600586901b1617610ddc565b5061078f8367ffffffffffffffff83166004610e01565b610c0983601b611fe0600586901b1617610ddc565b5061078f8367ffffffffffffffff83166008610e01565b60408051808201909152606081526000602082015261081083846000015151848551610e27565b6040516bffffffffffffffffffffffff193060601b1660208201526034810184905260009060540160408051808303601f1901815282825280516020918201206000818152600590925291812080546001600160a01b0319166001600160a01b038a1617905590925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af99190a2600254604051630200057560e51b81526001600160a01b0390911690634000aea090610d0a90889087908790600401611443565b6020604051808303816000875af1158015610d29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4d9190611268565b6108355760405162461bcd60e51b815260206004820152602360248201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604482015262636c6560e81b606482015260840161045b565b610db08260c2610ddc565b50610a9c8282604051602001610dc891815260200190565b60405160208183030381529060405261099b565b6040805180820190915260608152600060208201526108108384600001515184610f11565b604080518082019091526060815260006020820152610835848560000151518585610f6c565b6040805180820190915260608152600060208201528251821115610e4a57600080fd5b6020850151610e5983866112e8565b1115610e8c57610e8c85610e7c87602001518786610e7791906112e8565b610fed565b610e8790600261146a565b611004565b600080865180518760208301019350808887011115610eab5787860182525b505050602084015b60208410610eeb5780518252610eca6020836112e8565b9150610ed76020826112e8565b9050610ee460208561142c565b9350610eb3565b51815160001960208690036101000a019081169019919091161790525083949350505050565b60408051808201909152606081526000602082015283602001518310610f4657610f468485602001516002610e87919061146a565b8351805160208583010184815350808503610f62576001810182525b5093949350505050565b6040805180820190915260608152600060208201526020850151610f9085846112e8565b1115610fa457610fa485610e7c86856112e8565b60006001610fb48461010061156d565b610fbe919061142c565b9050855183868201018583198251161781525080518487011115610fe25783860181525b509495945050505050565b600081831115610ffe575081610813565b50919050565b81516110108383610aac565b5061078f8382610c20565b6040805160a0810182526000808252602080830182905282840182905260608084018390528451808601909552845283015290608082015290565b6001600160a01b038116811461046957600080fd5b60008083601f84011261107d57600080fd5b50813567ffffffffffffffff81111561109557600080fd5b6020830191508360208285010111156110ad57600080fd5b9250929050565b6000806000806000608086880312156110cc57600080fd5b853594506020860135935060408601356110e581611056565b9250606086013567ffffffffffffffff81111561110157600080fd5b61110d8882890161106b565b969995985093965092949392505050565b60006020828403121561113057600080fd5b5035919050565b6000806040838503121561114a57600080fd5b823561115581611056565b946020939093013593505050565b60006020828403121561117557600080fd5b813561118081611056565b9392505050565b6000806040838503121561119a57600080fd5b50508035926020909101359150565b60008060008060008060a087890312156111c257600080fd5b863595506020870135945060408701356111db81611056565b935060608701359250608087013567ffffffffffffffff8111156111fe57600080fd5b61120a89828a0161106b565b979a9699509497509295939492505050565b6000806000806080858703121561123257600080fd5b843593506020850135925060408501356001600160e01b03198116811461125857600080fd5b9396929550929360600135925050565b60006020828403121561127a57600080fd5b8151801515811461118057600080fd5b60208082526028908201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604082015267081c995c5d595cdd60c21b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600082198211156112fb576112fb6112d2565b500190565b6000815180845260005b818110156113265760208185018101518683018201520161130a565b81811115611338576000602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e082018190526000906113a683820185611300565b9b9a5050505050505050505050565b60018060a01b038816815286602082015285604082015263ffffffff60e01b851660608201528360808201528260a082015260e060c082015260006113fd60e0830184611300565b9998505050505050505050565b60008261142757634e487b7160e01b600052601260045260246000fd5b500690565b60008282101561143e5761143e6112d2565b500390565b60018060a01b03841681528260208201526060604082015260006107b16060830184611300565b6000816000190483118215151615611484576114846112d2565b500290565b600181815b808511156114c45781600019048211156114aa576114aa6112d2565b808516156114b757918102915b93841c939080029061148e565b509250929050565b6000826114db57506001610813565b816114e857506000610813565b81600181146114fe576002811461150857611524565b6001915050610813565b60ff841115611519576115196112d2565b50506001821b610813565b5060208310610133831016604e8410600b8410161715611547575081810a610813565b6115518383611489565b8060001904821115611565576115656112d2565b029392505050565b600061081083836114cc56fea26469706673582212204a7c019b5e8538a3697cd540e31fd1ea8f2dec765edddfa372a825ddab9c1d8464736f6c634300080d0033";

type NftOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NftOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NftOracle__factory extends ContractFactory {
  constructor(...args: NftOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "NftOracle";
  }

  deploy(
    _link: string,
    _oracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NftOracle> {
    return super.deploy(_link, _oracle, overrides || {}) as Promise<NftOracle>;
  }
  getDeployTransaction(
    _link: string,
    _oracle: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_link, _oracle, overrides || {});
  }
  attach(address: string): NftOracle {
    return super.attach(address) as NftOracle;
  }
  connect(signer: Signer): NftOracle__factory {
    return super.connect(signer) as NftOracle__factory;
  }
  static readonly contractName: "NftOracle";
  public readonly contractName: "NftOracle";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NftOracleInterface {
    return new utils.Interface(_abi) as NftOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NftOracle {
    return new Contract(address, _abi, signerOrProvider) as NftOracle;
  }
}
