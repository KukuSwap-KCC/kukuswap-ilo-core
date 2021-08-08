/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapPresaleLockForwarder } from "../KukuSwapPresaleLockForwarder";

export class KukuSwapPresaleLockForwarder__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<KukuSwapPresaleLockForwarder> {
    return super.deploy(
      overrides || {}
    ) as Promise<KukuSwapPresaleLockForwarder>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KukuSwapPresaleLockForwarder {
    return super.attach(address) as KukuSwapPresaleLockForwarder;
  }
  connect(signer: Signer): KukuSwapPresaleLockForwarder__factory {
    return super.connect(signer) as KukuSwapPresaleLockForwarder__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KukuSwapPresaleLockForwarder {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as KukuSwapPresaleLockForwarder;
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
    inputs: [],
    name: "KUKUSWAP_LOCKER",
    outputs: [
      {
        internalType: "contract IKukuSwapLocker",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "KUKU_FACTORY",
    outputs: [
      {
        internalType: "contract IKukuSwapFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PRESALE_FACTORY",
    outputs: [
      {
        internalType: "contract IKukuSwapPresaleFactory",
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
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_locker",
        type: "address",
      },
      {
        internalType: "address",
        name: "_kukuFactory",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "kukuswapPairIsInitialised",
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
    inputs: [
      {
        internalType: "contract IERC20Ext",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "contract IERC20Ext",
        name: "_saleToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_baseAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_saleAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unlock_block",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "_withdrawer",
        type: "address",
      },
    ],
    name: "lockLiquidity",
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
  "0x608060405234801561001057600080fd5b5061101f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80639f07203a116100665780639f07203a14610116578063c0c53b8b1461011e578063cd608cbb14610156578063d7d9aa851461015e578063f2fde38b146101a057610093565b80632277d0e314610098578063715018a6146100e25780638da5cb5b146100ea5780638f8d109e1461010e575b600080fd5b6100e0600480360360c08110156100ae57600080fd5b506001600160a01b038135811691602081013582169160408201359160608101359160808201359160a00135166101c6565b005b6100e0610613565b6100f26106d1565b604080516001600160a01b039092168252519081900360200190f35b6100f26106e0565b6100f26106ef565b6100e06004803603606081101561013457600080fd5b506001600160a01b0381358116916020810135821691604090910135166106fe565b6100f26107e8565b61018c6004803603604081101561017457600080fd5b506001600160a01b03813581169160200135166107f7565b604080519115158252519081900360200190f35b6100e0600480360360208110156101b657600080fd5b50356001600160a01b031661092f565b6065546040805163717e486560e11b815233600482015290516001600160a01b039092169163e2fc90ca91602480820192602092909190829003018186803b15801561021157600080fd5b505afa158015610225573d6000803e3d6000fd5b505050506040513d602081101561023b57600080fd5b5051610287576040805162461bcd60e51b815260206004820152601660248201527514149154d05311481393d508149151d254d51154915160521b604482015290519081900360640190fd5b6067546040805163e6a4390560e01b81526001600160a01b03898116600483015288811660248301529151600093929092169163e6a4390591604480820192602092909190829003018186803b1580156102e057600080fd5b505afa1580156102f4573d6000803e3d6000fd5b505050506040513d602081101561030a57600080fd5b505190506001600160a01b03811661042357606754604080516364e329cb60e11b81526001600160a01b038a8116600483015289811660248301529151919092169163c9c653969160448083019260209291908290030181600087803b15801561037357600080fd5b505af1158015610387573d6000803e3d6000fd5b505050506040513d602081101561039d57600080fd5b50506067546040805163e6a4390560e01b81526001600160a01b038a8116600483015289811660248301529151919092169163e6a43905916044808301926020929190829003018186803b1580156103f457600080fd5b505afa158015610408573d6000803e3d6000fd5b505050506040513d602081101561041e57600080fd5b505190505b61042f87338388610a44565b61043b86338387610a44565b604080516335313c2160e11b815230600482015290516001600160a01b03831691636a6278429160248083019260209291908290030181600087803b15801561048357600080fd5b505af1158015610497573d6000803e3d6000fd5b505050506040513d60208110156104ad57600080fd5b5050604080516370a0823160e01b815230600482015290516000916001600160a01b038416916370a0823191602480820192602092909190829003018186803b1580156104f957600080fd5b505afa15801561050d573d6000803e3d6000fd5b505050506040513d602081101561052357600080fd5b505190508061056e576040805162461bcd60e51b815260206004820152601260248201527113140818dc99585d1a5bdb8819985a5b195960721b604482015290519081900360640190fd5b6066546105869083906001600160a01b031683610ba1565b60665460408051634ba7cb1360e11b81526001600160a01b03858116600483015260248201859052604482018890526001606483015286811660848301529151919092169163974f96269160a480830192600092919082900301818387803b1580156105f157600080fd5b505af1158015610605573d6000803e3d6000fd5b505050505050505050505050565b61061b610d0b565b6001600160a01b031661062c6106d1565b6001600160a01b031614610687576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b6033546001600160a01b031690565b6066546001600160a01b031681565b6067546001600160a01b031681565b600054610100900460ff16806107175750610717610d0f565b80610725575060005460ff16155b6107605760405162461bcd60e51b815260040180806020018281038252602e815260200180610f98602e913960400191505060405180910390fd5b600054610100900460ff1615801561078b576000805460ff1961ff0019909116610100171660011790555b606580546001600160a01b038087166001600160a01b0319928316179092556066805486841690831617905560678054928516929091169190911790556107d0610d20565b80156107e2576000805461ff00191690555b50505050565b6065546001600160a01b031681565b6067546040805163e6a4390560e01b81526001600160a01b038581166004830152848116602483015291516000938493169163e6a43905916044808301926020929190829003018186803b15801561084e57600080fd5b505afa158015610862573d6000803e3d6000fd5b505050506040513d602081101561087857600080fd5b505190506001600160a01b038116610894576000915050610929565b6000846001600160a01b03166370a08231836040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b1580156108e357600080fd5b505afa1580156108f7573d6000803e3d6000fd5b505050506040513d602081101561090d57600080fd5b50519050801561092257600192505050610929565b6000925050505b92915050565b610937610d0b565b6001600160a01b03166109486106d1565b6001600160a01b0316146109a3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166109e85760405162461bcd60e51b8152600401808060200182810382526026815260200180610f726026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17815292518251600094606094938a169392918291908083835b60208310610ac95780518252601f199092019160209182019101610aaa565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610b2b576040519150601f19603f3d011682016040523d82523d6000602084013e610b30565b606091505b5091509150818015610b5e575080511580610b5e5750808060200190516020811015610b5b57600080fd5b50515b610b995760405162461bcd60e51b8152600401808060200182810382526024815260200180610fc66024913960400191505060405180910390fd5b505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b178152925182516000946060949389169392918291908083835b60208310610c1e5780518252601f199092019160209182019101610bff565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610c80576040519150601f19603f3d011682016040523d82523d6000602084013e610c85565b606091505b5091509150818015610cb3575080511580610cb35750808060200190516020811015610cb057600080fd5b50515b610d04576040805162461bcd60e51b815260206004820152601e60248201527f5472616e7366657248656c7065723a20415050524f56455f4641494c45440000604482015290519081900360640190fd5b5050505050565b3390565b6000610d1a30610dd2565b15905090565b600054610100900460ff1680610d395750610d39610d0f565b80610d47575060005460ff16155b610d825760405162461bcd60e51b815260040180806020018281038252602e815260200180610f98602e913960400191505060405180910390fd5b600054610100900460ff16158015610dad576000805460ff1961ff0019909116610100171660011790555b610db5610dd8565b610dbd610e78565b8015610dcf576000805461ff00191690555b50565b3b151590565b600054610100900460ff1680610df15750610df1610d0f565b80610dff575060005460ff16155b610e3a5760405162461bcd60e51b815260040180806020018281038252602e815260200180610f98602e913960400191505060405180910390fd5b600054610100900460ff16158015610dbd576000805460ff1961ff0019909116610100171660011790558015610dcf576000805461ff001916905550565b600054610100900460ff1680610e915750610e91610d0f565b80610e9f575060005460ff16155b610eda5760405162461bcd60e51b815260040180806020018281038252602e815260200180610f98602e913960400191505060405180910390fd5b600054610100900460ff16158015610f05576000805460ff1961ff0019909116610100171660011790555b6000610f0f610d0b565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610dcf576000805461ff00191690555056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a65645472616e7366657248656c7065723a205452414e534645525f46524f4d5f4641494c4544a264697066735822122041c2ed083cdecf7eb92d84cdbe7bfc3f8d730d4557d21d31656557e0dd9f73ff64736f6c634300060c0033";
