// SPDX-License-Identifier: MIT
// This contract locks Kukuswap liquidity tokens. Used to give investors peace of mind a token team has locked liquidity
// and that the kuku tokens cannot be removed from kukuswap until the specified unlock date has been reached.

pragma solidity 0.6.12;

import "./interfaces/IKukuSwapPair.sol";
import "./interfaces/IKukuSwapFactory.sol";
import "./interfaces/IERCBurn.sol";
import "./helpers/TransferHelper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract KukuSwapLocker is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.AddressSet;

    IKukuSwapFactory public kukuswapFactory;

    struct UserInfo {
        EnumerableSet.AddressSet lockedTokens; // records all tokens the user has locked
        mapping(address => uint256[]) locksForToken; // map erc20 address to lock id for that token
    }

    struct TokenLock {
        uint256 lockDate; // the date the token was locked
        uint256 amount; // the amount of tokens still locked (initialAmount minus withdrawls)
        uint256 initialAmount; // the initial lock amount
        uint256 unlockDate; // the date the token can be withdrawn
        uint256 lockID; // lockID nonce per uni pair
        address owner;
    }

    mapping(address => UserInfo) private users;

    EnumerableSet.AddressSet private lockedTokens;
    mapping(address => TokenLock[]) public tokenLocks; //map kuku pair to all its locks

    struct FeeStruct {
        uint256 kcsFee; // Small kcs fee to prevent spam on the platform
        IERCBurn secondaryFeeToken; // KUKU
        uint256 secondaryTokenFee; // KUKU Fee
        uint256 secondaryTokenDiscount; // discount on liquidity fee for burning secondaryToken
        uint256 liquidityFee; // fee on kuku liquidity tokens
    }

    FeeStruct public gFees;
    EnumerableSet.AddressSet private feeWhitelist;

    address payable devaddr;

    event onDeposit(address lpToken, address user, uint256 amount, uint256 lockDate, uint256 unlockDate);
    event onWithdraw(address lpToken, uint256 amount);

    constructor(IKukuSwapFactory _kukuswapFactory) public {
        devaddr = msg.sender;
        gFees.kcsFee = 1e18;
        gFees.secondaryTokenFee = 100e18;
        gFees.secondaryTokenDiscount = 200; // 20%
        gFees.liquidityFee = 10; // 1%
        kukuswapFactory = _kukuswapFactory;
    }

    function setDev(address payable _devaddr) public onlyOwner {
        devaddr = _devaddr;
    }

    function setSecondaryFeeToken(address _secondaryFeeToken) public onlyOwner {
        gFees.secondaryFeeToken = IERCBurn(_secondaryFeeToken);
    }

    function setFees(
        uint256 _kcsFee,
        uint256 _secondaryTokenFee,
        uint256 _secondaryTokenDiscount,
        uint256 _liquidityFee
    ) public onlyOwner {
        gFees.kcsFee = _kcsFee;
        gFees.secondaryTokenFee = _secondaryTokenFee;
        gFees.secondaryTokenDiscount = _secondaryTokenDiscount;
        gFees.liquidityFee = _liquidityFee;
    }

    /**
     * @notice whitelisted accounts dont pay flatrate fees on locking
     */
    function whitelistFeeAccount(address _user, bool _add) public onlyOwner {
        if (_add) {
            feeWhitelist.add(_user);
        } else {
            feeWhitelist.remove(_user);
        }
    }

    /**
     * @notice Creates a new lock
     * @param _lpToken the kuku token address
     * @param _amount amount of LP tokens to lock
     * @param _unlock_date the unix timestamp (in seconds) until unlock
     * @param _fee_in_kcs fees can be paid in kcs or in a secondary token such as UNCX with a discount on kuku tokens
     * @param _withdrawer the user who can withdraw liquidity once the lock expires.
     */
    function lockLPToken(
        address _lpToken,
        uint256 _amount,
        uint256 _unlock_date,
        bool _fee_in_kcs,
        address payable _withdrawer
    ) external payable nonReentrant {
        require(_unlock_date < 10000000000, "TIMESTAMP INVALID"); // prevents errors when timestamp entered in milliseconds
        require(_amount > 0, "INSUFFICIENT");

        // ensure this pair is a kuku pair by querying the factory
        IKukuSwapPair lpair = IKukuSwapPair(address(_lpToken));
        address factoryPairAddress = kukuswapFactory.getPair(lpair.token0(), lpair.token1());
        require(factoryPairAddress == address(_lpToken), "NOT kuku");

        TransferHelper.safeTransferFrom(_lpToken, address(msg.sender), address(this), _amount);

        // flatrate fees
        if (!feeWhitelist.contains(msg.sender)) {
            if (_fee_in_kcs) {
                // charge fee in kcs
                uint256 kcsFee = gFees.kcsFee;

                require(msg.value == kcsFee, "FEE NOT MET");
                uint256 devFee = kcsFee;

                devaddr.transfer(devFee);
            } else {
                // charge fee in token
                uint256 burnFee = gFees.secondaryTokenFee;

                TransferHelper.safeTransferFrom(address(gFees.secondaryFeeToken), address(msg.sender), address(this), burnFee);

                gFees.secondaryFeeToken.burn(burnFee);
            }
        } else if (msg.value > 0) {
            // refund kcs if a whitelisted member sent it by mistake
            msg.sender.transfer(msg.value);
        }

        // percent fee
        uint256 liquidityFee = _amount.mul(gFees.liquidityFee).div(1000);
        if (!_fee_in_kcs && !feeWhitelist.contains(msg.sender)) {
            // fee discount for large lockers using secondary token
            liquidityFee = liquidityFee.mul(1000 - gFees.secondaryTokenDiscount).div(1000);
        }
        TransferHelper.safeTransfer(_lpToken, devaddr, liquidityFee);
        uint256 amountLocked = _amount.sub(liquidityFee);

        TokenLock memory token_lock;
        token_lock.lockDate = block.timestamp;
        token_lock.amount = amountLocked;
        token_lock.initialAmount = amountLocked;
        token_lock.unlockDate = _unlock_date;
        token_lock.lockID = tokenLocks[_lpToken].length;
        token_lock.owner = _withdrawer;

        // record the lock for the kukupair
        tokenLocks[_lpToken].push(token_lock);
        lockedTokens.add(_lpToken);

        // record the lock for the user
        UserInfo storage user = users[_withdrawer];
        user.lockedTokens.add(_lpToken);
        uint256[] storage user_locks = user.locksForToken[_lpToken];
        user_locks.push(token_lock.lockID);

        emit onDeposit(_lpToken, msg.sender, token_lock.amount, token_lock.lockDate, token_lock.unlockDate);
    }

    /**
     * @notice extend a lock with a new unlock date, _index and _lockID ensure the correct lock is changed
     * this prevents errors when a user performs multiple tx per block possibly with varying gas prices
     */
    function relock(
        address _lpToken,
        uint256 _index,
        uint256 _lockID,
        uint256 _unlock_date
    ) external nonReentrant {
        require(_unlock_date < 10000000000, "TIMESTAMP INVALID"); // prevents errors when timestamp entered in milliseconds
        uint256 lockID = users[msg.sender].locksForToken[_lpToken][_index];
        TokenLock storage userLock = tokenLocks[_lpToken][lockID];
        require(lockID == _lockID && userLock.owner == msg.sender, "LOCK MISMATCH"); // ensures correct lock is affected
        require(userLock.unlockDate < _unlock_date, "UNLOCK BEFORE");

        uint256 liquidityFee = userLock.amount.mul(gFees.liquidityFee).div(1000);
        uint256 amountLocked = userLock.amount.sub(liquidityFee);

        userLock.amount = amountLocked;
        userLock.unlockDate = _unlock_date;

        // send kuku fee to dev address
        TransferHelper.safeTransfer(_lpToken, devaddr, liquidityFee);
    }

    /**
     * @notice withdraw a specified amount from a lock. _index and _lockID ensure the correct lock is changed
     * this prevents errors when a user performs multiple tx per block possibly with varying gas prices
     */
    function withdraw(
        address _lpToken,
        uint256 _index,
        uint256 _lockID,
        uint256 _amount
    ) external nonReentrant {
        require(_amount > 0, "ZERO WITHDRAWL");
        uint256 lockID = users[msg.sender].locksForToken[_lpToken][_index];
        TokenLock storage userLock = tokenLocks[_lpToken][lockID];
        require(lockID == _lockID && userLock.owner == msg.sender, "LOCK MISMATCH"); // ensures correct lock is affected
        require(userLock.unlockDate < block.timestamp, "NOT YET");
        userLock.amount = userLock.amount.sub(_amount);

        // clean user storage
        if (userLock.amount == 0) {
            uint256[] storage userLocks = users[msg.sender].locksForToken[_lpToken];
            userLocks[_index] = userLocks[userLocks.length - 1];
            userLocks.pop();
            if (userLocks.length == 0) {
                users[msg.sender].lockedTokens.remove(_lpToken);
            }
        }

        TransferHelper.safeTransfer(_lpToken, msg.sender, _amount);
        emit onWithdraw(_lpToken, _amount);
    }

    /**
     * @notice increase the amount of tokens per a specific lock, this is preferable to creating a new lock, less fees, and faster loading on our live block explorer
     */
    function incrementLock(
        address _lpToken,
        uint256 _index,
        uint256 _lockID,
        uint256 _amount
    ) external nonReentrant {
        require(_amount > 0, "ZERO AMOUNT");
        uint256 lockID = users[msg.sender].locksForToken[_lpToken][_index];
        TokenLock storage userLock = tokenLocks[_lpToken][lockID];
        require(lockID == _lockID && userLock.owner == msg.sender, "LOCK MISMATCH"); // ensures correct lock is affected

        TransferHelper.safeTransferFrom(_lpToken, address(msg.sender), address(this), _amount);

        // send kuku fee to dev address
        uint256 liquidityFee = _amount.mul(gFees.liquidityFee).div(1000);
        TransferHelper.safeTransfer(_lpToken, devaddr, liquidityFee);
        uint256 amountLocked = _amount.sub(liquidityFee);

        userLock.amount = userLock.amount.add(amountLocked);

        emit onDeposit(_lpToken, msg.sender, amountLocked, userLock.lockDate, userLock.unlockDate);
    }

    /**
     * @notice split a lock into two seperate locks, useful when a lock is about to expire and youd like to relock a portion
     * and withdraw a smaller portion
     */
    function splitLock(
        address _lpToken,
        uint256 _index,
        uint256 _lockID,
        uint256 _amount
    ) external payable nonReentrant {
        require(_amount > 0, "ZERO AMOUNT");
        uint256 lockID = users[msg.sender].locksForToken[_lpToken][_index];
        TokenLock storage userLock = tokenLocks[_lpToken][lockID];
        require(lockID == _lockID && userLock.owner == msg.sender, "LOCK MISMATCH"); // ensures correct lock is affected

        require(msg.value == gFees.kcsFee, "FEE NOT MET");
        devaddr.transfer(gFees.kcsFee);

        userLock.amount = userLock.amount.sub(_amount);

        TokenLock memory token_lock;
        token_lock.lockDate = userLock.lockDate;
        token_lock.amount = _amount;
        token_lock.initialAmount = _amount;
        token_lock.unlockDate = userLock.unlockDate;
        token_lock.lockID = tokenLocks[_lpToken].length;
        token_lock.owner = msg.sender;

        // record the lock for the kukupair
        tokenLocks[_lpToken].push(token_lock);

        // record the lock for the user
        UserInfo storage user = users[msg.sender];
        uint256[] storage user_locks = user.locksForToken[_lpToken];
        user_locks.push(token_lock.lockID);
    }

    /**
     * @notice transfer a lock to a new owner, e.g. presale project -> project owner
     */
    function transferLockOwnership(
        address _lpToken,
        uint256 _index,
        uint256 _lockID,
        address payable _newOwner
    ) external {
        require(msg.sender != _newOwner, "OWNER");
        uint256 lockID = users[msg.sender].locksForToken[_lpToken][_index];
        TokenLock storage transferredLock = tokenLocks[_lpToken][lockID];
        require(lockID == _lockID && transferredLock.owner == msg.sender, "LOCK MISMATCH"); // ensures correct lock is affected

        // record the lock for the new Owner
        UserInfo storage user = users[_newOwner];
        user.lockedTokens.add(_lpToken);
        uint256[] storage user_locks = user.locksForToken[_lpToken];
        user_locks.push(transferredLock.lockID);

        // remove the lock from the old owner
        uint256[] storage userLocks = users[msg.sender].locksForToken[_lpToken];
        userLocks[_index] = userLocks[userLocks.length - 1];
        userLocks.pop();
        if (userLocks.length == 0) {
            users[msg.sender].lockedTokens.remove(_lpToken);
        }
        transferredLock.owner = _newOwner;
    }

    function getNumLocksForToken(address _lpToken) external view returns (uint256) {
        return tokenLocks[_lpToken].length;
    }

    function getNumLockedTokens() external view returns (uint256) {
        return lockedTokens.length();
    }

    function getLockedTokenAtIndex(uint256 _index) external view returns (address) {
        return lockedTokens.at(_index);
    }

    // user functions
    function getUserNumLockedTokens(address _user) external view returns (uint256) {
        UserInfo storage user = users[_user];
        return user.lockedTokens.length();
    }

    function getUserLockedTokenAtIndex(address _user, uint256 _index) external view returns (address) {
        UserInfo storage user = users[_user];
        return user.lockedTokens.at(_index);
    }

    function getUserNumLocksForToken(address _user, address _lpToken) external view returns (uint256) {
        UserInfo storage user = users[_user];
        return user.locksForToken[_lpToken].length;
    }

    function getUserLockForTokenAtIndex(
        address _user,
        address _lpToken,
        uint256 _index
    )
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        uint256 lockID = users[_user].locksForToken[_lpToken][_index];
        TokenLock storage tokenLock = tokenLocks[_lpToken][lockID];
        return (tokenLock.lockDate, tokenLock.amount, tokenLock.initialAmount, tokenLock.unlockDate, tokenLock.lockID, tokenLock.owner);
    }

    // whitelist
    function getWhitelistedUsersLength() external view returns (uint256) {
        return feeWhitelist.length();
    }

    function getWhitelistedUserAtIndex(uint256 _index) external view returns (address) {
        return feeWhitelist.at(_index);
    }

    function getUserWhitelistStatus(address _user) external view returns (bool) {
        return feeWhitelist.contains(_user);
    }
}
