import { ethers, network } from "hardhat";
import { expect } from "chai";

describe("KukuSwapStakingMigration", function () {
    const proxyAdmin = ethers.utils.getAddress(
        "0xfD32470442E9d10277d32f0cdb0e35284F48Ac2A"
    );

    const owner = ethers.utils.getAddress("0x9280E3Eb147027FC04d4805f21D629eBCf305493");

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );
    const proxyAddress = ethers.utils.getAddress(
        "0xEB2f650E89Fd2F4895395a4e06f59365F10b8472"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const stakingOwner = ethers.utils.getAddress(
        "0x3a4aDC13C6f9d80983829243e9e1FFAE2E265054"
    );

    const staker = ethers.utils.getAddress(
        "0x42b853fb9c26d633a51ff47141efd641f3595577"
    );

    before(async function () {
        await network.provider.request({
            method: "hardhat_reset",
            params: [
                {
                    forking: {
                        jsonRpcUrl: "https://rpc-mainnet.kcc.network",
                    },
                },
            ],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [owner],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [stakingOwner],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [staker],
        });

        this.owner = await ethers.getSigner(owner);

        this.stakingOwner = await ethers.getSigner(stakingOwner);

        this.staker = await ethers.getSigner(staker);

        const Staking = await ethers.getContractFactory("KukuSwapStaking");
        this.admin = await ethers.getContractAt("KukuProxyAdmin", proxyAdmin);
        const staking = await Staking.deploy();

        await this.admin.connect(this.owner).upgrade(proxyAddress, staking.address);

        this.staking = await ethers.getContractAt("KukuSwapStaking", proxyAddress);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.signers = await ethers.getSigners();

        this.minter = this.owner;
    });

    it("should correct balance of share", async function () {

        expect(await this.staking.KUKU()).to.be.equal(this.kuku.address);

        expect(await this.staking.totalSupply()).to.be.equal(
            await this.kuku.balanceOf(this.staking.address)
        );

        const kukuBalance = await this.kuku.balanceOf(this.staking.address);

        await this.staking.initKukuBalance();

        expect(await this.staking.totalStakingKuku()).to.be.equal(kukuBalance);

        expect(await this.staking.isKukuBalanceInit()).to.be.equal(true);

        expect(await this.staking.KUKU()).to.be.equal(this.kuku.address);

        expect(await this.staking.WKCS()).to.be.equal(this.wkcs.address);
        
    });

    it("should create distribution from minter", async function () {
        await this.staking
            .connect(this.stakingOwner)
            .authorize(this.minter.address, true);

        await this.kuku.connect(this.owner).approve(this.staking.address, "100");

        const totalShares = await this.staking.totalSupply();

        let shares = await this.staking.shares(
            1,
            this.staker.address
        );
        
        expect(shares).to.be.gt(0)

        await this.staking.connect(this.owner).enter("20");

        await this.wkcs.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });

        await this.staking
            .connect(this.minter)
            .createDistribution("100", this.wkcs.address, {
                from: this.minter.address,
            });

        const lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        const distribution = await this.staking.distributions(lastDistributionIndex);

        shares = await this.staking.shares(
            lastDistributionIndex,
            this.owner.address
        );

        expect(shares).to.equal("20");
        expect(distribution.amount).to.equal("100");

        expect(distribution.shares).to.equal(
            totalShares.add(ethers.BigNumber.from("20"))
        );

        expect(await this.wkcs.balanceOf(this.staking.address)).to.equal("100");
    });

    it("should claim distribution after leave", async function () {
        const lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        const distribution = await this.staking.distributions(lastDistributionIndex);

        const shares = await this.staking.shares(
            lastDistributionIndex,
            this.staker.address
        );

        const wkcsStakerBalance = await this.wkcs.balanceOf(this.staker.address);

        const kukuStakerBalance = await this.kuku.balanceOf(this.staker.address);
        const totalShares = await this.staking.totalSupply();

        expect(distribution.amount).to.equal("100");

        await this.staking.connect(this.staker).leave("200");

        expect(await this.kuku.balanceOf(this.staker.address)).to.be.equal(
            kukuStakerBalance.add(ethers.BigNumber.from("200"))
        );

        expect(await this.wkcs.balanceOf(this.staker.address)).to.be.gt(
            wkcsStakerBalance
        );

        expect(await this.staking.totalSupply()).to.be.equal(
            totalShares.sub(ethers.BigNumber.from("200"))
        );

        await this.staking.connect(this.staker).leave("200");

        expect(await this.kuku.balanceOf(this.staker.address)).equal(
            kukuStakerBalance.add(ethers.BigNumber.from("400"))
        );

        expect(await this.wkcs.balanceOf(this.staker.address)).to.be.gt(
            wkcsStakerBalance
        );

        expect(await this.staking.totalSupply()).to.be.equal(
            totalShares.sub(ethers.BigNumber.from("400"))
        );

        const sharesAfter = await this.staking.shares(
            lastDistributionIndex.add(1),
            this.staker.address
        );
        expect(sharesAfter).to.be.equal(shares.sub(ethers.BigNumber.from("400")));
    });
});
