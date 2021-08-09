// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "./interfaces/IERC20Ext.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// This contract handles swapping to and from KUKU ST, kukuswap's staking token.
contract KukuSwapStaking is ERC20Upgradeable, OwnableUpgradeable {
    IERC20Ext public KUKU;
    IERC20Ext public WKCS;

    /// @notice struct for store distributin
    struct Distribution {
        uint256 shares; //total shares
        uint256 amount; //amount for distribution
        address token; //token address
    }

    /// @notice index=>Distribution
    mapping(uint256 => Distribution) public distributions;

    uint256 public lastDistributionIndex;

    /// @notice  future index => (user => shares), shares for distribution
    mapping(uint256 => mapping(address => uint256)) public shares;

    ///  @notice user => (claimed distribution => bool)
    mapping(address => mapping(uint256 => bool)) public claimed;

    mapping(address => bool) public authorized;

    /// @notice Define the KUKU and WKCS token contract
    function initialize(IERC20Ext _KUKU, IERC20Ext _WKCS) public initializer {
        KUKU = _KUKU;
        WKCS = _WKCS;

        ERC20Upgradeable.__ERC20_init("KukuSwap Staking Token", "KUKU Shares");
        OwnableUpgradeable.__Ownable_init();
    }

    //await
    modifier isAuthorized() {
        require(authorized[_msgSender()], "KukuSwap Staking: not authorized user");
        _;
    }

    modifier isOnlyOwnerOrAuthorized() {
        require((authorized[_msgSender()] || owner() == _msgSender()), "KukuSwap Staking: not authorized user");
        _;
    }

    /// @notice Enter the Staking. Pay some KUKUs. Earn some shares.
    // Locks KUKU and mints KUKU ST
    function enter(uint256 _amount) external {
        // Gets the amount of KUKU locked in the contract
        uint256 totalKUKU = KUKU.balanceOf(address(this));
        // Gets the amount of KUKU ST in existence
        uint256 totalShares = totalSupply();
        // If no KUKU ST exists, mint it 1:1 to the amount put in

        uint256 what = _amount;
        if (totalShares != 0 || totalKUKU != 0) {
            what = _amount.mul(totalShares).div(totalKUKU);
        }

        _mint(_msgSender(), what);

        // Lock the KUKU in the contract
        KUKU.transferFrom(_msgSender(), address(this), _amount);

        _updateShares(_msgSender());
    }

    /// @notice  Leave the staking. Claim back your KUKUs.
    // Unlocks the staked + gained KUKU and burns KUKU ST
    function leave(uint256 _share) external {
        //Distribute Rewards
        _claim(_msgSender());
        // Gets the amount of KUKU ST in existence
        uint256 totalShares = totalSupply();

        // Calculates the amount of KUKU the KUKU ST is worth
        uint256 what = _share.mul(KUKU.balanceOf(address(this))).div(totalShares);

        _burn(_msgSender(), _share);

        //transfer KUKU

        if (what >= KUKU.balanceOf(address(this))) {
            what = KUKU.balanceOf(address(this));
        }

        KUKU.transfer(_msgSender(), what);

        _updateShares(_msgSender());
    }

    /// @notice override transfer. update shares for  user after
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        super.transfer(recipient, amount);
        _updateShares(_msgSender());
        _updateShares(recipient);
    }

    /// @notice override transferFrom. update shares for  user after
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        super.transferFrom(sender, recipient, amount);
        _updateShares(sender);
        _updateShares(recipient);
    }

    /*
        view functions
    */

    /// @notice get latest share for distribution
    function getDistributionShareBalance(uint256 _distributionIndex, address _user) public view returns (uint256 share) {
        uint256 i;
        for (i = _distributionIndex; i > 0; i--) {
            share = shares[i][_user];

            if (share > 0) {
                break;
            }
        }
    }

    /// @notice get reward amount
    function getRewardsAmount(address _user, address _token) external view returns (uint256 amountToClaim) {
        for (uint256 i = 1; i <= lastDistributionIndex; i++) {
            if (!claimed[_user][i]) {
                if (distributions[i].token == _token) {
                    amountToClaim += _getRewardAmount(i, _user);
                }
            }
        }
    }

    /// @notice get staking amount
    function getStakingAmount(address _user) external view returns (uint256 amount) {
        // Calculates the amount of KUKU the KUKU ST is worth
        amount = balanceOf(_user).mul(KUKU.balanceOf(address(this))).div(totalSupply());
    }

    /**
        only owner functions
    **/

    function authorize(address _user, bool isAuth) external isOnlyOwnerOrAuthorized {
        authorized[_user] = isAuth;
    }

    function updateTokenAddress(address _kuku, address _wkcs) external onlyOwner {
        KUKU = IERC20Ext(_kuku);
        WKCS = IERC20Ext(_wkcs);
    }

    /// @notice create Distribution from authorized user or contract. ILO for example
    function createDistribution(uint256 _amount, address _token) external virtual isAuthorized {
        Distribution memory d = Distribution(totalSupply(), _amount, _token);

        lastDistributionIndex = ++lastDistributionIndex;

        distributions[lastDistributionIndex] = d;

        IERC20Ext(_token).transferFrom(_msgSender(), address(this), _amount);
    }

    function _updateShares(address _user) internal {
        shares[lastDistributionIndex + 1][_user] = balanceOf(_user);
    }

    //claim distributions
    function _claim(address _user) internal {
        uint256 claimedAmount = 0;

        if (lastDistributionIndex != 0) {
            for (uint256 i = 1; i <= lastDistributionIndex; i++) {
                if (!claimed[_user][i]) {
                    claimedAmount = _getRewardAmount(i, _user);

                    if (claimedAmount >= WKCS.balanceOf(address(this))) {
                        claimedAmount = WKCS.balanceOf(address(this));
                    }

                    Distribution memory d = distributions[i];

                    IERC20Ext(d.token).transfer(_msgSender(), claimedAmount);

                    claimed[_user][i] = true;
                }
            }
        }
    }

    function _getRewardAmount(uint256 _distributionIndex, address _user) internal view returns (uint256 amountToClaim) {
        Distribution memory d = distributions[_distributionIndex];
        uint256 totalShares = d.shares;
        uint256 amount = d.amount;
        uint256 share = getDistributionShareBalance(_distributionIndex, _user);

        if (share > 0) {
            amountToClaim = share.mul(amount).div(totalShares);
        }
    }
}
