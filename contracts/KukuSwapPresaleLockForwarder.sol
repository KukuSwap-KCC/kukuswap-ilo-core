// SPDX-License-Identifier: MIT

/**
    This contract creates the lock on behalf of each presale. This contract will be whitelisted to bypass the flat rate 
    ETH fee. Please do not use the below locking code in your own contracts as the lock will fail without the ETH fee
*/

pragma solidity 0.6.12;

import "./helpers/TransferHelper.sol";
import "./interfaces/IERC20Ext.sol";
import "./interfaces/IKukuSwapPresaleFactory.sol";
import "./interfaces/IKukuSwapLocker.sol";
import "./interfaces/IKukuSwapFactory.sol";
import "./interfaces/IKukuSwapPair.sol";
import "./interfaces/IKukuSwapPresaleLockForwarder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KukuSwapPresaleLockForwarder is IKukuSwapPresaleLockForwarder, Ownable {
    IKukuSwapPresaleFactory public PRESALE_FACTORY;
    IKukuSwapLocker public KUKUSWAP_LOCKER;
    IKukuSwapFactory public KUKU_FACTORY;

    constructor() public {
        PRESALE_FACTORY = IKukuSwapPresaleFactory(address(0x0));
        KUKUSWAP_LOCKER = IKukuSwapLocker(address(0x0));
        KUKU_FACTORY = IKukuSwapFactory(address(0x0));
    }

    /**
        Send in _token0 as the PRESALE token, _token1 as the BASE token (usually WKCS) for the check to work. As anyone can create a pair,
        and send WKCS to it while a presale is running, but no one should have access to the presale token. If they do and they send it to 
        the pair, scewing the initial liquidity, this function will return true
    */
    function kukuswapPairIsInitialised(address _token0, address _token1) public view override returns (bool) {
        address pairAddress = KUKU_FACTORY.getPair(_token0, _token1);
        if (pairAddress == address(0)) {
            return false;
        }
        uint256 balance = IERC20Ext(_token0).balanceOf(pairAddress);
        if (balance > 0) {
            return true;
        }
        return false;
    }

    function lockLiquidity(
        IERC20Ext _baseToken,
        IERC20Ext _saleToken,
        uint256 _baseAmount,
        uint256 _saleAmount,
        uint256 _unlock_date,
        address payable _withdrawer
    ) external override {
        require(PRESALE_FACTORY.presaleIsRegistered(msg.sender), "PRESALE NOT REGISTERED");
        address pair = KUKU_FACTORY.getPair(address(_baseToken), address(_saleToken));
        if (pair == address(0)) {
            KUKU_FACTORY.createPair(address(_baseToken), address(_saleToken));
            pair = KUKU_FACTORY.getPair(address(_baseToken), address(_saleToken));
        }

        TransferHelper.safeTransferFrom(address(_baseToken), msg.sender, address(pair), _baseAmount);
        TransferHelper.safeTransferFrom(address(_saleToken), msg.sender, address(pair), _saleAmount);
        IKukuSwapPair(pair).mint(address(this));
        uint256 totalLPTokensMinted = IKukuSwapPair(pair).balanceOf(address(this));
        require(totalLPTokensMinted != 0, "LP creation failed");

        TransferHelper.safeApprove(pair, address(KUKUSWAP_LOCKER), totalLPTokensMinted);
        uint256 unlock_date = _unlock_date > 9999999999 ? 9999999999 : _unlock_date;
        KUKUSWAP_LOCKER.lockLPToken(pair, totalLPTokensMinted, unlock_date, true, _withdrawer);
        
    }
}
