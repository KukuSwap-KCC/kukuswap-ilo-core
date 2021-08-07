// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./IERC20Ext.sol";

interface IKukuSwapPresaleLockForwarder {
    function lockLiquidity(
        IERC20Ext _baseToken,
        IERC20Ext _saleToken,
        uint256 _baseAmount,
        uint256 _saleAmount,
        uint256 _unlock_date,
        address payable _withdrawer
    ) external;

    function kukuswapPairIsInitialised(address _token0, address _token1) external view returns (bool);
}
