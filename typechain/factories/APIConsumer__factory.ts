/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BytesLike,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { APIConsumer, APIConsumerInterface } from "../APIConsumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_jobId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
    ],
    name: "DataFullfilled",
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
        name: "_volume",
        type: "uint256",
      },
    ],
    name: "fulfill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestVolumeData",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "volume",
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
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405260016004553480156200001657600080fd5b5060405162000fab38038062000fab83398101604081905262000039916200014d565b6001600160a01b0381166200005857620000526200008f565b62000074565b600280546001600160a01b0319166001600160a01b0383161790555b506001600160a01b0390921660805260a05260c052620001bd565b6200012e73c89bd4e1632d3a43cb03aaad5262cbe4038bc5716001600160a01b03166338cc48316040518163ffffffff1660e01b8152600401602060405180830381865afa158015620000e6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200010c919062000198565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b565b80516001600160a01b03811681146200014857600080fd5b919050565b600080600080608085870312156200016457600080fd5b6200016f8562000130565b935060208501519250604085015191506200018d6060860162000130565b905092959194509250565b600060208284031215620001ab57600080fd5b620001b68262000130565b9392505050565b60805160a05160c051610dbe620001ed60003960006102bd0152600061018f0152600061029b0152610dbe6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80634357855e146100515780636021abac146100665780638dc654a214610064578063c618a1e414610080575b600080fd5b61006461005f366004610a9a565b610089565b005b61006e610187565b60405190815260200160405180910390f35b61006e60065481565b60008281526005602052604090205482906001600160a01b031633146101075760405162461bcd60e51b815260206004820152602860248201527f536f75726365206d75737420626520746865206f7261636c65206f6620746865604482015267081c995c5d595cdd60c21b60648201526084015b60405180910390fd5b60008181526005602052604080822080546001600160a01b03191690555182917f7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a91a260068290556040518281527f221d507243adddffe789060be0e69bff4be830996c6b265bfda5083d86f886329060200160405180910390a1505050565b6000806101bc7f0000000000000000000000000000000000000000000000000000000000000000306321abc2af60e11b6102e8565b90506101fe6040518060400160405280600381526020016219d95d60ea1b815250604051806080016040528060498152602001610d406049913983919061030d565b610264604051806040016040528060048152602001630e0c2e8d60e31b8152506040518060400160405280601881526020017f5241572c4554482c5553442c564f4c554d453234484f555200000000000000008152508361030d9092919063ffffffff16565b60408051808201909152600581526474696d657360d81b6020820152670de0b6b3a76400009061029690839083610330565b6102e17f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000061034e565b9250505090565b6102f0610a5f565b6102f8610a5f565b610304818686866103e1565b95945050505050565b608083015161031c9083610427565b608083015161032b9082610427565b505050565b608083015161033f9083610427565b608083015161032b908261043e565b60045460009061035f816001610ad2565b600455835160408086015160808701515191516000936320214ca360e11b936103979386938493923092918a91600191602401610b2b565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915290506103d7868386846104a2565b9695505050505050565b6103e9610a5f565b6103f98560800151610100610600565b50508284526001600160a01b03821660208501526001600160e01b031981166040850152835b949350505050565b610434826003835161066b565b61032b8282610780565b67ffffffffffffffff1981121561045d5761045982826107ae565b5050565b67ffffffffffffffff8113156104775761045982826107f0565b6000811261048b576104598260008361066b565b61045982600161049d84600019610b93565b61066b565b6040516bffffffffffffffffffffffff193060601b1660208201526034810184905260009060540160408051808303601f1901815282825280516020918201206000818152600590925291812080546001600160a01b0319166001600160a01b038a1617905590925082917fb5e6e01e79f91267dc17b4e6314d5d4d03593d2ceee0fbb452b750bd70ea5af99190a2600254604051630200057560e51b81526001600160a01b0390911690634000aea09061056590889087908790600401610bba565b6020604051808303816000875af1158015610584573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a89190610be1565b61041f5760405162461bcd60e51b815260206004820152602360248201527f756e61626c6520746f207472616e73666572416e6443616c6c20746f206f7261604482015262636c6560e81b60648201526084016100fe565b604080518082019091526060815260006020820152610620602083610c03565b1561064857610630602083610c03565b61063b906020610c25565b6106459083610ad2565b91505b506020808301829052604080518085526000815283019091019052815b92915050565b60178167ffffffffffffffff1611610696576106908360e0600585901b168317610813565b50505050565b60ff8167ffffffffffffffff16116106d4576106bd836018611fe0600586901b1617610813565b506106908367ffffffffffffffff83166001610838565b61ffff8167ffffffffffffffff1611610713576106fc836019611fe0600586901b1617610813565b506106908367ffffffffffffffff83166002610838565b63ffffffff8167ffffffffffffffff16116107545761073d83601a611fe0600586901b1617610813565b506106908367ffffffffffffffff83166004610838565b61076983601b611fe0600586901b1617610813565b506106908367ffffffffffffffff83166008610838565b6040805180820190915260608152600060208201526107a78384600001515184855161085e565b9392505050565b6107b98260c3610813565b50610459826107ca83600019610b93565b6040516020016107dc91815260200190565b604051602081830303815290604052610948565b6107fb8260c2610813565b5061045982826040516020016107dc91815260200190565b6040805180820190915260608152600060208201526107a78384600001515184610955565b60408051808201909152606081526000602082015261041f8485600001515185856109b0565b604080518082019091526060815260006020820152825182111561088157600080fd5b60208501516108908386610ad2565b11156108c3576108c3856108b3876020015187866108ae9190610ad2565b610a31565b6108be906002610c38565b610a48565b6000808651805187602083010193508088870111156108e25787860182525b505050602084015b602084106109225780518252610901602083610ad2565b915061090e602082610ad2565b905061091b602085610c25565b93506108ea565b51815160001960208690036101000a019081169019919091161790525083949350505050565b610434826002835161066b565b6040805180820190915260608152600060208201528360200151831061098a5761098a84856020015160026108be9190610c38565b83518051602085830101848153508085036109a6576001810182525b5093949350505050565b60408051808201909152606081526000602082015260208501516109d48584610ad2565b11156109e8576109e8856108b38685610ad2565b600060016109f884610100610d33565b610a029190610c25565b9050855183868201018583198251161781525080518487011115610a265783860181525b509495945050505050565b600081831115610a42575081610665565b50919050565b8151610a548383610600565b506106908382610780565b6040805160a0810182526000808252602080830182905282840182905260608084018390528451808601909552845283015290608082015290565b60008060408385031215610aad57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b8082018082111561066557610665610abc565b6000815180845260005b81811015610b0b57602081850181015186830182015201610aef565b506000602082860101526020601f19601f83011685010191505092915050565b6001600160a01b0389811682526020820189905260408201889052861660608201526001600160e01b03198516608082015260a0810184905260c0810183905261010060e08201819052600090610b8483820185610ae5565b9b9a5050505050505050505050565b8181036000831280158383131683831282161715610bb357610bb3610abc565b5092915050565b60018060a01b03841681528260208201526060604082015260006103046060830184610ae5565b600060208284031215610bf357600080fd5b815180151581146107a757600080fd5b600082610c2057634e487b7160e01b600052601260045260246000fd5b500690565b8181038181111561066557610665610abc565b808202811582820484141761066557610665610abc565b600181815b80851115610c8a578160001904821115610c7057610c70610abc565b80851615610c7d57918102915b93841c9390800290610c54565b509250929050565b600082610ca157506001610665565b81610cae57506000610665565b8160018114610cc45760028114610cce57610cea565b6001915050610665565b60ff841115610cdf57610cdf610abc565b50506001821b610665565b5060208310610133831016604e8410600b8410161715610d0d575081810a610665565b610d178383610c4f565b8060001904821115610d2b57610d2b610abc565b029392505050565b60006107a78383610c9256fe68747470733a2f2f6d696e2d6170692e63727970746f636f6d706172652e636f6d2f646174612f70726963656d756c746966756c6c3f6673796d733d455448267473796d733d555344a2646970667358221220ebac61df041393d27c9495775a4aedef5ec80e01b157940cea4f3808bd3bbae264736f6c63430008110033";

type APIConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: APIConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class APIConsumer__factory extends ContractFactory {
  constructor(...args: APIConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "APIConsumer";
  }

  deploy(
    _oracle: string,
    _jobId: BytesLike,
    _fee: BigNumberish,
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<APIConsumer> {
    return super.deploy(
      _oracle,
      _jobId,
      _fee,
      _link,
      overrides || {}
    ) as Promise<APIConsumer>;
  }
  getDeployTransaction(
    _oracle: string,
    _jobId: BytesLike,
    _fee: BigNumberish,
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _oracle,
      _jobId,
      _fee,
      _link,
      overrides || {}
    );
  }
  attach(address: string): APIConsumer {
    return super.attach(address) as APIConsumer;
  }
  connect(signer: Signer): APIConsumer__factory {
    return super.connect(signer) as APIConsumer__factory;
  }
  static readonly contractName: "APIConsumer";
  public readonly contractName: "APIConsumer";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): APIConsumerInterface {
    return new utils.Interface(_abi) as APIConsumerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): APIConsumer {
    return new Contract(address, _abi, signerOrProvider) as APIConsumer;
  }
}
