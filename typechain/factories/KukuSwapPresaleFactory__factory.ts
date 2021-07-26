/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapPresaleFactory } from "../KukuSwapPresaleFactory";

export class KukuSwapPresaleFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<KukuSwapPresaleFactory> {
    return super.deploy(overrides || {}) as Promise<KukuSwapPresaleFactory>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KukuSwapPresaleFactory {
    return super.attach(address) as KukuSwapPresaleFactory;
  }
  connect(signer: Signer): KukuSwapPresaleFactory__factory {
    return super.connect(signer) as KukuSwapPresaleFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KukuSwapPresaleFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as KukuSwapPresaleFactory;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "presaleContract",
        type: "address",
      },
    ],
    name: "presaleRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_allow",
        type: "bool",
      },
    ],
    name: "adminAllowPresaleGenerator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "presaleAtIndex",
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
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "presaleGeneratorAtIndex",
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
    inputs: [],
    name: "presaleGeneratorsLength",
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
        internalType: "address",
        name: "_presaleAddress",
        type: "address",
      },
    ],
    name: "presaleIsRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "presalesLength",
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
        internalType: "address",
        name: "_presaleAddress",
        type: "address",
      },
    ],
    name: "registerPresale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600061001b61006a565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006e565b3390565b6107aa8061007d6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638da5cb5b116100665780638da5cb5b146101435780639ff207931461014b578063d348c96414610153578063e2fc90ca14610181578063f2fde38b146101bb5761009e565b80630a014fbc146100a357806311c065b7146100dc5780634e76edbb1461010457806365384f361461011e578063715018a61461013b575b600080fd5b6100c0600480360360208110156100b957600080fd5b50356101e1565b604080516001600160a01b039092168252519081900360200190f35b610102600480360360208110156100f257600080fd5b50356001600160a01b03166101f4565b005b61010c610287565b60408051918252519081900360200190f35b6100c06004803603602081101561013457600080fd5b5035610298565b6101026102a5565b6100c0610363565b61010c610372565b6101026004803603604081101561016957600080fd5b506001600160a01b038135169060200135151561037e565b6101a76004803603602081101561019757600080fd5b50356001600160a01b031661041a565b604080519115158252519081900360200190f35b610102600480360360208110156101d157600080fd5b50356001600160a01b0316610427565b60006101ee60038361053b565b92915050565b6101ff60033361054e565b61023c576040805162461bcd60e51b81526020600482015260096024820152682327a92124a22222a760b91b604482015290519081900360640190fd5b610247600182610563565b50604080516001600160a01b038316815290517fa62fce43cb61612c50d7b3485c2fb44000803dacc3472b8ce4c638f235e97a1f9181900360200190a150565b60006102936001610578565b905090565b60006101ee60018361053b565b6102ad610583565b6001600160a01b03166102be610363565b6001600160a01b031614610319576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b60006102936003610578565b610386610583565b6001600160a01b0316610397610363565b6001600160a01b0316146103f2576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b801561040957610403600383610563565b50610416565b610414600383610587565b505b5050565b60006101ee60018361054e565b61042f610583565b6001600160a01b0316610440610363565b6001600160a01b03161461049b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166104e05760405162461bcd60e51b815260040180806020018281038252602681526020018061074f6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6000610547838361059c565b9392505050565b6000610547836001600160a01b038416610600565b6000610547836001600160a01b038416610618565b60006101ee82610662565b3390565b6000610547836001600160a01b038416610666565b815460009082106105de5760405162461bcd60e51b815260040180806020018281038252602281526020018061072d6022913960400191505060405180910390fd5b8260000182815481106105ed57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b60006106248383610600565b61065a575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556101ee565b5060006101ee565b5490565b60008181526001830160205260408120548015610722578354600019808301919081019060009087908390811061069957fe5b90600052602060002001549050808760000184815481106106b657fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806106e657fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506101ee565b60009150506101ee56fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220f71a36294274acab06214e171da3c3b1d6dbd08f3d355f0b67ffcdc4b1c4e5e964736f6c634300060c0033";
