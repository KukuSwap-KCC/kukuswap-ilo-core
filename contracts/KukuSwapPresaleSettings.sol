// SPDX-License-Identifier: MIT

// Settings to initialize presale contracts and edit fees.

pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "./interfaces/IKukuSwapPresaleSettings.sol";
import "./interfaces/IERC20Ext.sol";

contract KukuSwapPresaleSettings is Ownable, IKukuSwapPresaleSettings {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private EARLY_ACCESS_TOKENS;
    mapping(address => uint256) public EARLY_ACCESS_MAP;

    EnumerableSet.AddressSet private ALLOWED_REFERRERS;

    struct Settings {
        uint256 BASE_FEE; // base fee divided by 1000
        address payable STAKING_ADDRESS;
        uint256 ROUND1_LENGTH; // length of round 1 in blocks
        uint256 MAX_PRESALE_LENGTH; // maximum difference between start and endblock
    }

    Settings public SETTINGS;

    constructor(address _stakingAddress) public {
        require(_stakingAddress != address(0x0), "PresaleSettings: staking address zero");
        SETTINGS.BASE_FEE = 50; // 5%
        SETTINGS.STAKING_ADDRESS = payable(_stakingAddress);
        SETTINGS.ROUND1_LENGTH = 1200; // 1200 blocks = 2 hours, 1 block 3 seconds
        SETTINGS.MAX_PRESALE_LENGTH = 93046; // 2 weeks
    }

    function getStakingAddress() external view override returns (address payable) {
        return SETTINGS.STAKING_ADDRESS;
    }

    function getRound1Length() external view override returns (uint256) {
        return SETTINGS.ROUND1_LENGTH;
    }

    function getMaxPresaleLength() external view override returns (uint256) {
        return SETTINGS.MAX_PRESALE_LENGTH;
    }

    function getBaseFee() external view override returns (uint256) {
        return SETTINGS.BASE_FEE;
    }

    function setFeeAddress(address payable _stakingAddress) external onlyOwner {
        SETTINGS.STAKING_ADDRESS = _stakingAddress;
    }

    function setFee(uint256 _baseFee) external onlyOwner {
        SETTINGS.BASE_FEE = _baseFee;
    }

    function setRound1Length(uint256 _round1Length) external onlyOwner {
        SETTINGS.ROUND1_LENGTH = _round1Length;
    }

    function setMaxPresaleLength(uint256 _maxLength) external onlyOwner {
        SETTINGS.MAX_PRESALE_LENGTH = _maxLength;
    }

    function editEarlyAccessTokens(
        address _token,
        uint256 _holdAmount,
        bool _allow
    ) external onlyOwner {
        if (_allow) {
            EARLY_ACCESS_TOKENS.add(_token);
        } else {
            EARLY_ACCESS_TOKENS.remove(_token);
        }
        EARLY_ACCESS_MAP[_token] = _holdAmount;
    }

    // there will never be more than 10 items in this array. Care for gas limits will be taken.
    // We are aware too many tokens in this unbounded array results in out of gas errors.
    function userHoldsSufficientRound1Token(address _user) external view override returns (bool) {
        if (earlyAccessTokensLength() == 0) {
            return true;
        }
        for (uint256 i = 0; i < earlyAccessTokensLength(); i++) {
            (address token, uint256 amountHold) = getEarlyAccessTokenAtIndex(i);
            if (IERC20Ext(token).balanceOf(_user) >= amountHold) {
                return true;
            }
        }
        return false;
    }

    function getEarlyAccessTokenAtIndex(uint256 _index) public view returns (address, uint256) {
        address tokenAddress = EARLY_ACCESS_TOKENS.at(_index);
        return (tokenAddress, EARLY_ACCESS_MAP[tokenAddress]);
    }

    function earlyAccessTokensLength() public view returns (uint256) {
        return EARLY_ACCESS_TOKENS.length();
    }
}
