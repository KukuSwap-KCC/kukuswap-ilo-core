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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IKukuSwapLockerInterface extends ethers.utils.Interface {
  functions: {
    "lockLPToken(address,uint256,uint256,bool,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "lockLPToken",
    values: [string, BigNumberish, BigNumberish, boolean, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "lockLPToken",
    data: BytesLike
  ): Result;

  events: {};
}

export class IKukuSwapLocker extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IKukuSwapLockerInterface;

  functions: {
    lockLPToken(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "lockLPToken(address,uint256,uint256,bool,address)"(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
  };

  lockLPToken(
    _lpToken: string,
    _amount: BigNumberish,
    _unlock_date: BigNumberish,
    _fee_in_eth: boolean,
    _withdrawer: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "lockLPToken(address,uint256,uint256,bool,address)"(
    _lpToken: string,
    _amount: BigNumberish,
    _unlock_date: BigNumberish,
    _fee_in_eth: boolean,
    _withdrawer: string,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  callStatic: {
    lockLPToken(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "lockLPToken(address,uint256,uint256,bool,address)"(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    lockLPToken(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "lockLPToken(address,uint256,uint256,bool,address)"(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    lockLPToken(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "lockLPToken(address,uint256,uint256,bool,address)"(
      _lpToken: string,
      _amount: BigNumberish,
      _unlock_date: BigNumberish,
      _fee_in_eth: boolean,
      _withdrawer: string,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;
  };
}
