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

interface PresaleHelperInterface extends ethers.utils.Interface {
  functions: {
    "calculateAmountRequired(uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calculateAmountRequired",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateAmountRequired",
    data: BytesLike
  ): Result;

  events: {};
}

export class PresaleHelper extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: PresaleHelperInterface;

  functions: {
    calculateAmountRequired(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calculateAmountRequired(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  calculateAmountRequired(
    _amount: BigNumberish,
    _tokenPrice: BigNumberish,
    _listingRate: BigNumberish,
    _liquidityPercent: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calculateAmountRequired(uint256,uint256,uint256,uint256)"(
    _amount: BigNumberish,
    _tokenPrice: BigNumberish,
    _listingRate: BigNumberish,
    _liquidityPercent: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    calculateAmountRequired(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmountRequired(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    calculateAmountRequired(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calculateAmountRequired(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateAmountRequired(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calculateAmountRequired(uint256,uint256,uint256,uint256)"(
      _amount: BigNumberish,
      _tokenPrice: BigNumberish,
      _listingRate: BigNumberish,
      _liquidityPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
