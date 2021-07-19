// Root file: contracts/interfaces/IKukuSwapPresaleFactory.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IKukuSwapPresaleFactory {
    function registerPresale(address _presaleAddress) external;

    function presaleIsRegistered(address _presaleAddress) external view returns (bool);
}
