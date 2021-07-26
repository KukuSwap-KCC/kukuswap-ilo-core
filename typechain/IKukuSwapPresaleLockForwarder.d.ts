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

interface IKukuSwapPresaleLockForwarderInterface
  extends ethers.utils.Interface {
  functions: {
    "kukuswapPairIsInitialised(address,address)": FunctionFragment;
    "lockLiquidity(address,address,uint256,uint256,uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "kukuswapPairIsInitialised",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "lockLiquidity",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "kukuswapPairIsInitialised",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lockLiquidity",
    data: BytesLike
  ): Result;

  events: {};
}

export class IKukuSwapPresaleLockForwarder extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IKukuSwapPresaleLockForwarderInterface;

  functions: {
    kukuswapPairIsInitialised(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "kukuswapPairIsInitialised(address,address)"(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    lockLiquidity(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "lockLiquidity(address,address,uint256,uint256,uint256,address)"(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  kukuswapPairIsInitialised(
    _token0: string,
    _token1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "kukuswapPairIsInitialised(address,address)"(
    _token0: string,
    _token1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  lockLiquidity(
    _baseToken: string,
    _saleToken: string,
    _baseAmount: BigNumberish,
    _saleAmount: BigNumberish,
    _unlock_date: BigNumberish,
    _withdrawer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "lockLiquidity(address,address,uint256,uint256,uint256,address)"(
    _baseToken: string,
    _saleToken: string,
    _baseAmount: BigNumberish,
    _saleAmount: BigNumberish,
    _unlock_date: BigNumberish,
    _withdrawer: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    kukuswapPairIsInitialised(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "kukuswapPairIsInitialised(address,address)"(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    lockLiquidity(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "lockLiquidity(address,address,uint256,uint256,uint256,address)"(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    kukuswapPairIsInitialised(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "kukuswapPairIsInitialised(address,address)"(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockLiquidity(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "lockLiquidity(address,address,uint256,uint256,uint256,address)"(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    kukuswapPairIsInitialised(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "kukuswapPairIsInitialised(address,address)"(
      _token0: string,
      _token1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockLiquidity(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "lockLiquidity(address,address,uint256,uint256,uint256,address)"(
      _baseToken: string,
      _saleToken: string,
      _baseAmount: BigNumberish,
      _saleAmount: BigNumberish,
      _unlock_date: BigNumberish,
      _withdrawer: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
