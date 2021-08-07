// SPDX-License-Identifier: MIT

// Ideally you should not interact with this contract directly, and use the KukuSwap presale app instead so warnings can be shown where necessary.

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IKukuSwapLocker.sol";
import "./interfaces/IKukuSwapPresaleFactory.sol";
import "./helpers/TransferHelper.sol";
import "./helpers/PresaleHelper.sol";
import "./KukuSwapPresale.sol";

contract KukuSwapPresaleGenerator is Ownable {
    using SafeMath for uint256;

    IKukuSwapPresaleFactory public PRESALE_FACTORY;
    IKukuSwapPresaleSettings public PRESALE_SETTINGS;

    struct PresaleParams {
        uint256 amount;
        uint256 tokenPrice;
        uint256 maxSpendPerBuyer;
        uint256 hardcap;
        uint256 softcap;
        uint256 liquidityPercent;
        uint256 listingRate; // sale token listing price on uniswap
        uint256 startblock;
        uint256 endblock;
        uint256 lockPeriod;
    }

    constructor() public {
        PRESALE_FACTORY = IKukuSwapPresaleFactory(address(0x0));
        PRESALE_SETTINGS = IKukuSwapPresaleSettings(address(0x0));
    }

    /**
     * @notice Creates a new Presale contract and registers it in the PresaleFactory.sol.
     */
    function createPresale(
        address payable _presaleOwner,
        IERC20 _presaleToken,
        IERC20 _baseToken,
        uint256[10] memory uint_params
    ) public payable {
        PresaleParams memory params;
        params.amount = uint_params[0];
        params.tokenPrice = uint_params[1];
        params.maxSpendPerBuyer = uint_params[2];
        params.hardcap = uint_params[3];
        params.softcap = uint_params[4];
        params.liquidityPercent = uint_params[5];
        params.listingRate = uint_params[6];
        params.startblock = uint_params[7];
        params.endblock = uint_params[8];
        params.lockPeriod = uint_params[9];

        if (params.lockPeriod < 4 weeks) {
            params.lockPeriod = 4 weeks;
        }

        require(params.amount >= 10000, "MIN DIVIS"); // minimum divisibility
        require(params.endblock.sub(params.startblock) <= PRESALE_SETTINGS.getMaxPresaleLength());
        require(params.tokenPrice.mul(params.hardcap) > 0, "INVALID PARAMS"); // ensure no overflow for future calculations
        require(params.liquidityPercent >= 300 && params.liquidityPercent <= 1000, "MIN LIQUIDITY"); // 30% minimum liquidity lock

        uint256 tokensRequiredForPresale = PresaleHelper.calculateAmountRequired(
            params.amount,
            params.tokenPrice,
            params.listingRate,
            params.liquidityPercent
        );

        KukuSwapPresale newPresale = new KukuSwapPresale(address(this));
        TransferHelper.safeTransferFrom(address(_presaleToken), address(msg.sender), address(newPresale), tokensRequiredForPresale);
        newPresale.init1(
            _presaleOwner,
            params.amount,
            params.tokenPrice,
            params.maxSpendPerBuyer,
            params.hardcap,
            params.softcap,
            params.liquidityPercent,
            params.listingRate,
            params.startblock,
            params.endblock,
            params.lockPeriod
        );
        newPresale.init2(_baseToken, _presaleToken, PRESALE_SETTINGS.getBaseFee(), PRESALE_SETTINGS.getStakingAddress());
        PRESALE_FACTORY.registerPresale(address(newPresale));
    }
}
