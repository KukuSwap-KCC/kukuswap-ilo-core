// Root file: contracts/interfaces/IKukuSwapPresaleSettings.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface IKukuSwapPresaleSettings {
    function getMaxPresaleLength() external view returns (uint256);

    function getRound1Length() external view returns (uint256);

    function userHoldsSufficientRound1Token(address _user) external view returns (bool);

    function referrerIsValid(address _referrer) external view returns (bool);

    function getBaseFee() external view returns (uint256);

    function getKCSCreationFeeAddress() external view returns (address payable);

    function getStakingAddress() external view returns (address payable);

    function getKCSCreationFee() external view returns (uint256);
}
