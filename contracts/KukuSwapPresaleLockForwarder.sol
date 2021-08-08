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
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract KukuSwapPresaleLockForwarder is IKukuSwapPresaleLockForwarder, OwnableUpgradeable {
    IKukuSwapPresaleFactory public PRESALE_FACTORY;
    IKukuSwapLocker public KUKUSWAP_LOCKER;
    IKukuSwapFactory public KUKU_FACTORY;

    function initialize(
        address _factory,
        address _locker,
        address _kukuFactory
    ) public initializer {
        PRESALE_FACTORY = IKukuSwapPresaleFactory(_factory);
        KUKUSWAP_LOCKER = IKukuSwapLocker(_locker);
        KUKU_FACTORY = IKukuSwapFactory(_kukuFactory);

        OwnableUpgradeable.__Ownable_init();
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
        uint256 _unlock_block,
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

        KUKUSWAP_LOCKER.lockLPToken(pair, totalLPTokensMinted, _unlock_block, true, _withdrawer);
    }
}
