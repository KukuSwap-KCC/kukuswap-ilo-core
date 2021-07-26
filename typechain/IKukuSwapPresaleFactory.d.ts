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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IKukuSwapPresaleFactoryInterface extends ethers.utils.Interface {
  functions: {
    "presaleIsRegistered(address)": FunctionFragment;
    "registerPresale(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "presaleIsRegistered",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerPresale",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "presaleIsRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerPresale",
    data: BytesLike
  ): Result;

  events: {};
}

export class IKukuSwapPresaleFactory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IKukuSwapPresaleFactoryInterface;

  functions: {
    presaleIsRegistered(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "presaleIsRegistered(address)"(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerPresale(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "registerPresale(address)"(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  presaleIsRegistered(
    _presaleAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "presaleIsRegistered(address)"(
    _presaleAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerPresale(
    _presaleAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "registerPresale(address)"(
    _presaleAddress: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    presaleIsRegistered(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "presaleIsRegistered(address)"(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerPresale(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerPresale(address)"(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    presaleIsRegistered(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "presaleIsRegistered(address)"(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerPresale(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "registerPresale(address)"(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    presaleIsRegistered(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "presaleIsRegistered(address)"(
      _presaleAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerPresale(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "registerPresale(address)"(
      _presaleAddress: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}