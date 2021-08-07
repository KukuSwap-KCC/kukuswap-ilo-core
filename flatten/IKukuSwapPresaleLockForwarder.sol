// Dependency file: contracts/interfaces/IERC20Ext.sol

// SPDX-License-Identifier: MIT

// pragma solidity 0.6.12;

interface IERC20Ext {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}


// Root file: contracts/interfaces/IKukuSwapPresaleLockForwarder.sol


pragma solidity 0.6.12;

// import "contracts/interfaces/IERC20Ext.sol";

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
