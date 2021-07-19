// Dependency file: contracts/helpers/TransferHelper.sol

// SPDX-License-Identifier: MIT

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


// Dependency file: contracts/interfaces/IERC20.sol


// pragma solidity 0.6.12;

interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}


// Dependency file: contracts/interfaces/IKukuSwapPresaleFactory.sol


// pragma solidity 0.6.12;

interface IKukuSwapPresaleFactory {
    function registerPresale(address _presaleAddress) external;

    function presaleIsRegistered(address _presaleAddress) external view returns (bool);
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


// Dependency file: contracts/interfaces/IKukuSwapFactory.sol


// pragma solidity 0.6.12;

interface IKukuSwapFactory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);

    function createPair(address tokenA, address tokenB) external returns (address pair);
}


// Dependency file: contracts/interfaces/IKukuSwapPair.sol


// pragma solidity 0.6.12;

interface IKukuSwapPair {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint112 reserve0,
            uint112 reserve1,
            uint32 blockTimestampLast
        );

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function kLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}


// Dependency file: contracts/interfaces/IKukuSwapPresaleLockForwarder.sol


// pragma solidity 0.6.12;

// import "contracts/interfaces/IERC20.sol";

interface IKukuSwapPresaleLockForwarder {
    function lockLiquidity(
        IERC20 _baseToken,
        IERC20 _saleToken,
        uint256 _baseAmount,
        uint256 _saleAmount,
        uint256 _unlock_date,
        address payable _withdrawer
    ) external;

    function kukuswapPairIsInitialised(address _token0, address _token1) external view returns (bool);
}


// Dependency file: @openzeppelin/contracts/utils/Context.sol


// pragma solidity >=0.6.0 <0.8.0;

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
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}


// Dependency file: @openzeppelin/contracts/access/Ownable.sol


// pragma solidity >=0.6.0 <0.8.0;

// import "@openzeppelin/contracts/utils/Context.sol";
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
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
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
}


// Root file: contracts/KukuSwapPresaleLockForwarder.sol


/**
    This contract creates the lock on behalf of each presale. This contract will be whitelisted to bypass the flat rate 
    ETH fee. Please do not use the below locking code in your own contracts as the lock will fail without the ETH fee
*/

pragma solidity 0.6.12;

// import "contracts/helpers/TransferHelper.sol";
// import "contracts/interfaces/IERC20.sol";
// import "contracts/interfaces/IKukuSwapPresaleFactory.sol";
// import "contracts/interfaces/IKukuSwapLocker.sol";
// import "contracts/interfaces/IKukuSwapFactory.sol";
// import "contracts/interfaces/IKukuSwapPair.sol";
// import "contracts/interfaces/IKukuSwapPresaleLockForwarder.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

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
        uint256 balance = IERC20(_token0).balanceOf(pairAddress);
        if (balance > 0) {
            return true;
        }
        return false;
    }

    function lockLiquidity(
        IERC20 _baseToken,
        IERC20 _saleToken,
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
