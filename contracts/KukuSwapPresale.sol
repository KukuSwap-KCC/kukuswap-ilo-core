// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./interfaces/IKukuSwapPresaleLockForwarder.sol";
import "./interfaces/IKukuSwapFactory.sol";
import "./interfaces/IKukuSwapPresaleSettings.sol";
import "./interfaces/IWKCS.sol";
import "./interfaces/IERC20Ext.sol";
import "./helpers/TransferHelper.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @notice Presale contract main
 **/
contract KukuSwapPresale is ReentrancyGuard {
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeMath for uint256;

    /// @notice Presale Contract Version, used to choose the correct ABI to decode the contract
    uint256 public CONTRACT_VERSION = 1;

    struct PresaleInfo {
        address payable PRESALE_OWNER;
        IERC20Ext S_TOKEN; // sale token
        IERC20Ext B_TOKEN; // base token // usually WKCS (KCS)
        uint256 TOKEN_PRICE; // 1 base token = ? s_tokens, fixed price
        uint256 MAX_SPEND_PER_BUYER; // maximum base token BUY amount per account
        uint256 AMOUNT; // the amount of presale tokens up for presale
        uint256 HARDCAP;
        uint256 SOFTCAP;
        uint256 LIQUIDITY_PERCENT; // divided by 1000
        uint256 LISTING_RATE; // fixed rate at which the token will list on kukuswap
        uint256 START_BLOCK;
        uint256 END_BLOCK;
        uint256 LOCK_PERIOD; // blocks -> e.g, for example 2 weeks, 1 block per 3 sec, 2 weeks = 403.200
        bool PRESALE_IN_KCS; // if this flag is true the presale is raising KCS, otherwise an ERC20 token such as DAI
    }

    struct PresaleFeeInfo {
        uint256 KUKU_BASE_FEE; // divided by 1000
        address payable BASE_FEE_ADDRESS;
    }

    struct PresaleStatus {
        bool WHITELIST_ONLY; // if set to true only whitelisted members may participate
        bool LP_GENERATION_COMPLETE; // final flag required to end a presale and enable withdrawls
        bool FORCE_FAILED; // set this flag to force fail the presale
        uint256 TOTAL_BASE_COLLECTED; // total base currency raised (usually KCS)
        uint256 TOTAL_TOKENS_SOLD; // total presale tokens sold
        uint256 TOTAL_TOKENS_WITHDRAWN; // total tokens withdrawn post successful presale
        uint256 TOTAL_BASE_WITHDRAWN; // total base tokens withdrawn on presale failure
        uint256 ROUND1_LENGTH; // in blocks
        uint256 NUM_BUYERS; // number of unique participants
    }

    struct BuyerInfo {
        uint256 baseDeposited; // total base token (usually KCS) deposited by user, can be withdrawn on presale failure
        uint256 tokensOwed; // num presale tokens a user is owed, can be withdrawn on presale success
    }

    PresaleInfo public PRESALE_INFO;
    PresaleFeeInfo public PRESALE_FEE_INFO;
    PresaleStatus public STATUS;
    address public PRESALE_GENERATOR;
    address public DEV_ADDRESS;
    IKukuSwapPresaleLockForwarder public PRESALE_LOCK_FORWARDER;
    IKukuSwapPresaleSettings public PRESALE_SETTINGS;
    IKukuSwapFactory public KUKU_FACTORY;
    IWKCS public WKCS;
    mapping(address => BuyerInfo) public BUYERS;
    EnumerableSet.AddressSet private WHITELIST;

    constructor(
        address _presaleGenerator,
        address _factory,
        address _wkcs,
        address _settings,
        address _lockForwarder,
        address _devAddress
    ) public {
        PRESALE_GENERATOR = _presaleGenerator;
        KUKU_FACTORY = IKukuSwapFactory(_factory);
        WKCS = IWKCS(_wkcs);
        PRESALE_SETTINGS = IKukuSwapPresaleSettings(_settings);
        PRESALE_LOCK_FORWARDER = IKukuSwapPresaleLockForwarder(_lockForwarder);
        DEV_ADDRESS = address(_devAddress);
    }

    function init1(
        address payable _presaleOwner,
        uint256 _amount,
        uint256 _tokenPrice,
        uint256 _maxKCSPerBuyer,
        uint256 _hardcap,
        uint256 _softcap,
        uint256 _liquidityPercent,
        uint256 _listingRate,
        uint256 _startblock,
        uint256 _endblock,
        uint256 _lockPeriod
    ) external {
        require(msg.sender == PRESALE_GENERATOR, "FORBIDDEN");
        PRESALE_INFO.PRESALE_OWNER = _presaleOwner;
        PRESALE_INFO.AMOUNT = _amount;
        PRESALE_INFO.TOKEN_PRICE = _tokenPrice;
        PRESALE_INFO.MAX_SPEND_PER_BUYER = _maxKCSPerBuyer;
        PRESALE_INFO.HARDCAP = _hardcap;
        PRESALE_INFO.SOFTCAP = _softcap;
        PRESALE_INFO.LIQUIDITY_PERCENT = _liquidityPercent;
        PRESALE_INFO.LISTING_RATE = _listingRate;
        PRESALE_INFO.START_BLOCK = _startblock;
        PRESALE_INFO.END_BLOCK = _endblock;
        PRESALE_INFO.LOCK_PERIOD = _lockPeriod;
    }

    function init2(
        IERC20Ext _baseToken,
        IERC20Ext _presaleToken,
        uint256 _kukuBaseFee,
        address payable _baseFeeAddress
    ) external {
        require(msg.sender == PRESALE_GENERATOR, "FORBIDDEN");
        require(!PRESALE_LOCK_FORWARDER.kukuswapPairIsInitialised(address(_presaleToken), address(_baseToken)), 'PAIR INITIALISED');

        PRESALE_INFO.PRESALE_IN_KCS = address(_baseToken) == address(WKCS);
        PRESALE_INFO.S_TOKEN = _presaleToken;
        PRESALE_INFO.B_TOKEN = _baseToken;
        PRESALE_FEE_INFO.KUKU_BASE_FEE = _kukuBaseFee;

        PRESALE_FEE_INFO.BASE_FEE_ADDRESS = _baseFeeAddress;

        STATUS.ROUND1_LENGTH = PRESALE_SETTINGS.getRound1Length();
    }

    modifier onlyPresaleOwner() {
        require(PRESALE_INFO.PRESALE_OWNER == msg.sender, "NOT PRESALE OWNER");
        _;
    }

    function presaleStatus() public view returns (uint256) {
        if (STATUS.FORCE_FAILED) {
            return 3; // FAILED - force fail
        }
        if ((block.number > PRESALE_INFO.END_BLOCK) && (STATUS.TOTAL_BASE_COLLECTED < PRESALE_INFO.SOFTCAP)) {
            return 3; // FAILED - softcap not met by end block
        }
        if (STATUS.TOTAL_BASE_COLLECTED >= PRESALE_INFO.HARDCAP) {
            return 2; // SUCCESS - hardcap met
        }
        if ((block.number > PRESALE_INFO.END_BLOCK) && (STATUS.TOTAL_BASE_COLLECTED >= PRESALE_INFO.SOFTCAP)) {
            return 2; // SUCCESS - endblock and soft cap reached
        }
        if ((block.number >= PRESALE_INFO.START_BLOCK) && (block.number <= PRESALE_INFO.END_BLOCK)) {
            return 1; // ACTIVE - deposits enabled
        }
        return 0; // QUED - awaiting start block
    }

    // accepts msg.value for KCS or _amount for ERC20 tokens
    function userDeposit(uint256 _amount) external payable nonReentrant {
        require(presaleStatus() == 1, "NOT ACTIVE"); // ACTIVE
        if (STATUS.WHITELIST_ONLY) {
            require(WHITELIST.contains(msg.sender), "NOT WHITELISTED");
        }
        // Presale Round 1 - require participant to hold a certain token and balance
        if (block.number < PRESALE_INFO.START_BLOCK + STATUS.ROUND1_LENGTH) {
            // 276 blocks = 1 hour
            require(PRESALE_SETTINGS.userHoldsSufficientRound1Token(msg.sender), "INSUFFICENT ROUND 1 TOKEN BALANCE");
        }
        BuyerInfo storage buyer = BUYERS[msg.sender];
        uint256 amount_in = PRESALE_INFO.PRESALE_IN_KCS ? msg.value : _amount;
        uint256 allowance = PRESALE_INFO.MAX_SPEND_PER_BUYER.sub(buyer.baseDeposited);
        uint256 remaining = PRESALE_INFO.HARDCAP - STATUS.TOTAL_BASE_COLLECTED;
        allowance = allowance > remaining ? remaining : allowance;
        if (amount_in > allowance) {
            amount_in = allowance;
        }
        uint256 tokensSold = amount_in.mul(PRESALE_INFO.TOKEN_PRICE).div(10**uint256(PRESALE_INFO.B_TOKEN.decimals()));
        require(tokensSold > 0, "ZERO TOKENS");
        if (buyer.baseDeposited == 0) {
            STATUS.NUM_BUYERS++;
        }
        buyer.baseDeposited = buyer.baseDeposited.add(amount_in);
        buyer.tokensOwed = buyer.tokensOwed.add(tokensSold);
        STATUS.TOTAL_BASE_COLLECTED = STATUS.TOTAL_BASE_COLLECTED.add(amount_in);
        STATUS.TOTAL_TOKENS_SOLD = STATUS.TOTAL_TOKENS_SOLD.add(tokensSold);

        // return unused KCS
        if (PRESALE_INFO.PRESALE_IN_KCS && amount_in < msg.value) {
            msg.sender.transfer(msg.value.sub(amount_in));
        }
        // deduct non KCS token from user
        if (!PRESALE_INFO.PRESALE_IN_KCS) {
            TransferHelper.safeTransferFrom(address(PRESALE_INFO.B_TOKEN), msg.sender, address(this), amount_in);
        }
    }

    // withdraw presale tokens
    // percentile withdrawls allows fee on transfer or rebasing tokens to still work
    function userWithdrawTokens() external nonReentrant {
        require(STATUS.LP_GENERATION_COMPLETE, "AWAITING LP GENERATION");
        BuyerInfo storage buyer = BUYERS[msg.sender];
        uint256 tokensRemainingDenominator = STATUS.TOTAL_TOKENS_SOLD.sub(STATUS.TOTAL_TOKENS_WITHDRAWN);
        uint256 tokensOwed = PRESALE_INFO.S_TOKEN.balanceOf(address(this)).mul(buyer.tokensOwed).div(tokensRemainingDenominator);
        require(tokensOwed > 0, "NOTHING TO WITHDRAW");
        STATUS.TOTAL_TOKENS_WITHDRAWN = STATUS.TOTAL_TOKENS_WITHDRAWN.add(buyer.tokensOwed);
        buyer.tokensOwed = 0;
        TransferHelper.safeTransfer(address(PRESALE_INFO.S_TOKEN), msg.sender, tokensOwed);
    }

    // on presale failure
    // percentile withdrawls allows fee on transfer or rebasing tokens to still work
    function userWithdrawBaseTokens() external nonReentrant {
        require(presaleStatus() == 3, "NOT FAILED"); // FAILED
        BuyerInfo storage buyer = BUYERS[msg.sender];
        uint256 baseRemainingDenominator = STATUS.TOTAL_BASE_COLLECTED.sub(STATUS.TOTAL_BASE_WITHDRAWN);
        uint256 remainingBaseBalance = PRESALE_INFO.PRESALE_IN_KCS ? address(this).balance : PRESALE_INFO.B_TOKEN.balanceOf(address(this));
        uint256 tokensOwed = remainingBaseBalance.mul(buyer.baseDeposited).div(baseRemainingDenominator);
        require(tokensOwed > 0, "NOTHING TO WITHDRAW");
        STATUS.TOTAL_BASE_WITHDRAWN = STATUS.TOTAL_BASE_WITHDRAWN.add(buyer.baseDeposited);
        buyer.baseDeposited = 0;
        TransferHelper.safeTransferBaseToken(address(PRESALE_INFO.B_TOKEN), msg.sender, tokensOwed, !PRESALE_INFO.PRESALE_IN_KCS);
    }

    // on presale failure
    // allows the owner to withdraw the tokens they sent for presale & initial liquidity
    function ownerWithdrawTokens() external onlyPresaleOwner {
        require(presaleStatus() == 3); // FAILED
        TransferHelper.safeTransfer(address(PRESALE_INFO.S_TOKEN), PRESALE_INFO.PRESALE_OWNER, PRESALE_INFO.S_TOKEN.balanceOf(address(this)));
    }

    // Can be called at any stage before or during the presale to cancel it before it ends.
    // If the pair already exists on kukuswap and it contains the presale token as liquidity
    // the final stage of the presale 'addLiquidity()' will fail. This function
    // allows anyone to end the presale prematurely to release funds in such a case.
    function forceFailIfPairExists() external {
        require(!STATUS.LP_GENERATION_COMPLETE && !STATUS.FORCE_FAILED);
        if (PRESALE_LOCK_FORWARDER.kukuswapPairIsInitialised(address(PRESALE_INFO.S_TOKEN), address(PRESALE_INFO.B_TOKEN))) {
            STATUS.FORCE_FAILED = true;
        }
    }

    // if something goes wrong in LP generation
    function forceFail() external {
        require(DEV_ADDRESS == address(0x0), "Is not DEV ADDRESS");
        STATUS.FORCE_FAILED = true;
    }

    function setDevAddress(address newDevAddress) external {
        require(DEV_ADDRESS == address(0x0), "Is not DEV ADDRESS");
        DEV_ADDRESS = newDevAddress;
    }

    // on presale success, this is the final step to end the presale, lock liquidity and enable withdrawls of the sale token.
    // This function does not use percentile distribution. Rebasing mechanisms, fee on transfers, or any deflationary logic
    // are not taken into account at this stage to ensure stated liquidity is locked and the pool is initialised according to
    // the presale parameters and fixed prices.
    function addLiquidity() external nonReentrant {
        require(!STATUS.LP_GENERATION_COMPLETE, "GENERATION COMPLETE");
        require(presaleStatus() == 2, "NOT SUCCESS"); // SUCCESS
        // Fail the presale if the pair exists and contains presale token liquidity
        if (PRESALE_LOCK_FORWARDER.kukuswapPairIsInitialised(address(PRESALE_INFO.S_TOKEN), address(PRESALE_INFO.B_TOKEN))) {
            STATUS.FORCE_FAILED = true;
            return;
        }

        uint256 kukuBaseFee = STATUS.TOTAL_BASE_COLLECTED.mul(PRESALE_FEE_INFO.KUKU_BASE_FEE).div(1000);

        // base token liquidity
        uint256 baseLiquidity = STATUS.TOTAL_BASE_COLLECTED.sub(kukuBaseFee).mul(PRESALE_INFO.LIQUIDITY_PERCENT).div(1000);
        if (PRESALE_INFO.PRESALE_IN_KCS) {
            WKCS.deposit{value: baseLiquidity}();
        }
        
        TransferHelper.safeApprove(address(PRESALE_INFO.B_TOKEN), address(PRESALE_LOCK_FORWARDER), baseLiquidity);

        // sale token liquidity
        uint256 tokenLiquidity = baseLiquidity.mul(PRESALE_INFO.LISTING_RATE).div(10**uint256(PRESALE_INFO.B_TOKEN.decimals()));
        TransferHelper.safeApprove(address(PRESALE_INFO.S_TOKEN), address(PRESALE_LOCK_FORWARDER), tokenLiquidity);

        PRESALE_LOCK_FORWARDER.lockLiquidity(
            PRESALE_INFO.B_TOKEN,
            PRESALE_INFO.S_TOKEN,
            baseLiquidity,
            tokenLiquidity,
            block.number + PRESALE_INFO.LOCK_PERIOD,
            PRESALE_INFO.PRESALE_OWNER
        );

        /*TransferHelper.safeTransferBaseToken(
            address(PRESALE_INFO.B_TOKEN),
            PRESALE_FEE_INFO.BASE_FEE_ADDRESS,
            kukuBaseFee,
            !PRESALE_INFO.PRESALE_IN_KCS
        );*/

        // burn unsold tokens
        uint256 remainingSBalance = PRESALE_INFO.S_TOKEN.balanceOf(address(this));
        if (remainingSBalance > STATUS.TOTAL_TOKENS_SOLD) {
            uint256 burnAmount = remainingSBalance.sub(STATUS.TOTAL_TOKENS_SOLD);
            TransferHelper.safeTransfer(address(PRESALE_INFO.S_TOKEN), 0x000000000000000000000000000000000000dEaD, burnAmount);
        }

        // send remaining base tokens to presale owner
        uint256 remainingBaseBalance = PRESALE_INFO.PRESALE_IN_KCS ? address(this).balance : PRESALE_INFO.B_TOKEN.balanceOf(address(this));
        TransferHelper.safeTransferBaseToken(
            address(PRESALE_INFO.B_TOKEN),
            PRESALE_INFO.PRESALE_OWNER,
            remainingBaseBalance,
            !PRESALE_INFO.PRESALE_IN_KCS
        );

        STATUS.LP_GENERATION_COMPLETE = true;
    }

    function updateMaxSpendLimit(uint256 _maxSpend) external onlyPresaleOwner {
        PRESALE_INFO.MAX_SPEND_PER_BUYER = _maxSpend;
    }

    // postpone or bring a presale forward, this will only work when a presale is inactive.
    // i.e. current start block > block.number
    function updateBlocks(uint256 _startBlock, uint256 _endBlock) external onlyPresaleOwner {
        require(PRESALE_INFO.START_BLOCK > block.number, "PRESALE IS ACTIVE");
        require(_endBlock.sub(_startBlock) <= PRESALE_SETTINGS.getMaxPresaleLength());
        PRESALE_INFO.START_BLOCK = _startBlock;
        PRESALE_INFO.END_BLOCK = _endBlock;
    }

    // editable at any stage of the presale
    function setWhitelistFlag(bool _flag) external onlyPresaleOwner {
        STATUS.WHITELIST_ONLY = _flag;
    }

    // editable at any stage of the presale
    function editWhitelist(address[] memory _users, bool _add) external onlyPresaleOwner {
        if (_add) {
            for (uint256 i = 0; i < _users.length; i++) {
                WHITELIST.add(_users[i]);
            }
        } else {
            for (uint256 i = 0; i < _users.length; i++) {
                WHITELIST.remove(_users[i]);
            }
        }
    }

    // whitelist getters
    function getWhitelistedUsersLength() external view returns (uint256) {
        return WHITELIST.length();
    }

    function getWhitelistedUserAtIndex(uint256 _index) external view returns (address) {
        return WHITELIST.at(_index);
    }

    function getUserWhitelistStatus(address _user) external view returns (bool) {
        return WHITELIST.contains(_user);
    }
}
