/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapPresaleSettings } from "../KukuSwapPresaleSettings";

export class KukuSwapPresaleSettings__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<KukuSwapPresaleSettings> {
    return super.deploy(overrides || {}) as Promise<KukuSwapPresaleSettings>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KukuSwapPresaleSettings {
    return super.attach(address) as KukuSwapPresaleSettings;
  }
  connect(signer: Signer): KukuSwapPresaleSettings__factory {
    return super.connect(signer) as KukuSwapPresaleSettings__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KukuSwapPresaleSettings {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as KukuSwapPresaleSettings;
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "EARLY_ACCESS_MAP",
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
    name: "SETTINGS",
    outputs: [
      {
        internalType: "uint256",
        name: "BASE_FEE",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "STAKING_ADDRESS",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "ROUND1_LENGTH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "MAX_PRESALE_LENGTH",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "earlyAccessTokensLength",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_holdAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_allow",
        type: "bool",
      },
    ],
    name: "editEarlyAccessTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseFee",
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
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getEarlyAccessTokenAtIndex",
    outputs: [
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxPresaleLength",
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
    name: "getRound1Length",
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
    name: "getStakingAddress",
    outputs: [
      {
        internalType: "address payable",
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
        name: "_stakingAddress",
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
        name: "_baseFee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_stakingAddress",
        type: "address",
      },
    ],
    name: "setFeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxLength",
        type: "uint256",
      },
    ],
    name: "setMaxPresaleLength",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_round1Length",
        type: "uint256",
      },
    ],
    name: "setRound1Length",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "userHoldsSufficientRound1Token",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610f28806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80637ee360d7116100a25780638e56424d116100715780638e56424d146102af578063aac91216146102cc578063ade97ab5146102d4578063c4d66de81461030a578063f2fde38b1461033057610116565b80637ee360d714610245578063847e997c146102795780638705fcd4146102815780638da5cb5b146102a757610116565b80634a6da481116100e95780634a6da4811461018757806352cf4fd4146101c157806359477dde1461020157806369fe0e2d14610220578063715018a61461023d57610116565b80630e9ed68b1461011b578063120ac7e61461013f57806315e812ad146101595780632d0d9c2314610161575b600080fd5b610123610356565b604080516001600160a01b039092168252519081900360200190f35b610147610365565b60408051918252519081900360200190f35b61014761036b565b6101476004803603602081101561017757600080fd5b50356001600160a01b0316610371565b6101ad6004803603602081101561019d57600080fd5b50356001600160a01b0316610383565b604080519115158252519081900360200190f35b6101de600480360360208110156101d757600080fd5b503561045b565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61021e6004803603602081101561021757600080fd5b503561048e565b005b61021e6004803603602081101561023657600080fd5b50356104f5565b61021e61055c565b61021e6004803603606081101561025b57600080fd5b506001600160a01b0381351690602081013590604001351515610608565b6101476106ab565b61021e6004803603602081101561029757600080fd5b50356001600160a01b03166106bc565b610123610740565b61021e600480360360208110156102c557600080fd5b503561074f565b6101476107b6565b6102dc6107bc565b604080519485526001600160a01b039093166020850152838301919091526060830152519081900360800190f35b61021e6004803603602081101561032057600080fd5b50356001600160a01b03166107d7565b61021e6004803603602081101561034657600080fd5b50356001600160a01b03166108f4565b606b546001600160a01b031690565b606d5490565b606a5490565b60676020526000908152604090205481565b600061038d6106ab565b61039957506001610456565b60005b6103a46106ab565b811015610450576000806103b78361045b565b9150915080826001600160a01b03166370a08231876040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561040957600080fd5b505afa15801561041d573d6000803e3d6000fd5b505050506040513d602081101561043357600080fd5b5051106104465760019350505050610456565b505060010161039c565b50600090505b919050565b6000808061046a6065856109f7565b6001600160a01b038116600090815260676020526040902054909350915050915091565b610496610a0c565b6001600160a01b03166104a7610740565b6001600160a01b0316146104f0576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b606c55565b6104fd610a0c565b6001600160a01b031661050e610740565b6001600160a01b031614610557576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b606a55565b610564610a0c565b6001600160a01b0316610575610740565b6001600160a01b0316146105be576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b610610610a0c565b6001600160a01b0316610621610740565b6001600160a01b03161461066a576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b80156106815761067b606584610a10565b5061068e565b61068c606584610a25565b505b506001600160a01b03909116600090815260676020526040902055565b60006106b76065610a3a565b905090565b6106c4610a0c565b6001600160a01b03166106d5610740565b6001600160a01b03161461071e576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b606b80546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031690565b610757610a0c565b6001600160a01b0316610768610740565b6001600160a01b0316146107b1576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b606d55565b606c5490565b606a54606b54606c54606d546001600160a01b039092169184565b600054610100900460ff16806107f057506107f0610a45565b806107fe575060005460ff16155b6108395760405162461bcd60e51b815260040180806020018281038252602e815260200180610ea5602e913960400191505060405180910390fd5b600054610100900460ff16158015610864576000805460ff1961ff0019909116610100171660011790555b6001600160a01b0382166108a95760405162461bcd60e51b8152600401808060200182810382526025815260200180610e806025913960400191505060405180910390fd5b6032606a55606b80546001600160a01b0319166001600160a01b0384161790556104b0606c5562016b76606d556108de610a56565b80156108f0576000805461ff00191690555b5050565b6108fc610a0c565b6001600160a01b031661090d610740565b6001600160a01b031614610956576040805162461bcd60e51b81526020600482018190526024820152600080516020610ed3833981519152604482015290519081900360640190fd5b6001600160a01b03811661099b5760405162461bcd60e51b8152600401808060200182810382526026815260200180610e5a6026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b6000610a038383610b08565b90505b92915050565b3390565b6000610a03836001600160a01b038416610b6c565b6000610a03836001600160a01b038416610bb6565b6000610a0682610c7c565b6000610a5030610c80565b15905090565b600054610100900460ff1680610a6f5750610a6f610a45565b80610a7d575060005460ff16155b610ab85760405162461bcd60e51b815260040180806020018281038252602e815260200180610ea5602e913960400191505060405180910390fd5b600054610100900460ff16158015610ae3576000805460ff1961ff0019909116610100171660011790555b610aeb610c86565b610af3610d26565b8015610b05576000805461ff00191690555b50565b81546000908210610b4a5760405162461bcd60e51b8152600401808060200182810382526022815260200180610e386022913960400191505060405180910390fd5b826000018281548110610b5957fe5b9060005260206000200154905092915050565b6000610b788383610e1f565b610bae57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610a06565b506000610a06565b60008181526001830160205260408120548015610c725783546000198083019190810190600090879083908110610be957fe5b9060005260206000200154905080876000018481548110610c0657fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080610c3657fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610a06565b6000915050610a06565b5490565b3b151590565b600054610100900460ff1680610c9f5750610c9f610a45565b80610cad575060005460ff16155b610ce85760405162461bcd60e51b815260040180806020018281038252602e815260200180610ea5602e913960400191505060405180910390fd5b600054610100900460ff16158015610af3576000805460ff1961ff0019909116610100171660011790558015610b05576000805461ff001916905550565b600054610100900460ff1680610d3f5750610d3f610a45565b80610d4d575060005460ff16155b610d885760405162461bcd60e51b815260040180806020018281038252602e815260200180610ea5602e913960400191505060405180910390fd5b600054610100900460ff16158015610db3576000805460ff1961ff0019909116610100171660011790555b6000610dbd610a0c565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610b05576000805461ff001916905550565b6000908152600191909101602052604090205415159056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737350726573616c6553657474696e67733a207374616b696e672061646472657373207a65726f496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a65644f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220e09d2d7b310c45d69868749206516458bdc0ce99a258e3dcdcbd52a36c1a361064736f6c634300060c0033";
