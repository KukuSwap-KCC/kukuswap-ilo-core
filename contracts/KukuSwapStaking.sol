// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// This contract handles swapping to and from KUKU SLP, kukuswap's staking token.
contract KuKuSwapStaking is ERC20("KuKuSwap Staking LP", "KuKu SLP") {
    using SafeMath for uint256;
    IERC20 public KUKU;
    IERC20 public WKCS;

    // Define the KUKU token contract
    constructor(IERC20 _KUKU, IERC20 _WKCS) public {
        KUKU = _KUKU;
        WKCS = _WKCS;
    }

    // Enter the Staking. Pay some KUKUs. Earn some shares.
    // Locks KUKU and mints KUKU SLP
    function enter(uint256 _amount) external {
        // Gets the amount of KUKU locked in the contract
        uint256 totalKUKU = KUKU.balanceOf(address(this));
        // Gets the amount of KUKU SLP in existence
        uint256 totalShares = totalSupply();
        // If no KUKU SLP exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalKUKU == 0) {
            _mint(msg.sender, _amount);
        }
        // Calculate and mint the amount of KUKU SLP the KUKU is worth. The ratio will change overtime, as KUKU SLP is burned/minted and KUKU deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalKUKU);
            _mint(msg.sender, what);
        }
        // Lock the KUKU in the contract
        KUKU.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the staking. Claim back your KUKUs.
    // Unlocks the staked + gained KUKU and burns KUKU SLP
    function leave(uint256 _share) external {
        // Gets the amount of KUKU SLP in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of KUKU the KUKU SLP is worth
        uint256 what = _share.mul(KUKU.balanceOf(address(this))).div(totalShares);

        // Calculates the amount of KUKU the KUKU SLP is worth
        uint256 whatKCS = _share.mul(WKCS.balanceOf(address(this))).div(totalShares);

        _burn(msg.sender, _share);

        //transfer KUKU
        KUKU.transfer(msg.sender, what);

        //transfer WKCS
        WKCS.transfer(msg.sender, whatKCS);
    }
}
