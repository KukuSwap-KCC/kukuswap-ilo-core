/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapPresaleGenerator } from "../KukuSwapPresaleGenerator";

export class KukuSwapPresaleGenerator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<KukuSwapPresaleGenerator> {
    return super.deploy(overrides || {}) as Promise<KukuSwapPresaleGenerator>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): KukuSwapPresaleGenerator {
    return super.attach(address) as KukuSwapPresaleGenerator;
  }
  connect(signer: Signer): KukuSwapPresaleGenerator__factory {
    return super.connect(signer) as KukuSwapPresaleGenerator__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): KukuSwapPresaleGenerator {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as KukuSwapPresaleGenerator;
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
    inputs: [],
    name: "PRESALE_SETTINGS",
    outputs: [
      {
        internalType: "contract IKukuSwapPresaleSettings",
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
        internalType: "address payable",
        name: "_presaleOwner",
        type: "address",
      },
      {
        internalType: "contract IERC20Ext",
        name: "_presaleToken",
        type: "address",
      },
      {
        internalType: "contract IERC20Ext",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "uint256[10]",
        name: "uint_params",
        type: "uint256[10]",
      },
      {
        internalType: "bool",
        name: "lockTokens",
        type: "bool",
      },
    ],
    name: "createPresale",
    outputs: [
      {
        internalType: "contract KukuSwapPresale",
        name: "newPresale",
        type: "address",
      },
    ],
    stateMutability: "payable",
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
        name: "_wkcs",
        type: "address",
      },
      {
        internalType: "address",
        name: "_settings",
        type: "address",
      },
      {
        internalType: "address",
        name: "_lockForwarder",
        type: "address",
      },
      {
        internalType: "address",
        name: "_devAddress",
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
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_listingRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_liquidityPercent",
        type: "uint256",
      },
    ],
    name: "tokensRequiredForPresale",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b50613b38806100206000396000f3fe60806040526004361061007b5760003560e01c80638da5cb5b1161004e5780638da5cb5b14610191578063cd608cbb146101a6578063f2fde38b146101bb578063f466858d146101ee5761007b565b80630bbebba4146100805780631459457a146100b15780634eb4780d14610108578063715018a61461017c575b600080fd5b34801561008c57600080fd5b5061009561023c565b604080516001600160a01b039092168252519081900360200190f35b3480156100bd57600080fd5b50610106600480360360a08110156100d457600080fd5b506001600160a01b0381358116916020810135821691604082013581169160608101358216916080909101351661024b565b005b61009560048036036101c081101561011f57600080fd5b6040805161014081810183526001600160a01b0385358116956020810135821695948101359091169381019290916101a0830191906060840190600a90839083908082843760009201919091525091945050503515159050610350565b34801561018857600080fd5b506101066109df565b34801561019d57600080fd5b50610095610a9d565b3480156101b257600080fd5b50610095610aac565b3480156101c757600080fd5b50610106600480360360208110156101de57600080fd5b50356001600160a01b0316610abb565b3480156101fa57600080fd5b5061022a6004803603608081101561021157600080fd5b5080359060208101359060408101359060600135610bd0565b60408051918252519081900360200190f35b6066546001600160a01b031681565b600054610100900460ff16806102645750610264610be7565b80610272575060005460ff16155b6102ad5760405162461bcd60e51b815260040180806020018281038252602e815260200180613a90602e913960400191505060405180910390fd5b600054610100900460ff161580156102d8576000805460ff1961ff0019909116610100171660011790555b606580546001600160a01b03199081166001600160a01b038981169190911790925560668054821687841617905560678054821688841617905560688054821686841617905560698054909116918416919091179055610336610bf8565b8015610348576000805461ff00191690555b505050505050565b600061035a611177565b835181526020808501519082015260408085015190820152606080850151908201526080808501519082015260a0808501519082015260c0808501519082015260e0808501519082015261010080850151908201526101208085015190820181905264718dd3000011156103d357620c4e006101208201525b80516127101115610417576040805162461bcd60e51b81526020600482015260096024820152684d494e20444956495360b81b604482015290519081900360640190fd5b606660009054906101000a90046001600160a01b03166001600160a01b031663120ac7e66040518163ffffffff1660e01b815260040160206040518083038186803b15801561046557600080fd5b505afa158015610479573d6000803e3d6000fd5b505050506040513d602081101561048f57600080fd5b505160e08201516101008301516104a591610caa565b11156104b057600080fd5b60006104cd82606001518360200151610d0c90919063ffffffff16565b11610510576040805162461bcd60e51b815260206004820152600e60248201526d494e56414c494420504152414d5360901b604482015290519081900360640190fd5b61012c8160a001511015801561052c57506103e88160a0015111155b61056d576040805162461bcd60e51b815260206004820152600d60248201526c4d494e204c495155494449545960981b604482015290519081900360640190fd5b60655460675460665460685460695460405130956001600160a01b039081169581169481169381169216906105a1906111ca565b6001600160a01b0396871681529486166020860152928516604080860191909152918516606085015284166080840152921660a082015290519081900360c001906000f0801580156105f7573d6000803e3d6000fd5b509150821561062e57600061061e826000015183602001518460c001518560a00151610bd0565b905061062c87338584610d6c565b505b816001600160a01b031663b93ac79288836000015184602001518560400151866060015187608001518860a001518960c001518a60e001518b61010001518c61012001516040518c63ffffffff1660e01b8152600401808c6001600160a01b031681526020018b81526020018a81526020018981526020018881526020018781526020018681526020018581526020018481526020018381526020018281526020019b505050505050505050505050600060405180830381600087803b1580156106f757600080fd5b505af115801561070b573d6000803e3d6000fd5b50505050816001600160a01b0316633c74d3308688606660009054906101000a90046001600160a01b03166001600160a01b03166315e812ad6040518163ffffffff1660e01b815260040160206040518083038186803b15801561076e57600080fd5b505afa158015610782573d6000803e3d6000fd5b505050506040513d602081101561079857600080fd5b505160665460408051630e9ed68b60e01b815290516001600160a01b0390921691630e9ed68b91600480820192602092909190829003018186803b1580156107df57600080fd5b505afa1580156107f3573d6000803e3d6000fd5b505050506040513d602081101561080957600080fd5b5051604080516001600160e01b031960e088901b1681526001600160a01b039586166004820152938516602485015260448401929092529290921660648201529051608480830192600092919082900301818387803b15801561086b57600080fd5b505af115801561087f573d6000803e3d6000fd5b50506065546040805163c2606c2f60e01b81526001600160a01b0387811660048301528c81166024830152915191909216935063c2606c2f9250604480830192600092919082900301818387803b1580156108d957600080fd5b505af11580156108ed573d6000803e3d6000fd5b50505050606660009054906101000a90046001600160a01b03166001600160a01b0316630e9ed68b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561093f57600080fd5b505afa158015610953573d6000803e3d6000fd5b505050506040513d602081101561096957600080fd5b505160408051632d1fb38960e01b81526001600160a01b0385811660048301526001602483015291519190921691632d1fb38991604480830192600092919082900301818387803b1580156109bd57600080fd5b505af11580156109d1573d6000803e3d6000fd5b505050505095945050505050565b6109e7610ec1565b6001600160a01b03166109f8610a9d565b6001600160a01b031614610a53576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b6033546001600160a01b031690565b6065546001600160a01b031681565b610ac3610ec1565b6001600160a01b0316610ad4610a9d565b6001600160a01b031614610b2f576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b038116610b745760405162461bcd60e51b8152600401808060200182810382526026815260200180613a6a6026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b6000610bde85858585610ec5565b95945050505050565b6000610bf230610f17565b15905090565b600054610100900460ff1680610c115750610c11610be7565b80610c1f575060005460ff16155b610c5a5760405162461bcd60e51b815260040180806020018281038252602e815260200180613a90602e913960400191505060405180910390fd5b600054610100900460ff16158015610c85576000805460ff1961ff0019909116610100171660011790555b610c8d610f1d565b610c95610fbd565b8015610ca7576000805461ff00191690555b50565b600082821115610d01576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b600082610d1b57506000610d06565b82820282848281610d2857fe5b0414610d655760405162461bcd60e51b8152600401808060200182810382526021815260200180613abe6021913960400191505060405180910390fd5b9392505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17815292518251600094606094938a169392918291908083835b60208310610df15780518252601f199092019160209182019101610dd2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610e53576040519150601f19603f3d011682016040523d82523d6000602084013e610e58565b606091505b5091509150818015610e86575080511580610e865750808060200190516020811015610e8357600080fd5b50515b6103485760405162461bcd60e51b8152600401808060200182810382526024815260200180613adf6024913960400191505060405180910390fd5b3390565b600080610ede85610ed8866103e8610d0c565b906110b6565b90506000610efd620f4240610ed884610ef78b89610d0c565b90610d0c565b90506000610f0b888361111d565b98975050505050505050565b3b151590565b600054610100900460ff1680610f365750610f36610be7565b80610f44575060005460ff16155b610f7f5760405162461bcd60e51b815260040180806020018281038252602e815260200180613a90602e913960400191505060405180910390fd5b600054610100900460ff16158015610c95576000805460ff1961ff0019909116610100171660011790558015610ca7576000805461ff001916905550565b600054610100900460ff1680610fd65750610fd6610be7565b80610fe4575060005460ff16155b61101f5760405162461bcd60e51b815260040180806020018281038252602e815260200180613a90602e913960400191505060405180910390fd5b600054610100900460ff1615801561104a576000805460ff1961ff0019909116610100171660011790555b6000611054610ec1565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610ca7576000805461ff001916905550565b600080821161110c576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161111557fe5b049392505050565b600082820183811015610d65576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b604051806101400160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b612892806111d88339019056fe60806040526001805534801561001457600080fd5b50604051612892380380612892833981810160405260c081101561003757600080fd5b508051602082015160408301516060840151608085015160a0909501516001600055601980546001600160a01b039687166001600160a01b031991821617909155601d805495871695821695909517909455601e805493861693851693909317909255601c8054918516918416919091179055601b805494841694831694909417909355601a80549290931691161790556127bb806100d76000396000f3fe6080604052600436106101c25760003560e01c80639f07203a116100f7578063c39e7dbb11610095578063e8078d9411610064578063e8078d941461070e578063e86e634014610723578063f868e76614610738578063fe8121de14610755576101c2565b8063c39e7dbb14610653578063c870279e14610668578063d0d41fe11461067d578063e33865b3146106b0576101c2565b8063acab21e0116100d1578063acab21e01461056f578063acfb235514610584578063b93ac79214610599578063b9863a441461060c576101c2565b80639f07203a1461050f578063a5d0de8c14610524578063a94e7e801461055a576101c2565b80634bb18e3f116101645780637bfc66001161013e5780637bfc6600146104095780638c301df81461041e578063927ac44d146104485780639dcff856146104fa576101c2565b80634bb18e3f146103af5780635639e8cf146103c4578063760fe56e146103d9576101c2565b806338b90333116101a057806338b90333146102705780633c74d330146102975780633f74aa38146102e05780634200e4fc14610383576101c2565b80630bbebba4146101c757806310c55f2b146101f857806324ef1bc714610244575b600080fd5b3480156101d357600080fd5b506101dc61076a565b604080516001600160a01b039092168252519081900360200190f35b34801561020457600080fd5b5061022b6004803603602081101561021b57600080fd5b50356001600160a01b0316610779565b6040805192835260208301919091528051918290030190f35b34801561025057600080fd5b5061026e6004803603602081101561026757600080fd5b5035610792565b005b34801561027c57600080fd5b506102856107ea565b60408051918252519081900360200190f35b3480156102a357600080fd5b5061026e600480360360808110156102ba57600080fd5b506001600160a01b038135811691602081013582169160408201359160600135166107f0565b3480156102ec57600080fd5b506102f56109c9565b604051808f6001600160a01b031681526020018e6001600160a01b031681526020018d6001600160a01b031681526020018c81526020018b81526020018a815260200189815260200188815260200187815260200186815260200185815260200184815260200183815260200182151581526020019e50505050505050505050505050505060405180910390f35b34801561038f57600080fd5b5061026e600480360360208110156103a657600080fd5b50351515610a0d565b3480156103bb57600080fd5b50610285610a73565b3480156103d057600080fd5b506101dc610a85565b3480156103e557600080fd5b5061026e600480360360408110156103fc57600080fd5b5080359060200135610a94565b34801561041557600080fd5b506101dc610bcb565b34801561042a57600080fd5b506101dc6004803603602081101561044157600080fd5b5035610bda565b34801561045457600080fd5b5061026e6004803603604081101561046b57600080fd5b81019060208101813564010000000081111561048657600080fd5b82018360208201111561049857600080fd5b803590602001918460208302840111640100000000831117156104ba57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505050503515159050610bed565b34801561050657600080fd5b5061026e610cca565b34801561051b57600080fd5b506101dc610cdd565b34801561053057600080fd5b50610539610cec565b604080519283526001600160a01b0390911660208301528051918290030190f35b34801561056657600080fd5b5061026e610cfe565b34801561057b57600080fd5b506101dc610dee565b34801561059057600080fd5b50610285610dfd565b3480156105a557600080fd5b5061026e60048036036101608110156105bd57600080fd5b506001600160a01b038135169060208101359060408101359060608101359060808101359060a08101359060c08101359060e08101359061010081013590610120810135906101400135610e96565b34801561061857600080fd5b5061063f6004803603602081101561062f57600080fd5b50356001600160a01b0316610f2e565b604080519115158252519081900360200190f35b34801561065f57600080fd5b5061026e610f3b565b34801561067457600080fd5b506101dc611132565b34801561068957600080fd5b5061026e600480360360208110156106a057600080fd5b50356001600160a01b0316611141565b3480156106bc57600080fd5b506106c5611163565b604080519915158a5297151560208a0152951515888801526060880194909452608087019290925260a086015260c085015260e084015261010083015251908190036101200190f35b34801561071a57600080fd5b5061026e61119c565b34801561072f57600080fd5b5061026e611758565b61026e6004803603602081101561074e57600080fd5b5035611823565b34801561076157600080fd5b5061026e611bcd565b601c546001600160a01b031681565b601f602052600090815260409020805460019091015482565b6002546001600160a01b031633146107e5576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b600655565b60015481565b6019546001600160a01b0316331461083b576040805162461bcd60e51b81526020600482015260096024820152682327a92124a22222a760b91b604482015290519081900360640190fd5b601b546040805163d7d9aa8560e01b81526001600160a01b03868116600483015287811660248301529151919092169163d7d9aa85916044808301926020929190829003018186803b15801561089057600080fd5b505afa1580156108a4573d6000803e3d6000fd5b505050506040513d60208110156108ba57600080fd5b505115610901576040805162461bcd60e51b815260206004820152601060248201526f1410525488125392551250531254d15160821b604482015290519081900360640190fd5b601e54600f805460ff19166001600160a01b03878116938116841491909117909155600380548683166001600160a01b03199182161790915560048054821690931783556010859055601180548584169216919091179055601c5460408051635564890b60e11b81529051919092169263aac9121692808201926020929091829003018186803b15801561099457600080fd5b505afa1580156109a8573d6000803e3d6000fd5b505050506040513d60208110156109be57600080fd5b505160175550505050565b600254600354600454600554600654600754600854600954600a54600b54600c54600d54600e54600f546001600160a01b039d8e169d9c8d169c909b169a60ff168e565b6002546001600160a01b03163314610a60576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b6012805460ff1916911515919091179055565b6000610a7f6020611daa565b90505b90565b601a546001600160a01b031681565b6002546001600160a01b03163314610ae7576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b600c544310610b31576040805162461bcd60e51b815260206004820152601160248201527050524553414c452049532041435449564560781b604482015290519081900360640190fd5b601c60009054906101000a90046001600160a01b03166001600160a01b031663120ac7e66040518163ffffffff1660e01b815260040160206040518083038186803b158015610b7f57600080fd5b505afa158015610b93573d6000803e3d6000fd5b505050506040513d6020811015610ba957600080fd5b5051610bb58284611db5565b1115610bc057600080fd5b600c91909155600d55565b601b546001600160a01b031681565b6000610be7602083611e12565b92915050565b6002546001600160a01b03163314610c40576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b8015610c885760005b8251811015610c8257610c79838281518110610c6157fe5b60200260200101516020611e2590919063ffffffff16565b50600101610c49565b50610cc6565b60005b8251811015610cc457610cbb838281518110610ca357fe5b60200260200101516020611e3a90919063ffffffff16565b50600101610c8b565b505b5050565b6012805462ff0000191662010000179055565b601d546001600160a01b031681565b6010546011546001600160a01b031682565b6002546001600160a01b03163314610d51576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b610d59610dfd565b600314610d6557600080fd5b600354600254604080516370a0823160e01b81523060048201529051610dec936001600160a01b0390811693169183916370a0823191602480820192602092909190829003018186803b158015610dbb57600080fd5b505afa158015610dcf573d6000803e3d6000fd5b505050506040513d6020811015610de557600080fd5b5051611e4f565b565b601e546001600160a01b031681565b60125460009062010000900460ff1615610e1957506003610a82565b600d5443118015610e2d5750600954601354105b15610e3a57506003610a82565b60085460135410610e4d57506002610a82565b600d5443118015610e62575060095460135410155b15610e6f57506002610a82565b600c544310801590610e835750600d544311155b15610e9057506001610a82565b50600090565b6019546001600160a01b03163314610ee1576040805162461bcd60e51b81526020600482015260096024820152682327a92124a22222a760b91b604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b039c909c169b909b17909a55600798909855600596909655600694909455600892909255600955600a55600b55600c55600d55600e55565b6000610be7602083611fb9565b60026000541415610f81576040805162461bcd60e51b815260206004820152601f6024820152600080516020612721833981519152604482015290519081900360640190fd5b6002600055610f8e610dfd565b600314610fcf576040805162461bcd60e51b815260206004820152600a6024820152691393d50811905253115160b21b604482015290519081900360640190fd5b336000908152601f60205260408120601654601354919291610ff091611db5565b600f5490915060009060ff1661107d5760048054604080516370a0823160e01b81523093810193909352516001600160a01b03909116916370a08231916024808301926020929190829003018186803b15801561104c57600080fd5b505afa158015611060573d6000803e3d6000fd5b505050506040513d602081101561107657600080fd5b505161107f565b475b905060006110a48361109e866000015485611fce90919063ffffffff16565b90612027565b9050600081116110f1576040805162461bcd60e51b81526020600482015260136024820152724e4f5448494e4720544f20574954484452415760681b604482015290519081900360640190fd5b83546016546110ff9161208e565b60165560008455600454600f54611127916001600160a01b0316903390849060ff16156120e8565b505060016000555050565b6019546001600160a01b031681565b601a80546001600160a01b0319166001600160a01b0392909216919091179055565b60125460135460145460155460165460175460185460ff8088169761010081048216976201000090910490911695909490939092909189565b600260005414156111e2576040805162461bcd60e51b815260206004820152601f6024820152600080516020612721833981519152604482015290519081900360640190fd5b6002600055601254610100900460ff161561123a576040805162461bcd60e51b815260206004820152601360248201527247454e45524154494f4e20434f4d504c45544560681b604482015290519081900360640190fd5b611242610dfd565b600214611284576040805162461bcd60e51b815260206004820152600b60248201526a4e4f54205355434345535360a81b604482015290519081900360640190fd5b601b54600354600480546040805163d7d9aa8560e01b81526001600160a01b0394851693810193909352908316602483015251919092169163d7d9aa85916044808301926020929190829003018186803b1580156112e157600080fd5b505afa1580156112f5573d6000803e3d6000fd5b505050506040513d602081101561130b57600080fd5b505115611328576012805462ff0000191662010000179055611751565b601054601354600091611343916103e89161109e9190611fce565b905060006113746103e861109e60026008015461136e86601260010154611db590919063ffffffff16565b90611fce565b600f5490915060ff16156113e257601e546001600160a01b031663d0e30db061139d838561208e565b6040518263ffffffff1660e01b81526004016000604051808303818588803b1580156113c857600080fd5b505af11580156113dc573d6000803e3d6000fd5b50505050505b600454601b546113ff916001600160a01b03908116911683612295565b600480546040805163313ce56760e01b81529051600093611488936001600160a01b03169263313ce5679281830192602092829003018186803b15801561144557600080fd5b505afa158015611459573d6000803e3d6000fd5b505050506040513d602081101561146f57600080fd5b5051600b5460ff909116600a0a9061109e908590611fce565b600354601b549192506114a8916001600160a01b03918216911683612295565b601b5460048054600354600e5460025460408051632277d0e360e01b81526001600160a01b039586169681019690965292841660248601526044850188905260648501879052439091016084850152821660a484015251921691632277d0e39160c48082019260009290919082900301818387803b15801561152957600080fd5b505af115801561153d573d6000803e3d6000fd5b505060045460115461155e93506001600160a01b0391821692501685612295565b601154600480546040805163f9a59a5160e01b81529283018790526001600160a01b0391821660248401525192169163f9a59a519160448082019260009290919082900301818387803b1580156115b457600080fd5b505af11580156115c8573d6000803e3d6000fd5b5050600354604080516370a0823160e01b81523060048201529051600094506001600160a01b0390921692506370a08231916024808301926020929190829003018186803b15801561161957600080fd5b505afa15801561162d573d6000803e3d6000fd5b505050506040513d602081101561164357600080fd5b505160145490915081111561168557601454600090611663908390611db5565b600354600254919250611683916001600160a01b03918216911683611e4f565b505b600f5460009060ff1661170f5760048054604080516370a0823160e01b81523093810193909352516001600160a01b03909116916370a08231916024808301926020929190829003018186803b1580156116de57600080fd5b505afa1580156116f2573d6000803e3d6000fd5b505050506040513d602081101561170857600080fd5b5051611711565b475b600454600254600f5492935061173c926001600160a01b039283169290911690849060ff16156120e8565b50506012805461ff0019166101001790555050505b6001600055565b601254610100900460ff16158015611779575060125462010000900460ff16155b61178257600080fd5b601b54600354600480546040805163d7d9aa8560e01b81526001600160a01b0394851693810193909352908316602483015251919092169163d7d9aa85916044808301926020929190829003018186803b1580156117df57600080fd5b505afa1580156117f3573d6000803e3d6000fd5b505050506040513d602081101561180957600080fd5b505115610dec576012805462ff0000191662010000179055565b60026000541415611869576040805162461bcd60e51b815260206004820152601f6024820152600080516020612721833981519152604482015290519081900360640190fd5b6002600055611876610dfd565b6001146118b7576040805162461bcd60e51b815260206004820152600a6024820152694e4f542041435449564560b01b604482015290519081900360640190fd5b60125460ff1615611910576118cd602033611fb9565b611910576040805162461bcd60e51b815260206004820152600f60248201526e1393d50815d2125511531254d51151608a1b604482015290519081900360640190fd5b601754600c54014310156119d057601c5460408051634a6da48160e01b815233600482015290516001600160a01b0390921691634a6da48191602480820192602092909190829003018186803b15801561196957600080fd5b505afa15801561197d573d6000803e3d6000fd5b505050506040513d602081101561199357600080fd5b50516119d05760405162461bcd60e51b81526004018080602001828103825260218152602001806126de6021913960400191505060405180910390fd5b336000908152601f60205260408120600f5490919060ff166119f257826119f4565b345b8254600654919250600091611a0891611db5565b6013546008549192509003808211611a205781611a22565b805b915081831115611a30578192505b600480546040805163313ce56760e01b81529051600093611ab9936001600160a01b03169263313ce5679281830192602092829003018186803b158015611a7657600080fd5b505afa158015611a8a573d6000803e3d6000fd5b505050506040513d6020811015611aa057600080fd5b505160055460ff909116600a0a9061109e908790611fce565b905060008111611afe576040805162461bcd60e51b815260206004820152600b60248201526a5a45524f20544f4b454e5360a81b604482015290519081900360640190fd5b8454611b0e576018805460010190555b8454611b1a908561208e565b85556001850154611b2b908261208e565b6001860155601354611b3d908561208e565b601355601454611b4d908261208e565b601455600f5460ff168015611b6157503484105b15611b9e57336108fc611b743487611db5565b6040518115909202916000818181858888f19350505050158015611b9c573d6000803e3d6000fd5b505b600f5460ff16611bc057600454611bc0906001600160a01b03163330876123f8565b5050600160005550505050565b60026000541415611c13576040805162461bcd60e51b815260206004820152601f6024820152600080516020612721833981519152604482015290519081900360640190fd5b6002600055601254610100900460ff16611c6d576040805162461bcd60e51b815260206004820152601660248201527520aba0a4aa24a7239026281023a2a722a920aa24a7a760511b604482015290519081900360640190fd5b336000908152601f60205260408120601554601454919291611c8e91611db5565b6001830154600354604080516370a0823160e01b81523060048201529051939450600093611d2193869361109e9391926001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015611cef57600080fd5b505afa158015611d03573d6000803e3d6000fd5b505050506040513d6020811015611d1957600080fd5b505190611fce565b905060008111611d6e576040805162461bcd60e51b81526020600482015260136024820152724e4f5448494e4720544f20574954484452415760681b604482015290519081900360640190fd5b6001830154601554611d7f9161208e565b60155560006001840155600354611da0906001600160a01b03163383611e4f565b5050600160005550565b6000610be78261254d565b600082821115611e0c576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000611e1e8383612551565b9392505050565b6000611e1e836001600160a01b0384166125b5565b6000611e1e836001600160a01b0384166125ff565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b178152925182516000946060949389169392918291908083835b60208310611ecc5780518252601f199092019160209182019101611ead565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611f2e576040519150601f19603f3d011682016040523d82523d6000602084013e611f33565b606091505b5091509150818015611f61575080511580611f615750808060200190516020811015611f5e57600080fd5b50515b611fb2576040805162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b5050505050565b6000611e1e836001600160a01b0384166126c5565b600082611fdd57506000610be7565b82820282848281611fea57fe5b0414611e1e5760405162461bcd60e51b81526004018080602001828103825260218152602001806127416021913960400191505060405180910390fd5b600080821161207d576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161208657fe5b049392505050565b600082820183811015611e1e576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b80612129576040516001600160a01b0384169083156108fc029084906000818181858888f19350505050158015612123573d6000803e3d6000fd5b5061228f565b604080516001600160a01b038581166024830152604480830186905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17815292518251600094606094938a169392918291908083835b602083106121a65780518252601f199092019160209182019101612187565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612208576040519150601f19603f3d011682016040523d82523d6000602084013e61220d565b606091505b509150915081801561223b57508051158061223b575080806020019051602081101561223857600080fd5b50515b61228c576040805162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b50505b50505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b178152925182516000946060949389169392918291908083835b602083106123125780518252601f1990920191602091820191016122f3565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612374576040519150601f19603f3d011682016040523d82523d6000602084013e612379565b606091505b50915091508180156123a75750805115806123a757508080602001905160208110156123a457600080fd5b50515b611fb2576040805162461bcd60e51b815260206004820152601e60248201527f5472616e7366657248656c7065723a20415050524f56455f4641494c45440000604482015290519081900360640190fd5b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17815292518251600094606094938a169392918291908083835b6020831061247d5780518252601f19909201916020918201910161245e565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146124df576040519150601f19603f3d011682016040523d82523d6000602084013e6124e4565b606091505b5091509150818015612512575080511580612512575080806020019051602081101561250f57600080fd5b50515b61228c5760405162461bcd60e51b81526004018080602001828103825260248152602001806127626024913960400191505060405180910390fd5b5490565b815460009082106125935760405162461bcd60e51b81526004018080602001828103825260228152602001806126ff6022913960400191505060405180910390fd5b8260000182815481106125a257fe5b9060005260206000200154905092915050565b60006125c183836126c5565b6125f757508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610be7565b506000610be7565b600081815260018301602052604081205480156126bb578354600019808301919081019060009087908390811061263257fe5b906000526020600020015490508087600001848154811061264f57fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061267f57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610be7565b6000915050610be7565b6000908152600191909101602052604090205415159056fe494e535546464943454e5420524f554e44203120544f4b454e2042414c414e4345456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64735265656e7472616e637947756172643a207265656e7472616e742063616c6c00536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775472616e7366657248656c7065723a205452414e534645525f46524f4d5f4641494c4544a2646970667358221220eb73b2623d26820b757e0b92436a094ac226fa61d9c5161cf999c5e0f892315064736f6c634300060c00334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775472616e7366657248656c7065723a205452414e534645525f46524f4d5f4641494c4544a2646970667358221220300df7b5f4351d34e994e8cee73764eeba404c2a2f66d80ef0a1b32aada3191164736f6c634300060c0033";