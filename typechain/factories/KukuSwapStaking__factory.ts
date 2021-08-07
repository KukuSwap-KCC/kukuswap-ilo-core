/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapStaking } from "../KukuSwapStaking";

export class KukuSwapStaking__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<KukuSwapStaking> {
    return super.deploy(overrides || {}) as Promise<KukuSwapStaking>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KukuSwapStaking {
    return super.attach(address) as KukuSwapStaking;
  }
  connect(signer: Signer): KukuSwapStaking__factory {
    return super.connect(signer) as KukuSwapStaking__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KukuSwapStaking {
    return new Contract(address, _abi, signerOrProvider) as KukuSwapStaking;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
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
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "KUKU",
    outputs: [
      {
        internalType: "contract IERC20Ext",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WKCS",
    outputs: [
      {
        internalType: "contract IERC20Ext",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isAuth",
        type: "bool",
      },
    ],
    name: "authorize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authorized",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claimed",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "createDistribution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "distributions",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "enter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_distributionIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getDistributionShareBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "share",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "getRewardsAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToClaim",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "getStakingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Ext",
        name: "_KUKU",
        type: "address",
      },
      {
        internalType: "contract IERC20Ext",
        name: "_WKCS",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDistributionIndex",
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
        internalType: "uint256",
        name: "_share",
        type: "uint256",
      },
    ],
    name: "leave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "shares",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_kuku",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wkcs",
        type: "address",
      },
    ],
    name: "updateTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612434806100206000396000f3fe608060405234801561001057600080fd5b50600436106101da5760003560e01c806372fa39d111610104578063a9059cbb116100a2578063dbe9345111610071578063dbe93451146105e1578063dd62ed3e14610607578063f1e6d3aa14610635578063f2fde38b1461063d576101da565b8063a9059cbb1461055b578063acab21e014610587578063b91816111461058f578063bea57107146105b5576101da565b80638da5cb5b116100de5780638da5cb5b146104e657806395d89b411461050a578063a457c2d714610512578063a59f3e0c1461053e576101da565b806372fa39d11461047757806374363daa1461049457806382481d49146104ba576101da565b8063313ce5671161017c5780634dd6c8de1161014b5780634dd6c8de1461040057806367dfd4c91461042c57806370a0823114610449578063715018a61461046f576101da565b8063313ce5671461035257806339509351146103705780634487d3df1461039c578063485cc955146103d2576101da565b806323b872dd116101b857806323b872dd146102b657806324206c2e146102ec5780632616d8731461031c5780632d1fb38914610324576101da565b806306fdde03146101df578063095ea7b31461025c57806318160ddd1461029c575b600080fd5b6101e7610663565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610221578181015183820152602001610209565b50505050905090810190601f16801561024e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102886004803603604081101561027257600080fd5b506001600160a01b0381351690602001356106f9565b604080519115158252519081900360200190f35b6102a4610717565b60408051918252519081900360200190f35b610288600480360360608110156102cc57600080fd5b506001600160a01b0381358116916020810135909116906040013561071d565b61031a6004803603604081101561030257600080fd5b506001600160a01b0381358116916020013516610744565b005b6102a46107e6565b61031a6004803603604081101561033a57600080fd5b506001600160a01b03813516906020013515156107ec565b61035a6108a5565b6040805160ff9092168252519081900360200190f35b6102886004803603604081101561038657600080fd5b506001600160a01b0381351690602001356108ae565b6103b9600480360360208110156103b257600080fd5b5035610901565b6040805192835260208301919091528051918290030190f35b61031a600480360360408110156103e857600080fd5b506001600160a01b038135811691602001351661091a565b6102886004803603604081101561041657600080fd5b506001600160a01b038135169060200135610a4e565b61031a6004803603602081101561044257600080fd5b5035610a6e565b6102a46004803603602081101561045f57600080fd5b50356001600160a01b0316610cc3565b61031a610cde565b61031a6004803603602081101561048d57600080fd5b5035610d9c565b6102a4600480360360208110156104aa57600080fd5b50356001600160a01b0316610eef565b6102a4600480360360408110156104d057600080fd5b50803590602001356001600160a01b0316610f83565b6104ee610fa0565b604080516001600160a01b039092168252519081900360200190f35b6101e7610faf565b6102886004803603604081101561052857600080fd5b506001600160a01b038135169060200135611010565b61031a6004803603602081101561055457600080fd5b5035611078565b6102886004803603604081101561057157600080fd5b506001600160a01b0381351690602001356111db565b6104ee6111fc565b610288600480360360208110156105a557600080fd5b50356001600160a01b031661120b565b6102a4600480360360408110156105cb57600080fd5b50803590602001356001600160a01b0316611220565b6102a4600480360360208110156105f757600080fd5b50356001600160a01b031661126a565b6102a46004803603604081101561061d57600080fd5b506001600160a01b03813581169160200135166112c0565b6104ee6112eb565b61031a6004803603602081101561065357600080fd5b50356001600160a01b03166112fa565b60368054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106ef5780601f106106c4576101008083540402835291602001916106ef565b820191906000526020600020905b8154815290600101906020018083116106d257829003601f168201915b5050505050905090565b600061070d61070661140f565b8484611413565b5060015b92915050565b60355490565b600061072a8484846114ff565b5061073484611581565b61073d83611581565b9392505050565b61074c61140f565b6001600160a01b031661075d610fa0565b6001600160a01b0316146107b8576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b609780546001600160a01b039384166001600160a01b03199182161790915560988054929093169116179055565b609a5481565b609d60006107f861140f565b6001600160a01b0316815260208101919091526040016000205460ff168061083f575061082361140f565b6001600160a01b0316610834610fa0565b6001600160a01b0316145b61087a5760405162461bcd60e51b815260040180806020018281038252602581526020018061234b6025913960400191505060405180910390fd5b6001600160a01b03919091166000908152609d60205260409020805460ff1916911515919091179055565b60385460ff1690565b600061070d6108bb61140f565b846108fc85603460006108cc61140f565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906115b8565b611413565b6099602052600090815260409020805460019091015482565b600054610100900460ff16806109335750610933611612565b80610941575060005460ff16155b61097c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff161580156109a7576000805460ff1961ff0019909116610100171660011790555b609780546001600160a01b038086166001600160a01b0319928316179092556098805492851692909116919091179055604080518082018252601681527525bab5baa9bbb0b81029ba30b5b4b733902a37b5b2b760511b6020808301919091528251808401909352600b83526a4b554b552053686172657360a81b90830152610a2f91611623565b610a376116c2565b8015610a49576000805461ff00191690555b505050565b609c60209081526000928352604080842090915290825290205460ff1681565b610a7e610a7961140f565b611774565b6000610a88610717565b609754604080516370a0823160e01b81523060048201529051929350600092610b1c928592610b16926001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610ae357600080fd5b505afa158015610af7573d6000803e3d6000fd5b505050506040513d6020811015610b0d57600080fd5b50518690611982565b906119db565b9050610b2f610b2961140f565b84611a42565b609754604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610b7a57600080fd5b505afa158015610b8e573d6000803e3d6000fd5b505050506040513d6020811015610ba457600080fd5b50518110610c2657609754604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610bf757600080fd5b505afa158015610c0b573d6000803e3d6000fd5b505050506040513d6020811015610c2157600080fd5b505190505b6097546001600160a01b031663a9059cbb610c3f61140f565b836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015610c8657600080fd5b505af1158015610c9a573d6000803e3d6000fd5b505050506040513d6020811015610cb057600080fd5b50610a499050610cbe61140f565b611581565b6001600160a01b031660009081526033602052604090205490565b610ce661140f565b6001600160a01b0316610cf7610fa0565b6001600160a01b031614610d52576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6065546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3606580546001600160a01b0319169055565b609d6000610da861140f565b6001600160a01b0316815260208101919091526040016000205460ff16610e005760405162461bcd60e51b815260040180806020018281038252602581526020018061234b6025913960400191505060405180910390fd5b610e08612173565b6040518060400160405280610e1b610717565b81526020908101849052609a8054600190810191829055600091825260998352604090912083518155918301519101556098549091506001600160a01b03166323b872dd610e6761140f565b30856040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050602060405180830381600087803b158015610ebf57600080fd5b505af1158015610ed3573d6000803e3d6000fd5b505050506040513d6020811015610ee957600080fd5b50505050565b6000610711610efc610717565b609754604080516370a0823160e01b81523060048201529051610b16926001600160a01b0316916370a08231916024808301926020929190829003018186803b158015610f4857600080fd5b505afa158015610f5c573d6000803e3d6000fd5b505050506040513d6020811015610f7257600080fd5b5051610f7d86610cc3565b90611982565b609b60209081526000928352604080842090915290825290205481565b6065546001600160a01b031690565b60378054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106ef5780601f106106c4576101008083540402835291602001916106ef565b600061070d61101d61140f565b846108fc856040518060600160405280602581526020016123da602591396034600061104761140f565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611b3e565b609754604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b1580156110c357600080fd5b505afa1580156110d7573d6000803e3d6000fd5b505050506040513d60208110156110ed57600080fd5b5051905060006110fb610717565b9050828115158061110b57508215155b156111215761111e83610b168685611982565b90505b61113261112c61140f565b82611bd5565b6097546001600160a01b03166323b872dd61114b61140f565b30876040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050602060405180830381600087803b1580156111a357600080fd5b505af11580156111b7573d6000803e3d6000fd5b505050506040513d60208110156111cd57600080fd5b50610ee99050610cbe61140f565b60006111e78383611cc7565b506111f3610cbe61140f565b61071183611581565b6098546001600160a01b031681565b609d6020526000908152604090205460ff1681565b6000825b8015611263576000818152609b602090815260408083206001600160a01b03871684529091529020549150811561125a57611263565b60001901611224565b5092915050565b600060015b609a5481116112ba576001600160a01b0383166000908152609c6020908152604080832084845290915290205460ff166112b2576112ad8184611cdb565b820191505b60010161126f565b50919050565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6097546001600160a01b031681565b61130261140f565b6001600160a01b0316611313610fa0565b6001600160a01b03161461136e576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166113b35760405162461bcd60e51b81526004018080602001828103825260268152602001806122666026913960400191505060405180910390fd5b6065546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3606580546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6001600160a01b0383166114585760405162461bcd60e51b81526004018080602001828103825260248152602001806123b66024913960400191505060405180910390fd5b6001600160a01b03821661149d5760405162461bcd60e51b815260040180806020018281038252602281526020018061228c6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260346020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600061150c848484611d42565b6115778461151861140f565b6108fc85604051806060016040528060288152602001612323602891396001600160a01b038a1660009081526034602052604081209061155661140f565b6001600160a01b031681526020810191909152604001600020549190611b3e565b5060019392505050565b61158a81610cc3565b609a546001016000908152609b602090815260408083206001600160a01b0390951683529390529190912055565b60008282018381101561073d576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600061161d30611e9f565b15905090565b600054610100900460ff168061163c575061163c611612565b8061164a575060005460ff16155b6116855760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff161580156116b0576000805460ff1961ff0019909116610100171660011790555b6116b8611ea5565b610a378383611f45565b600054610100900460ff16806116db57506116db611612565b806116e9575060005460ff16155b6117245760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff1615801561174f576000805460ff1961ff0019909116610100171660011790555b611757611ea5565b61175f61201d565b8015611771576000805461ff00191690555b50565b6000609a5460001461197e5760015b609a548111610a49576001600160a01b0383166000908152609c6020908152604080832084845290915290205460ff16611976576117c18184611cdb565b609854604080516370a0823160e01b815230600482015290519294506001600160a01b03909116916370a0823191602480820192602092909190829003018186803b15801561180f57600080fd5b505afa158015611823573d6000803e3d6000fd5b505050506040513d602081101561183957600080fd5b505182106118bb57609854604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561188c57600080fd5b505afa1580156118a0573d6000803e3d6000fd5b505050506040513d60208110156118b657600080fd5b505191505b6098546001600160a01b031663a9059cbb6118d461140f565b846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561191b57600080fd5b505af115801561192f573d6000803e3d6000fd5b505050506040513d602081101561194557600080fd5b50506001600160a01b0383166000908152609c602090815260408083208484529091529020805460ff191660011790555b600101611783565b5050565b60008261199157506000610711565b8282028284828161199e57fe5b041461073d5760405162461bcd60e51b81526004018080602001828103825260218152602001806123026021913960400191505060405180910390fd5b6000808211611a31576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381611a3a57fe5b049392505050565b6001600160a01b038216611a875760405162461bcd60e51b81526004018080602001828103825260218152602001806123706021913960400191505060405180910390fd5b611a9382600083610a49565b611ad081604051806060016040528060228152602001612244602291396001600160a01b0385166000908152603360205260409020549190611b3e565b6001600160a01b038316600090815260336020526040902055603554611af69082612116565b6035556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60008184841115611bcd5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611b92578181015183820152602001611b7a565b50505050905090810190601f168015611bbf5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b038216611c30576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611c3c60008383610a49565b603554611c4990826115b8565b6035556001600160a01b038216600090815260336020526040902054611c6f90826115b8565b6001600160a01b03831660008181526033602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600061070d611cd461140f565b8484611d42565b6000611ce5612173565b506000838152609960209081526040808320815180830190925280548083526001909101549282018390529092909190611d1f8787611220565b90508015611d3857611d3583610b168385611982565b94505b5050505092915050565b6001600160a01b038316611d875760405162461bcd60e51b81526004018080602001828103825260258152602001806123916025913960400191505060405180910390fd5b6001600160a01b038216611dcc5760405162461bcd60e51b81526004018080602001828103825260238152602001806122216023913960400191505060405180910390fd5b611dd7838383610a49565b611e14816040518060600160405280602681526020016122ae602691396001600160a01b0386166000908152603360205260409020549190611b3e565b6001600160a01b038085166000908152603360205260408082209390935590841681522054611e4390826115b8565b6001600160a01b0380841660008181526033602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b3b151590565b600054610100900460ff1680611ebe5750611ebe611612565b80611ecc575060005460ff16155b611f075760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff1615801561175f576000805460ff1961ff0019909116610100171660011790558015611771576000805461ff001916905550565b600054610100900460ff1680611f5e5750611f5e611612565b80611f6c575060005460ff16155b611fa75760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff16158015611fd2576000805460ff1961ff0019909116610100171660011790555b8251611fe590603690602086019061218d565b508151611ff990603790602085019061218d565b506038805460ff191660121790558015610a49576000805461ff0019169055505050565b600054610100900460ff16806120365750612036611612565b80612044575060005460ff16155b61207f5760405162461bcd60e51b815260040180806020018281038252602e8152602001806122d4602e913960400191505060405180910390fd5b600054610100900460ff161580156120aa576000805460ff1961ff0019909116610100171660011790555b60006120b461140f565b606580546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015611771576000805461ff001916905550565b60008282111561216d576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b604051806040016040528060008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106121ce57805160ff19168380011785556121fb565b828001600101855582156121fb579182015b828111156121fb5782518255916020019190600101906121e0565b5061220792915061220b565b5090565b5b80821115612207576000815560010161220c56fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e63654f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7745524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654b756b7553776170205374616b696e673a206e6f7420617574686f72697a6564207573657245524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220721063d6edde9ac91565035425457335eb19f758ac23fc03bcb7e8c2ad24571664736f6c634300060c0033";
