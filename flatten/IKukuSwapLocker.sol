// Root file: contracts/interfaces/IKukuSwapLocker.sol

// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IKukuSwapLocker {
    function lockLPToken(
        address _lpToken,
        uint256 _amount,
        uint256 _unlock_date,
        bool _fee_in_eth,
        address payable _withdrawer
    ) external payable;
}
