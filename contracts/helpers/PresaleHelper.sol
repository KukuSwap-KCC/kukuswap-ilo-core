// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @notice presale Helper with Calculation of Required Amount
 **/

library PresaleHelper {
    using SafeMath for uint256;

    function calculateAmountRequired(
        uint256 _amount,
        uint256 _tokenPrice,
        uint256 _listingRate,
        uint256 _liquidityPercent
    ) internal pure returns (uint256) {
        uint256 listingRatePercent = _listingRate.mul(1000).div(_tokenPrice);
        uint256 liquidityRequired = _amount.mul(_liquidityPercent).mul(listingRatePercent).div(1000000);
        uint256 tokensRequiredForPresale = _amount.add(liquidityRequired);
        return tokensRequiredForPresale;
    }
}
