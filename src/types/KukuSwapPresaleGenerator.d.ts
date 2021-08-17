/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface KukuSwapPresaleGeneratorInterface extends ethers.utils.Interface {
  functions: {
    "PRESALE_FACTORY()": FunctionFragment;
    "PRESALE_SETTINGS()": FunctionFragment;
    "createPresale(address,address,address,uint256[10],bool)": FunctionFragment;
    "initialize(address,address,address,address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "tokensRequiredForPresale(uint256,uint256,uint256,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "PRESALE_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRESALE_SETTINGS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPresale",
    values: [
      string,
      string,
      string,
      [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokensRequiredForPresale",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "PRESALE_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRESALE_SETTINGS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createPresale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensRequiredForPresale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class KukuSwapPresaleGenerator extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: KukuSwapPresaleGeneratorInterface;

  functions: {
    PRESALE_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    "PRESALE_FACTORY()"(overrides?: CallOverrides): Promise<[string]>;

    PRESALE_SETTINGS(overrides?: CallOverrides): Promise<[string]>;

    "PRESALE_SETTINGS()"(overrides?: CallOverrides): Promise<[string]>;

    createPresale(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "createPresale(address,address,address,uint256[10],bool)"(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    initialize(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(address,address,address,address,address)"(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    tokensRequiredForPresale(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    "tokensRequiredForPresale(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  PRESALE_FACTORY(overrides?: CallOverrides): Promise<string>;

  "PRESALE_FACTORY()"(overrides?: CallOverrides): Promise<string>;

  PRESALE_SETTINGS(overrides?: CallOverrides): Promise<string>;

  "PRESALE_SETTINGS()"(overrides?: CallOverrides): Promise<string>;

  createPresale(
    _presaleOwner: string,
    _presaleToken: string,
    _baseToken: string,
    uint_params: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    lockTokens: boolean,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "createPresale(address,address,address,uint256[10],bool)"(
    _presaleOwner: string,
    _presaleToken: string,
    _baseToken: string,
    uint_params: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
    lockTokens: boolean,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  initialize(
    _factory: string,
    _wkcs: string,
    _settings: string,
    _lockForwarder: string,
    _devAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(address,address,address,address,address)"(
    _factory: string,
    _wkcs: string,
    _settings: string,
    _lockForwarder: string,
    _devAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  tokensRequiredForPresale(
    _amount: BigNumberish,
    _tokenPrice: BigNumberish,
    _listingRate: BigNumberish,
    _liquidityPercent: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "tokensRequiredForPresale(uint256,uint256,uint256,uint256)"(
    _amount: BigNumberish,
    _tokenPrice: BigNumberish,
    _listingRate: BigNumberish,
    _liquidityPercent: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    PRESALE_FACTORY(overrides?: CallOverrides): Promise<string>;

    "PRESALE_FACTORY()"(overrides?: CallOverrides): Promise<string>;

    PRESALE_SETTINGS(overrides?: CallOverrides): Promise<string>;

    "PRESALE_SETTINGS()"(overrides?: CallOverrides): Promise<string>;

    createPresale(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    "createPresale(address,address,address,uint256[10],bool)"(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address,address,address,address)"(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    tokensRequiredForPresale(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokensRequiredForPresale(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    PRESALE_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    "PRESALE_FACTORY()"(overrides?: CallOverrides): Promise<BigNumber>;

    PRESALE_SETTINGS(overrides?: CallOverrides): Promise<BigNumber>;

    "PRESALE_SETTINGS()"(overrides?: CallOverrides): Promise<BigNumber>;

    createPresale(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "createPresale(address,address,address,uint256[10],bool)"(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    initialize(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(address,address,address,address,address)"(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    tokensRequiredForPresale(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokensRequiredForPresale(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PRESALE_FACTORY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "PRESALE_FACTORY()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PRESALE_SETTINGS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "PRESALE_SETTINGS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createPresale(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "createPresale(address,address,address,uint256[10],bool)"(
      _presaleOwner: string,
      _presaleToken: string,
      _baseToken: string,
      uint_params: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ],
      lockTokens: boolean,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,address,address,address)"(
      _factory: string,
      _wkcs: string,
      _settings: string,
      _lockForwarder: string,
      _devAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    tokensRequiredForPresale(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokensRequiredForPresale(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
