// Dependency file: @openzeppelin/contracts/math/SafeMath.sol

// SPDX-License-Identifier: MIT

// pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        uint256 c = a + b;
        if (c < a) return (false, 0);
        return (true, c);
    }

    /**
     * @dev Returns the substraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b > a) return (false, 0);
        return (true, a - b);
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) return (true, 0);
        uint256 c = a * b;
        if (c / a != b) return (false, 0);
        return (true, c);
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a / b);
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        if (b == 0) return (false, 0);
        return (true, a % b);
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: modulo by zero");
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        return a - b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryDiv}.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        return a % b;
    }
}


// Dependency file: @openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol


// pragma solidity >=0.6.2 <0.8.0;

/**
 * @dev Collection of functions related to the address type
 */
library AddressUpgradeable {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: value }(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data, string memory errorMessage) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


// Dependency file: @openzeppelin/contracts-upgradeable/proxy/Initializable.sol


// solhint-disable-next-line compiler-version
// pragma solidity >=0.4.24 <0.8.0;

// import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

/**
 * @dev This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 * behind a proxy. Since a proxied contract can't have a constructor, it's common to move constructor logic to an
 * external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 * function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 *
 * TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 * possible by providing the encoded function call as the `_data` argument to {UpgradeableProxy-constructor}.
 *
 * CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 * that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.
 */
abstract contract Initializable {

    /**
     * @dev Indicates that the contract has been initialized.
     */
    bool private _initialized;

    /**
     * @dev Indicates that the contract is in the process of being initialized.
     */
    bool private _initializing;

    /**
     * @dev Modifier to protect an initializer function from being invoked twice.
     */
    modifier initializer() {
        require(_initializing || _isConstructor() || !_initialized, "Initializable: contract is already initialized");

        bool isTopLevelCall = !_initializing;
        if (isTopLevelCall) {
            _initializing = true;
            _initialized = true;
        }

        _;

        if (isTopLevelCall) {
            _initializing = false;
        }
    }

    /// @dev Returns true if and only if the function is running in the constructor
    function _isConstructor() private view returns (bool) {
        return !AddressUpgradeable.isContract(address(this));
    }
}


// Dependency file: @openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol


// pragma solidity >=0.6.0 <0.8.0;
// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract ContextUpgradeable is Initializable {
    function __Context_init() internal initializer {
        __Context_init_unchained();
    }

    function __Context_init_unchained() internal initializer {
    }
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
    uint256[50] private __gap;
}


// Dependency file: @openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol


// pragma solidity >=0.6.0 <0.8.0;

// import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract OwnableUpgradeable is Initializable, ContextUpgradeable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function __Ownable_init() internal initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
    }

    function __Ownable_init_unchained() internal initializer {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
    uint256[49] private __gap;
}


// Dependency file: @openzeppelin/contracts/token/ERC20/IERC20.sol


// pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


// Dependency file: contracts/interfaces/IERC20Ext.sol


// pragma solidity 0.6.12;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Ext is IERC20 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function decimals() external view returns (uint8);
}


// Dependency file: contracts/interfaces/IKukuSwapLocker.sol


// pragma solidity 0.6.12;

interface IKukuSwapLocker {
    function lockLPToken(
        address _lpToken,
        uint256 _amount,
        uint256 _unlock_date,
        bool _fee_in_eth,
        address payable _withdrawer
    ) external payable;
}


// Dependency file: contracts/interfaces/IKukuSwapPresaleFactory.sol


// pragma solidity 0.6.12;

interface IKukuSwapPresaleFactory {
    function registerPresale(address _presaleAddress, address _presaleOwner) external;

    function presaleIsRegistered(address _presaleAddress) external view returns (bool);
}


// Dependency file: contracts/interfaces/IKukuSwapStaking.sol

// pragma solidity 0.6.12;

interface IKukuSwapStaking {
    function authorize(address _user, bool isAuth) external;

    function createDistribution(uint256 _amount, address _token) external;
}


// Dependency file: contracts/helpers/TransferHelper.sol


// pragma solidity 0.6.12;

/**
    @notice helper methods for interacting with ERC20 tokens that do not consistently return true/false
    with the addition of a transfer function to send eth or an erc20 token
**/
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: APPROVE_FAILED");
    }

    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: TRANSFER_FAILED");
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: TRANSFER_FROM_FAILED");
    }

    // sends ETH or an erc20 token
    function safeTransferBaseToken(
        address token,
        address payable to,
        uint256 value,
        bool isERC20
    ) internal {
        if (!isERC20) {
            to.transfer(value);
        } else {
            (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
            require(success && (data.length == 0 || abi.decode(data, (bool))), "TransferHelper: TRANSFER_FAILED");
        }
    }
}


// Dependency file: contracts/helpers/PresaleHelper.sol


// pragma solidity 0.6.12;

// import "@openzeppelin/contracts/math/SafeMath.sol";

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


// Dependency file: contracts/interfaces/IKukuSwapPresaleLockForwarder.sol


// pragma solidity 0.6.12;

// import "contracts/interfaces/IERC20Ext.sol";

interface IKukuSwapPresaleLockForwarder {
    function lockLiquidity(
        IERC20Ext _baseToken,
        IERC20Ext _saleToken,
        uint256 _baseAmount,
        uint256 _saleAmount,
        uint256 _unlock_date,
        address payable _withdrawer
    ) external;

    function kukuswapPairIsInitialised(address _token0, address _token1) external view returns (bool);
}


// Dependency file: contracts/interfaces/IKukuSwapFactory.sol


// pragma solidity 0.6.12;

interface IKukuSwapFactory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);

    function createPair(address tokenA, address tokenB) external returns (address pair);
}


// Dependency file: contracts/interfaces/IKukuSwapPresaleSettings.sol

// pragma solidity 0.6.12;

interface IKukuSwapPresaleSettings {
    function getMaxPresaleLength() external view returns (uint256);

    function getRound1Length() external view returns (uint256);

    function userHoldsSufficientRound1Token(address _user) external view returns (bool);

    function getBaseFee() external view returns (uint256);

    function getStakingAddress() external view returns (address payable);
}


// Dependency file: contracts/interfaces/IWKCS.sol

// pragma solidity 0.6.12;

interface IWKCS {
    function deposit() external payable;

    function transfer(address to, uint256 value) external returns (bool);

    function withdraw(uint256) external;
}


// Dependency file: @openzeppelin/contracts/utils/ReentrancyGuard.sol


// pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor () internal {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}


// Dependency file: @openzeppelin/contracts/utils/EnumerableSet.sol


// pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Library for managing
 * https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive
 * types.
 *
 * Sets have the following properties:
 *
 * - Elements are added, removed, and checked for existence in constant time
 * (O(1)).
 * - Elements are enumerated in O(n). No guarantees are made on the ordering.
 *
 * ```
 * contract Example {
 *     // Add the library methods
 *     using EnumerableSet for EnumerableSet.AddressSet;
 *
 *     // Declare a set state variable
 *     EnumerableSet.AddressSet private mySet;
 * }
 * ```
 *
 * As of v3.3.0, sets of type `bytes32` (`Bytes32Set`), `address` (`AddressSet`)
 * and `uint256` (`UintSet`) are supported.
 */
library EnumerableSet {
    // To implement this library for multiple types with as little code
    // repetition as possible, we write it in terms of a generic Set type with
    // bytes32 values.
    // The Set implementation uses private functions, and user-facing
    // implementations (such as AddressSet) are just wrappers around the
    // underlying Set.
    // This means that we can only create new EnumerableSets for types that fit
    // in bytes32.

    struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping (bytes32 => uint256) _indexes;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) { // Equivalent to contains(set, value)
            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
            // the array, and then remove the last element (sometimes called as 'swap and pop').
            // This modifies the order of the array, as noted in {at}.

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];

            // Move the last value to the index where the value to delete is
            set._values[toDeleteIndex] = lastvalue;
            // Update the index for the moved value
            set._indexes[lastvalue] = toDeleteIndex + 1; // All indexes are 1-based

            // Delete the slot where the moved value was stored
            set._values.pop();

            // Delete the index for the deleted slot
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function _contains(Set storage set, bytes32 value) private view returns (bool) {
        return set._indexes[value] != 0;
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    // Bytes32Set

    struct Bytes32Set {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _add(set._inner, value);
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _remove(set._inner, value);
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(Bytes32Set storage set, bytes32 value) internal view returns (bool) {
        return _contains(set._inner, value);
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(Bytes32Set storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(Bytes32Set storage set, uint256 index) internal view returns (bytes32) {
        return _at(set._inner, index);
    }

    // AddressSet

    struct AddressSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressSet storage set, address value) internal returns (bool) {
        return _add(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(AddressSet storage set, address value) internal returns (bool) {
        return _remove(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return _contains(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(AddressSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        return address(uint160(uint256(_at(set._inner, index))));
    }


    // UintSet

    struct UintSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(UintSet storage set, uint256 value) internal returns (bool) {
        return _add(set._inner, bytes32(value));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(UintSet storage set, uint256 value) internal returns (bool) {
        return _remove(set._inner, bytes32(value));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(UintSet storage set, uint256 value) internal view returns (bool) {
        return _contains(set._inner, bytes32(value));
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function length(UintSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(UintSet storage set, uint256 index) internal view returns (uint256) {
        return uint256(_at(set._inner, index));
    }
}


// Dependency file: contracts/KukuSwapPresale.sol

// pragma solidity 0.6.12;

// import "contracts/interfaces/IKukuSwapPresaleLockForwarder.sol";
// import "contracts/interfaces/IKukuSwapFactory.sol";
// import "contracts/interfaces/IKukuSwapPresaleSettings.sol";
// import "contracts/interfaces/IWKCS.sol";
// import "contracts/interfaces/IERC20Ext.sol";
// import "contracts/interfaces/IKukuSwapStaking.sol";
// import "contracts/helpers/TransferHelper.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/EnumerableSet.sol";
// import "@openzeppelin/contracts/math/SafeMath.sol";

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
        require(!PRESALE_LOCK_FORWARDER.kukuswapPairIsInitialised(address(_presaleToken), address(_baseToken)), "PAIR INITIALISED");

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
        require(DEV_ADDRESS == msg.sender, "Is not DEV ADDRESS");
        STATUS.FORCE_FAILED = true;
    }

    function setDevAddress(address newDevAddress) external {
        require(DEV_ADDRESS == msg.sender, "Is not DEV ADDRESS");
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
            WKCS.deposit{value: baseLiquidity.add(kukuBaseFee)}();
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

        TransferHelper.safeApprove(address(PRESALE_INFO.B_TOKEN), address(PRESALE_FEE_INFO.BASE_FEE_ADDRESS), kukuBaseFee);

        IKukuSwapStaking(PRESALE_FEE_INFO.BASE_FEE_ADDRESS).createDistribution(kukuBaseFee, address(PRESALE_INFO.B_TOKEN));

        // send back unsold tokens
        uint256 remainingSBalance = PRESALE_INFO.S_TOKEN.balanceOf(address(this));
        if (remainingSBalance > STATUS.TOTAL_TOKENS_SOLD) {
            uint256 sendAmount = remainingSBalance.sub(STATUS.TOTAL_TOKENS_SOLD);
            TransferHelper.safeTransfer(address(PRESALE_INFO.S_TOKEN), PRESALE_INFO.PRESALE_OWNER, sendAmount);
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


// Root file: contracts/KukuSwapPresaleGenerator.sol


// Ideally you should not interact with this contract directly, and use the KukuSwap presale app instead so warnings can be shown where necessary.

pragma solidity 0.6.12;

// import "@openzeppelin/contracts/math/SafeMath.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "contracts/interfaces/IERC20Ext.sol";
// import "contracts/interfaces/IKukuSwapLocker.sol";
// import "contracts/interfaces/IKukuSwapPresaleFactory.sol";
// import "contracts/interfaces/IKukuSwapStaking.sol";
// import "contracts/helpers/TransferHelper.sol";
// import "contracts/helpers/PresaleHelper.sol";
// import "contracts/KukuSwapPresale.sol";

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
        uint256[10] memory uint_params,
        bool lockTokens
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

        newPresale = new KukuSwapPresale(
            address(this),
            address(PRESALE_FACTORY),
            WKCS,
            address(PRESALE_SETTINGS),
            address(PRESALE_LOCK_FORWARDER),
            DEV_ADDRESS
        );

        if (lockTokens) {
            uint256 tokensRequiredForPresale = tokensRequiredForPresale(
                params.amount,
                params.tokenPrice,
                params.listingRate,
                params.liquidityPercent
            );

            TransferHelper.safeTransferFrom(address(_presaleToken), address(msg.sender), address(newPresale), tokensRequiredForPresale);
        }

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
        uint256 _liquidityPercent
    ) public pure returns (uint256 amount) {
        amount = PresaleHelper.calculateAmountRequired(_amount, _tokenPrice, _listingRate, _liquidityPercent);
    }
}
