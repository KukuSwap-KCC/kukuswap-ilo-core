// Root file: contracts/interfaces/IKukuSwapStaking.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IKukuSwapStaking {
    function authorize(address _user, bool isAuth) external;

    function createDistribution(uint256 _amount, address _token) external;
}
