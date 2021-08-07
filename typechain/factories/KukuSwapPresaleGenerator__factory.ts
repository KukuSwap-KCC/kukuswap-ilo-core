/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { KukuSwapPresaleGenerator } from "../KukuSwapPresaleGenerator";

export class KukuSwapPresaleGenerator__factory extends ContractFactory {
  constructor(
    linkLibraryAddresses: KukuSwapPresaleGeneratorLibraryAddresses,
    signer?: Signer
  ) {
    super(
      _abi,
      KukuSwapPresaleGenerator__factory.linkBytecode(linkLibraryAddresses),
      signer
    );
  }

  static linkBytecode(
    linkLibraryAddresses: KukuSwapPresaleGeneratorLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$83d0be577c2bd4dc062e29de8810c29401\\$__", "g"),
      linkLibraryAddresses["__$83d0be577c2bd4dc062e29de8810c29401$__"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
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
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "contract IERC20",
        name: "_presaleToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "uint256[10]",
        name: "uint_params",
        type: "uint256[10]",
      },
    ],
    name: "createPresale",
    outputs: [],
    stateMutability: "payable",
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
  "0x608060405234801561001057600080fd5b50600061001b610086565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b031990811690915560028054909116905561008a565b3390565b613401806100996000396000f3fe6080604052600436106100555760003560e01c80630bbebba41461005a578063715018a61461008b5780638da5cb5b146100a2578063b0d7b38b146100b7578063cd608cbb14610129578063f2fde38b1461013e575b600080fd5b34801561006657600080fd5b5061006f610171565b604080516001600160a01b039092168252519081900360200190f35b34801561009757600080fd5b506100a0610180565b005b3480156100ae57600080fd5b5061006f61023e565b6100a060048036036101a08110156100ce57600080fd5b6040805161014081810183526001600160a01b0385358116956020810135821695948101359091169381019290916101a0830191906060840190600a90839083908082843760009201919091525091945061024d9350505050565b34801561013557600080fd5b5061006f61081d565b34801561014a57600080fd5b506100a06004803603602081101561016157600080fd5b50356001600160a01b031661082c565b6002546001600160a01b031681565b610188610940565b6001600160a01b031661019961023e565b6001600160a01b0316146101f4576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b610255610b63565b815181526020808301519082015260408083015190820152606080830151908201526080808301519082015260a0808301519082015260c0808301519082015260e080830151908201526101008083015190820152610120808301519082018190526224ea0011156102cc576224ea006101208201525b80516127101115610310576040805162461bcd60e51b81526020600482015260096024820152684d494e20444956495360b81b604482015290519081900360640190fd5b600260009054906101000a90046001600160a01b03166001600160a01b031663120ac7e66040518163ffffffff1660e01b815260040160206040518083038186803b15801561035e57600080fd5b505afa158015610372573d6000803e3d6000fd5b505050506040513d602081101561038857600080fd5b505160e082015161010083015161039e91610944565b11156103a957600080fd5b60006103c6826060015183602001516109a690919063ffffffff16565b11610409576040805162461bcd60e51b815260206004820152600e60248201526d494e56414c494420504152414d5360901b604482015290519081900360640190fd5b61012c8160a001511015801561042557506103e88160a0015111155b610466576040805162461bcd60e51b815260206004820152600d60248201526c4d494e204c495155494449545960981b604482015290519081900360640190fd5b805160208083015160c084015160a08501516040805163acc7d4dd60e01b815260048101969096526024860193909352604485019190915260648401525160009273__$83d0be577c2bd4dc062e29de8810c29401$__9263acc7d4dd92608480840193829003018186803b1580156104dd57600080fd5b505af41580156104f1573d6000803e3d6000fd5b505050506040513d602081101561050757600080fd5b5051604051909150600090309061051d90610bb6565b6001600160a01b03909116815260405190819003602001906000f08015801561054a573d6000803e3d6000fd5b50905061055986338385610a06565b806001600160a01b031663b93ac79288856000015186602001518760400151886060015189608001518a60a001518b60c001518c60e001518d61010001518e61012001516040518c63ffffffff1660e01b8152600401808c6001600160a01b031681526020018b81526020018a81526020018981526020018881526020018781526020018681526020018581526020018481526020018381526020018281526020019b505050505050505050505050600060405180830381600087803b15801561062257600080fd5b505af1158015610636573d6000803e3d6000fd5b50505050806001600160a01b0316633c74d3308688600260009054906101000a90046001600160a01b03166001600160a01b03166315e812ad6040518163ffffffff1660e01b815260040160206040518083038186803b15801561069957600080fd5b505afa1580156106ad573d6000803e3d6000fd5b505050506040513d60208110156106c357600080fd5b505160025460408051630e9ed68b60e01b815290516001600160a01b0390921691630e9ed68b91600480820192602092909190829003018186803b15801561070a57600080fd5b505afa15801561071e573d6000803e3d6000fd5b505050506040513d602081101561073457600080fd5b5051604080516001600160e01b031960e088901b1681526001600160a01b039586166004820152938516602485015260448401929092529290921660648201529051608480830192600092919082900301818387803b15801561079657600080fd5b505af11580156107aa573d6000803e3d6000fd5b5050600154604080516311c065b760e01b81526001600160a01b03868116600483015291519190921693506311c065b79250602480830192600092919082900301818387803b1580156107fc57600080fd5b505af1158015610810573d6000803e3d6000fd5b5050505050505050505050565b6001546001600160a01b031681565b610834610940565b6001600160a01b031661084561023e565b6001600160a01b0316146108a0576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166108e55760405162461bcd60e51b81526004018080602001828103825260268152602001806133616026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b60008282111561099b576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b6000826109b5575060006109a0565b828202828482816109c257fe5b04146109ff5760405162461bcd60e51b81526004018080602001828103825260218152602001806133876021913960400191505060405180910390fd5b9392505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17815292518251600094606094938a169392918291908083835b60208310610a8b5780518252601f199092019160209182019101610a6c565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610aed576040519150601f19603f3d011682016040523d82523d6000602084013e610af2565b606091505b5091509150818015610b20575080511580610b205750808060200190516020811015610b1d57600080fd5b50515b610b5b5760405162461bcd60e51b81526004018080602001828103825260248152602001806133a86024913960400191505060405180910390fd5b505050505050565b604051806101400160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b61279d80610bc48339019056fe60806040526001805534801561001457600080fd5b5060405161279d38038061279d8339818101604052602081101561003757600080fd5b50516001600055601a80546001600160a01b039092166001600160a01b0319928316179055601e805482169055601f805482169055601d805482169055601c805482169055601b80549091169055612709806100946000396000f3fe6080604052600436106101c25760003560e01c80639f07203a116100f7578063c39e7dbb11610095578063e8078d9411610064578063e8078d9414610715578063e86e63401461072a578063f868e7661461073f578063fe8121de1461075c576101c2565b8063c39e7dbb1461065a578063c870279e1461066f578063d0d41fe114610684578063e33865b3146106b7576101c2565b8063acab21e0116100d1578063acab21e014610576578063acfb23551461058b578063b93ac792146105a0578063b9863a4414610613576101c2565b80639f07203a1461050f578063a5d0de8c14610524578063a94e7e8014610561576101c2565b80634bb18e3f116101645780637bfc66001161013e5780637bfc6600146104095780638c301df81461041e578063927ac44d146104485780639dcff856146104fa576101c2565b80634bb18e3f146103af5780635639e8cf146103c4578063760fe56e146103d9576101c2565b806338b90333116101a057806338b90333146102705780633c74d330146102975780633f74aa38146102e05780634200e4fc14610383576101c2565b80630bbebba4146101c757806310c55f2b146101f857806324ef1bc714610244575b600080fd5b3480156101d357600080fd5b506101dc610771565b604080516001600160a01b039092168252519081900360200190f35b34801561020457600080fd5b5061022b6004803603602081101561021b57600080fd5b50356001600160a01b0316610780565b6040805192835260208301919091528051918290030190f35b34801561025057600080fd5b5061026e6004803603602081101561026757600080fd5b5035610798565b005b34801561027c57600080fd5b506102856107f0565b60408051918252519081900360200190f35b3480156102a357600080fd5b5061026e600480360360808110156102ba57600080fd5b506001600160a01b038135811691602081013582169160408201359160600135166107f6565b3480156102ec57600080fd5b506102f5610909565b604051808f6001600160a01b031681526020018e6001600160a01b031681526020018d6001600160a01b031681526020018c81526020018b81526020018a815260200189815260200188815260200187815260200186815260200185815260200184815260200183815260200182151581526020019e50505050505050505050505050505060405180910390f35b34801561038f57600080fd5b5061026e600480360360208110156103a657600080fd5b5035151561094d565b3480156103bb57600080fd5b506102856109b3565b3480156103d057600080fd5b506101dc6109c5565b3480156103e557600080fd5b5061026e600480360360408110156103fc57600080fd5b50803590602001356109d4565b34801561041557600080fd5b506101dc610acf565b34801561042a57600080fd5b506101dc6004803603602081101561044157600080fd5b5035610ade565b34801561045457600080fd5b5061026e6004803603604081101561046b57600080fd5b81019060208101813564010000000081111561048657600080fd5b82018360208201111561049857600080fd5b803590602001918460208302840111640100000000831117156104ba57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505050503515159050610af1565b34801561050657600080fd5b5061026e610bce565b34801561051b57600080fd5b506101dc610c34565b34801561053057600080fd5b50610539610c43565b604080519384526001600160a01b039283166020850152911682820152519081900360600190f35b34801561056d57600080fd5b5061026e610c5c565b34801561058257600080fd5b506101dc610d4c565b34801561059757600080fd5b50610285610d5b565b3480156105ac57600080fd5b5061026e60048036036101608110156105c457600080fd5b506001600160a01b038135169060208101359060408101359060608101359060808101359060a08101359060c08101359060e08101359061010081013590610120810135906101400135610df4565b34801561061f57600080fd5b506106466004803603602081101561063657600080fd5b50356001600160a01b0316610e8c565b604080519115158252519081900360200190f35b34801561066657600080fd5b5061026e610e99565b34801561067b57600080fd5b506101dc61108f565b34801561069057600080fd5b5061026e600480360360208110156106a757600080fd5b50356001600160a01b031661109e565b3480156106c357600080fd5b506106cc611113565b604080519915158a5297151560208a0152951515888801526060880194909452608087019290925260a086015260c085015260e084015261010083015251908190036101200190f35b34801561072157600080fd5b5061026e61114c565b34801561073657600080fd5b5061026e6116a8565b61026e6004803603602081101561075557600080fd5b5035611773565b34801561076857600080fd5b5061026e611b1c565b601d546001600160a01b031681565b60208052600090815260409020805460019091015482565b6002546001600160a01b031633146107eb576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b600655565b60015481565b601a546001600160a01b03163314610841576040805162461bcd60e51b81526020600482015260096024820152682327a92124a22222a760b91b604482015290519081900360640190fd5b601f54600f805460ff19166001600160a01b03878116938116841491909117909155600380548683166001600160a01b03199182161790915560048054821690931783556010859055601180548584169216919091179055601d5460408051635564890b60e11b81529051919092169263aac9121692808201926020929091829003018186803b1580156108d457600080fd5b505afa1580156108e8573d6000803e3d6000fd5b505050506040513d60208110156108fe57600080fd5b505160185550505050565b600254600354600454600554600654600754600854600954600a54600b54600c54600d54600e54600f546001600160a01b039d8e169d9c8d169c909b169a60ff168e565b6002546001600160a01b031633146109a0576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b6013805460ff1916911515919091179055565b60006109bf6021611cf8565b90505b90565b601b546001600160a01b031681565b6002546001600160a01b03163314610a27576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b600c544310610a3557600080fd5b601d60009054906101000a90046001600160a01b03166001600160a01b031663120ac7e66040518163ffffffff1660e01b815260040160206040518083038186803b158015610a8357600080fd5b505afa158015610a97573d6000803e3d6000fd5b505050506040513d6020811015610aad57600080fd5b5051610ab98284611d03565b1115610ac457600080fd5b600c91909155600d55565b601c546001600160a01b031681565b6000610aeb602183611d60565b92915050565b6002546001600160a01b03163314610b44576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b8015610b8c5760005b8251811015610b8657610b7d838281518110610b6557fe5b60200260200101516021611d7390919063ffffffff16565b50600101610b4d565b50610bca565b60005b8251811015610bc857610bbf838281518110610ba757fe5b60200260200101516021611d8890919063ffffffff16565b50600101610b8f565b505b5050565b601b546001600160a01b031615610c21576040805162461bcd60e51b81526020600482015260126024820152714973206e6f7420444556204144445245535360701b604482015290519081900360640190fd5b6013805462ff0000191662010000179055565b601e546001600160a01b031681565b6010546011546012546001600160a01b03918216911683565b6002546001600160a01b03163314610caf576040805162461bcd60e51b81526020600482015260116024820152702727aa10282922a9a0a6229027aba722a960791b604482015290519081900360640190fd5b610cb7610d5b565b600314610cc357600080fd5b600354600254604080516370a0823160e01b81523060048201529051610d4a936001600160a01b0390811693169183916370a0823191602480820192602092909190829003018186803b158015610d1957600080fd5b505afa158015610d2d573d6000803e3d6000fd5b505050506040513d6020811015610d4357600080fd5b5051611d9d565b565b601f546001600160a01b031681565b60135460009062010000900460ff1615610d77575060036109c2565b600d5443118015610d8b5750600954601454105b15610d98575060036109c2565b60085460145410610dab575060026109c2565b600d5443118015610dc0575060095460145410155b15610dcd575060026109c2565b600c544310801590610de15750600d544311155b15610dee575060016109c2565b50600090565b601a546001600160a01b03163314610e3f576040805162461bcd60e51b81526020600482015260096024820152682327a92124a22222a760b91b604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b039c909c169b909b17909a55600798909855600596909655600694909455600892909255600955600a55600b55600c55600d55600e55565b6000610aeb602183611f07565b60026000541415610edf576040805162461bcd60e51b815260206004820152601f602482015260008051602061266f833981519152604482015290519081900360640190fd5b6002600055610eec610d5b565b600314610f2d576040805162461bcd60e51b815260206004820152600a6024820152691393d50811905253115160b21b604482015290519081900360640190fd5b3360009081526020805260408120601754601454919291610f4d91611d03565b600f5490915060009060ff16610fda5760048054604080516370a0823160e01b81523093810193909352516001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015610fa957600080fd5b505afa158015610fbd573d6000803e3d6000fd5b505050506040513d6020811015610fd357600080fd5b5051610fdc565b475b9050600061100183610ffb866000015485611f1c90919063ffffffff16565b90611f75565b90506000811161104e576040805162461bcd60e51b81526020600482015260136024820152724e4f5448494e4720544f20574954484452415760681b604482015290519081900360640190fd5b835460175461105c91611fdc565b60175560008455600454600f54611084916001600160a01b0316903390849060ff1615612036565b505060016000555050565b601a546001600160a01b031681565b601b546001600160a01b0316156110f1576040805162461bcd60e51b81526020600482015260126024820152714973206e6f7420444556204144445245535360701b604482015290519081900360640190fd5b601b80546001600160a01b0319166001600160a01b0392909216919091179055565b60135460145460155460165460175460185460195460ff8088169761010081048216976201000090910490911695909490939092909189565b60026000541415611192576040805162461bcd60e51b815260206004820152601f602482015260008051602061266f833981519152604482015290519081900360640190fd5b6002600055601354610100900460ff16156111ea576040805162461bcd60e51b815260206004820152601360248201527247454e45524154494f4e20434f4d504c45544560681b604482015290519081900360640190fd5b6111f2610d5b565b600214611234576040805162461bcd60e51b815260206004820152600b60248201526a4e4f54205355434345535360a81b604482015290519081900360640190fd5b601c54600354600480546040805163d7d9aa8560e01b81526001600160a01b0394851693810193909352908316602483015251919092169163d7d9aa85916044808301926020929190829003018186803b15801561129157600080fd5b505afa1580156112a5573d6000803e3d6000fd5b505050506040513d60208110156112bb57600080fd5b5051156112d8576013805462ff00001916620100001790556116a1565b6010546014546000916112f3916103e891610ffb9190611f1c565b905060006113246103e8610ffb60026008015461131e86601360010154611d0390919063ffffffff16565b90611f1c565b600f5490915060ff161561139c57601f60009054906101000a90046001600160a01b03166001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b15801561138257600080fd5b505af1158015611396573d6000803e3d6000fd5b50505050505b600454601c546113b9916001600160a01b039081169116836121e3565b600480546040805163313ce56760e01b81529051600093611442936001600160a01b03169263313ce5679281830192602092829003018186803b1580156113ff57600080fd5b505afa158015611413573d6000803e3d6000fd5b505050506040513d602081101561142957600080fd5b5051600b5460ff909116600a0a90610ffb908590611f1c565b600354601c54919250611462916001600160a01b039182169116836121e3565b601c5460048054600354600e5460025460408051632277d0e360e01b81526001600160a01b039586169681019690965292841660248601526044850188905260648501879052429091016084850152821660a484015251921691632277d0e39160c48082019260009290919082900301818387803b1580156114e357600080fd5b505af11580156114f7573d6000803e3d6000fd5b5050600454601154600f5461152294506001600160a01b039283169350911690869060ff1615612036565b600354604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561156d57600080fd5b505afa158015611581573d6000803e3d6000fd5b505050506040513d602081101561159757600080fd5b50516015549091508111156115d5576015546000906115b7908390611d03565b6003549091506115d3906001600160a01b031661dead83611d9d565b505b600f5460009060ff1661165f5760048054604080516370a0823160e01b81523093810193909352516001600160a01b03909116916370a08231916024808301926020929190829003018186803b15801561162e57600080fd5b505afa158015611642573d6000803e3d6000fd5b505050506040513d602081101561165857600080fd5b5051611661565b475b600454600254600f5492935061168c926001600160a01b039283169290911690849060ff1615612036565b50506013805461ff0019166101001790555050505b6001600055565b601354610100900460ff161580156116c9575060135462010000900460ff16155b6116d257600080fd5b601c54600354600480546040805163d7d9aa8560e01b81526001600160a01b0394851693810193909352908316602483015251919092169163d7d9aa85916044808301926020929190829003018186803b15801561172f57600080fd5b505afa158015611743573d6000803e3d6000fd5b505050506040513d602081101561175957600080fd5b505115610d4a576013805462ff0000191662010000179055565b600260005414156117b9576040805162461bcd60e51b815260206004820152601f602482015260008051602061266f833981519152604482015290519081900360640190fd5b60026000556117c6610d5b565b600114611807576040805162461bcd60e51b815260206004820152600a6024820152694e4f542041435449564560b01b604482015290519081900360640190fd5b60135460ff16156118605761181d602133611f07565b611860576040805162461bcd60e51b815260206004820152600f60248201526e1393d50815d2125511531254d51151608a1b604482015290519081900360640190fd5b601854600c540143101561192057601d5460408051634a6da48160e01b815233600482015290516001600160a01b0390921691634a6da48191602480820192602092909190829003018186803b1580156118b957600080fd5b505afa1580156118cd573d6000803e3d6000fd5b505050506040513d60208110156118e357600080fd5b50516119205760405162461bcd60e51b815260040180806020018281038252602181526020018061262c6021913960400191505060405180910390fd5b3360009081526020805260408120600f5490919060ff166119415782611943565b345b825460065491925060009161195791611d03565b601454600854919250900380821161196f5781611971565b805b91508183111561197f578192505b600480546040805163313ce56760e01b81529051600093611a08936001600160a01b03169263313ce5679281830192602092829003018186803b1580156119c557600080fd5b505afa1580156119d9573d6000803e3d6000fd5b505050506040513d60208110156119ef57600080fd5b505160055460ff909116600a0a90610ffb908790611f1c565b905060008111611a4d576040805162461bcd60e51b815260206004820152600b60248201526a5a45524f20544f4b454e5360a81b604482015290519081900360640190fd5b8454611a5d576019805460010190555b8454611a699085611fdc565b85556001850154611a7a9082611fdc565b6001860155601454611a8c9085611fdc565b601455601554611a9c9082611fdc565b601555600f5460ff168015611ab057503484105b15611aed57336108fc611ac33487611d03565b6040518115909202916000818181858888f19350505050158015611aeb573d6000803e3d6000fd5b505b600f5460ff16611b0f57600454611b0f906001600160a01b0316333087612346565b5050600160005550505050565b60026000541415611b62576040805162461bcd60e51b815260206004820152601f602482015260008051602061266f833981519152604482015290519081900360640190fd5b6002600055601354610100900460ff16611bbc576040805162461bcd60e51b815260206004820152601660248201527520aba0a4aa24a7239026281023a2a722a920aa24a7a760511b604482015290519081900360640190fd5b3360009081526020805260408120601654601554919291611bdc91611d03565b6001830154600354604080516370a0823160e01b81523060048201529051939450600093611c6f938693610ffb9391926001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015611c3d57600080fd5b505afa158015611c51573d6000803e3d6000fd5b505050506040513d6020811015611c6757600080fd5b505190611f1c565b905060008111611cbc576040805162461bcd60e51b81526020600482015260136024820152724e4f5448494e4720544f20574954484452415760681b604482015290519081900360640190fd5b6001830154601654611ccd91611fdc565b60165560006001840155600354611cee906001600160a01b03163383611d9d565b5050600160005550565b6000610aeb8261249b565b600082821115611d5a576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000611d6c838361249f565b9392505050565b6000611d6c836001600160a01b038416612503565b6000611d6c836001600160a01b03841661254d565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b178152925182516000946060949389169392918291908083835b60208310611e1a5780518252601f199092019160209182019101611dfb565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611e7c576040519150601f19603f3d011682016040523d82523d6000602084013e611e81565b606091505b5091509150818015611eaf575080511580611eaf5750808060200190516020811015611eac57600080fd5b50515b611f00576040805162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b5050505050565b6000611d6c836001600160a01b038416612613565b600082611f2b57506000610aeb565b82820282848281611f3857fe5b0414611d6c5760405162461bcd60e51b815260040180806020018281038252602181526020018061268f6021913960400191505060405180910390fd5b6000808211611fcb576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381611fd457fe5b049392505050565b600082820183811015611d6c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b80612077576040516001600160a01b0384169083156108fc029084906000818181858888f19350505050158015612071573d6000803e3d6000fd5b506121dd565b604080516001600160a01b038581166024830152604480830186905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17815292518251600094606094938a169392918291908083835b602083106120f45780518252601f1990920191602091820191016120d5565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612156576040519150601f19603f3d011682016040523d82523d6000602084013e61215b565b606091505b5091509150818015612189575080511580612189575080806020019051602081101561218657600080fd5b50515b6121da576040805162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b50505b50505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b178152925182516000946060949389169392918291908083835b602083106122605780518252601f199092019160209182019101612241565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d80600081146122c2576040519150601f19603f3d011682016040523d82523d6000602084013e6122c7565b606091505b50915091508180156122f55750805115806122f557508080602001905160208110156122f257600080fd5b50515b611f00576040805162461bcd60e51b815260206004820152601e60248201527f5472616e7366657248656c7065723a20415050524f56455f4641494c45440000604482015290519081900360640190fd5b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17815292518251600094606094938a169392918291908083835b602083106123cb5780518252601f1990920191602091820191016123ac565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461242d576040519150601f19603f3d011682016040523d82523d6000602084013e612432565b606091505b5091509150818015612460575080511580612460575080806020019051602081101561245d57600080fd5b50515b6121da5760405162461bcd60e51b81526004018080602001828103825260248152602001806126b06024913960400191505060405180910390fd5b5490565b815460009082106124e15760405162461bcd60e51b815260040180806020018281038252602281526020018061264d6022913960400191505060405180910390fd5b8260000182815481106124f057fe5b9060005260206000200154905092915050565b600061250f8383612613565b61254557508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610aeb565b506000610aeb565b60008181526001830160205260408120548015612609578354600019808301919081019060009087908390811061258057fe5b906000526020600020015490508087600001848154811061259d57fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806125cd57fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610aeb565b6000915050610aeb565b6000908152600191909101602052604090205415159056fe494e535546464943454e5420524f554e44203120544f4b454e2042414c414e4345456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64735265656e7472616e637947756172643a207265656e7472616e742063616c6c00536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775472616e7366657248656c7065723a205452414e534645525f46524f4d5f4641494c4544a26469706673582212205ea4cb39cbdd33cfe6a4952eb1414c0de3f35cafa7eee492893c661b4a13578464736f6c634300060c00334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775472616e7366657248656c7065723a205452414e534645525f46524f4d5f4641494c4544a26469706673582212201bff41a0bf8da7591a85b53077dfcc4aae40b98f86c25ba6ceaf420899d8a88d64736f6c634300060c0033";

export interface KukuSwapPresaleGeneratorLibraryAddresses {
  ["__$83d0be577c2bd4dc062e29de8810c29401$__"]: string;
}
