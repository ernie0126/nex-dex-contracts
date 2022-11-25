/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PriceConsumerV3,
  PriceConsumerV3Interface,
} from "../PriceConsumerV3";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPriceFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161025c38038061025c83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516101cc6100906000396000818160630152609801526101cc6000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80638e15f4731461003b5780639e87a5cd14610056575b600080fd5b61004361008d565b6040519081526020015b60405180910390f35b6040516001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016815260200161004d565b6000806000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156100f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101189190610146565b50919998505050505050505050565b805169ffffffffffffffffffff8116811461014157600080fd5b919050565b600080600080600060a0868803121561015e57600080fd5b61016786610127565b945060208601519350604086015192506060860151915061018a60808701610127565b9050929550929590935056fea264697066735822122025fb7ab45a11086836e4265ff0d2bb2b6ea69485b5887d47e5f7d8e17a09970c64736f6c63430008110033";

type PriceConsumerV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceConsumerV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceConsumerV3__factory extends ContractFactory {
  constructor(...args: PriceConsumerV3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "PriceConsumerV3";
  }

  deploy(
    _priceFeed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PriceConsumerV3> {
    return super.deploy(
      _priceFeed,
      overrides || {}
    ) as Promise<PriceConsumerV3>;
  }
  getDeployTransaction(
    _priceFeed: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_priceFeed, overrides || {});
  }
  attach(address: string): PriceConsumerV3 {
    return super.attach(address) as PriceConsumerV3;
  }
  connect(signer: Signer): PriceConsumerV3__factory {
    return super.connect(signer) as PriceConsumerV3__factory;
  }
  static readonly contractName: "PriceConsumerV3";
  public readonly contractName: "PriceConsumerV3";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceConsumerV3Interface {
    return new utils.Interface(_abi) as PriceConsumerV3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceConsumerV3 {
    return new Contract(address, _abi, signerOrProvider) as PriceConsumerV3;
  }
}
