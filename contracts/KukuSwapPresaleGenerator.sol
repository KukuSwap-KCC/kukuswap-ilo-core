// SPDX-License-Identifier: MIT

// Ideally you should not interact with this contract directly, and use the KukuSwap presale app instead so warnings can be shown where necessary.

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/IERC20Ext.sol";
import "./interfaces/IKukuSwapLocker.sol";
import "./interfaces/IKukuSwapPresaleFactory.sol";
import "./interfaces/IKukuSwapStaking.sol";
import "./helpers/TransferHelper.sol";
import "./helpers/PresaleHelper.sol";
import "./KukuSwapPresale.sol";

contract KukuSwapPresaleGenerator is OwnableUpgradeable {
    using SafeMath for uint256;

    IKukuSwapPresaleFactory public PRESALE_FACTORY;
    IKukuSwapPresaleSettings public PRESALE_SETTINGS;

    address WKCS;
    address PRESALE_LOCK_FORWARDER;
    address DEV_ADDRESS;

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

    function initialize(
        address _factory,
        address _wkcs,
        address _settings,
        address _lockForwarder,
        address _devAddress
    ) public initializer {
        PRESALE_FACTORY = IKukuSwapPresaleFactory(_factory);
        PRESALE_SETTINGS = IKukuSwapPresaleSettings(_settings);
        WKCS = _wkcs;
        PRESALE_LOCK_FORWARDER = _lockForwarder;
        DEV_ADDRESS = _devAddress;

        OwnableUpgradeable.__Ownable_init();
    }

    /**
     * @notice Creates a new Presale contract and registers it in the PresaleFactory.sol.
     */
    function createPresale(
        address payable _presaleOwner,
        IERC20Ext _presaleToken,
        IERC20Ext _baseToken,
        uint256[10] memory uint_params
    ) public payable returns (KukuSwapPresale newPresale) {
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

        if (params.lockPeriod < 806400 weeks) {
            params.lockPeriod = 806400; //4 weeks
        }

        require(params.amount >= 10000, "MIN DIVIS"); // minimum divisibility
        require(params.endblock.sub(params.startblock) <= PRESALE_SETTINGS.getMaxPresaleLength());
        require(params.tokenPrice.mul(params.hardcap) > 0, "INVALID PARAMS"); // ensure no overflow for future calculations
        require(params.liquidityPercent >= 300 && params.liquidityPercent <= 1000, "MIN LIQUIDITY"); // 30% minimum liquidity lock

        uint256 tokensRequiredForPresale = tokensRequiredForPresale(
            params.amount,
            params.tokenPrice,
            params.listingRate,
            params.liquidityPercent
        );

        newPresale = new KukuSwapPresale(
            address(this),
            address(PRESALE_FACTORY),
            WKCS,
            address(PRESALE_SETTINGS),
            address(PRESALE_LOCK_FORWARDER),
            DEV_ADDRESS
        );

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
        PRESALE_FACTORY.registerPresale(address(newPresale), _presaleOwner);

        IKukuSwapStaking(PRESALE_SETTINGS.getStakingAddress()).authorize(address(newPresale), true);
    }

    function tokensRequiredForPresale(
        uint256 _amount,
        uint256 _tokenPrice,
        uint256 _listingRate,
        uint256 _liquidityPercent) public pure returns (uint256 amount) {
        
        amount  = PresaleHelper.calculateAmountRequired(
            _amount,
            _tokenPrice,
            _listingRate,
            _liquidityPercent
        );
    }
}
