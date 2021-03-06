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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IKukuSwapPresaleSettingsInterface extends ethers.utils.Interface {
  functions: {
    "getBaseFee()": FunctionFragment;
    "getMaxPresaleLength()": FunctionFragment;
    "getRound1Length()": FunctionFragment;
    "getStakingAddress()": FunctionFragment;
    "userHoldsSufficientRound1Token(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getBaseFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxPresaleLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRound1Length",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userHoldsSufficientRound1Token",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "getBaseFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getMaxPresaleLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRound1Length",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userHoldsSufficientRound1Token",
    data: BytesLike
  ): Result;

  events: {};
}

export class IKukuSwapPresaleSettings extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IKukuSwapPresaleSettingsInterface;

  functions: {
    getBaseFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getBaseFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMaxPresaleLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getMaxPresaleLength()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    getRound1Length(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getRound1Length()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    getStakingAddress(overrides?: CallOverrides): Promise<[string]>;

    "getStakingAddress()"(overrides?: CallOverrides): Promise<[string]>;

    userHoldsSufficientRound1Token(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "userHoldsSufficientRound1Token(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  getBaseFee(overrides?: CallOverrides): Promise<BigNumber>;

  "getBaseFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  getMaxPresaleLength(overrides?: CallOverrides): Promise<BigNumber>;

  "getMaxPresaleLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  getRound1Length(overrides?: CallOverrides): Promise<BigNumber>;

  "getRound1Length()"(overrides?: CallOverrides): Promise<BigNumber>;

  getStakingAddress(overrides?: CallOverrides): Promise<string>;

  "getStakingAddress()"(overrides?: CallOverrides): Promise<string>;

  userHoldsSufficientRound1Token(
    _user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "userHoldsSufficientRound1Token(address)"(
    _user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    getBaseFee(overrides?: CallOverrides): Promise<BigNumber>;

    "getBaseFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxPresaleLength(overrides?: CallOverrides): Promise<BigNumber>;

    "getMaxPresaleLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    getRound1Length(overrides?: CallOverrides): Promise<BigNumber>;

    "getRound1Length()"(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingAddress(overrides?: CallOverrides): Promise<string>;

    "getStakingAddress()"(overrides?: CallOverrides): Promise<string>;

    userHoldsSufficientRound1Token(
      _user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "userHoldsSufficientRound1Token(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    getBaseFee(overrides?: CallOverrides): Promise<BigNumber>;

    "getBaseFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    getMaxPresaleLength(overrides?: CallOverrides): Promise<BigNumber>;

    "getMaxPresaleLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    getRound1Length(overrides?: CallOverrides): Promise<BigNumber>;

    "getRound1Length()"(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "getStakingAddress()"(overrides?: CallOverrides): Promise<BigNumber>;

    userHoldsSufficientRound1Token(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userHoldsSufficientRound1Token(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getBaseFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getBaseFee()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMaxPresaleLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getMaxPresaleLength()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRound1Length(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getRound1Length()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStakingAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getStakingAddress()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userHoldsSufficientRound1Token(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userHoldsSufficientRound1Token(address)"(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
