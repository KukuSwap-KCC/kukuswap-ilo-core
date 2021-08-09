import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";

describe("KukuSwapPresale User Operation - Success Presale", function () {
    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x852ead547a013cc1e35ee41454af7a8d75a7b49d"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
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
            params: [userAddress],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [holderBNB],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");

        this.Staking = await ethers.getContractFactory("KukuSwapStaking");

        this.Generator = await ethers.getContractFactory("KukuSwapPresaleGenerator");

        // locker
        this.locker = await this.Locker.deploy();
        await this.locker.initialize(kukuFactory);

        //factory
        this.factory = await this.Factory.deploy();
        await this.factory.initialize();

        //forwarder
        this.forwarder = await this.Forwarder.deploy();
        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        //staking
        this.staking = await this.Staking.deploy();
        await this.staking.initialize(this.kuku.address, this.wkcs.address);

        //settings
        this.settings = await this.Settings.deploy();
        await this.settings.initialize(this.staking.address);

        //dev
        this.dev = (await ethers.getSigners())[1];

        //generator
        this.generator = await this.Generator.deploy();
        await this.generator.initialize(
            this.factory.address,
            this.wkcs.address,
            this.settings.address,
            this.forwarder.address,
            this.dev.address
        );

        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

        //allow operations to generator
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.staking.authorize(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);
    });

    it("should have correct default settings", async function () {
        const settings = await this.settings.SETTINGS();

        //base fee
        expect(settings.BASE_FEE).to.be.equal(50);
        expect(settings.STAKING_ADDRESS).to.be.equal(this.staking.address);
        expect(settings.ROUND1_LENGTH).to.be.equal(1200);
        expect(settings.MAX_PRESALE_LENGTH).to.be.equal(93046);

        expect(await this.settings.getStakingAddress()).to.be.equal(
            this.staking.address
        );
        expect(await this.settings.getBaseFee()).to.be.equal(50);
        expect(await this.settings.getRound1Length()).to.be.equal(1200);
        expect(await this.settings.getMaxPresaleLength()).to.be.equal(93046);
    });

    it("should create presale contract", async function () {
        await this.bnb
            .connect(this.presaleOwner)
            .approve(this.generator.address, ethers.utils.parseEther("1000"));

        const startBlock = (await ethers.provider.getBlockNumber()) + 10;
        const endBlock = (await ethers.provider.getBlockNumber()) + 100;

        await this.generator
            .connect(this.presaleOwner)
            .createPresale(
                this.presaleOwner.address,
                this.bnb.address,
                this.wkcs.address,
                [
                    ethers.utils.parseEther("100"), //amount
                    ethers.utils.parseEther("100"), // 1 KCS = 100
                    ethers.utils.parseEther("0.01"), //maxSpendPerBuyer
                    ethers.utils.parseEther("0.02"), //hard cap
                    ethers.utils.parseEther("0.01"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("100"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ]
            );

        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        const presaleInfo = await presale.PRESALE_INFO();

        expect(presaleInfo.PRESALE_OWNER).to.be.equal(this.presaleOwner.address);
        expect(presaleInfo.S_TOKEN).to.be.equal(this.bnb.address);
        expect(presaleInfo.B_TOKEN).to.be.equal(this.wkcs.address);
        expect(presaleInfo.TOKEN_PRICE).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.MAX_SPEND_PER_BUYER).to.be.equal(
            ethers.utils.parseEther("0.01")
        );
        expect(presaleInfo.AMOUNT).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.HARDCAP).to.be.equal(ethers.utils.parseEther("0.02"));
        expect(presaleInfo.SOFTCAP).to.be.equal(ethers.utils.parseEther("0.01"));
        expect(presaleInfo.LIQUIDITY_PERCENT).to.be.equal(600);
        expect(presaleInfo.LISTING_RATE).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.START_BLOCK).to.be.equal(startBlock);
        expect(presaleInfo.END_BLOCK).to.be.equal(endBlock);
        expect(presaleInfo.LOCK_PERIOD).to.be.equal(806400);
        expect(presaleInfo.PRESALE_IN_KCS).to.be.equal(true);
    });

    it("should be open for deposit after start", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("NOT ACTIVE");

        for (let i = 0; i < 10; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //investor 1
        const userBalance1 = await this.investor.getBalance();
        await presale
            .connect(this.investor)
            .userDeposit(0, { value: ethers.utils.parseEther("0.01") });

        let status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.01")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("1"));
        expect(await this.investor.getBalance()).to.be.equal(
            userBalance1.sub(ethers.utils.parseEther("0.01"))
        );

        //investor 2
        const userBalance2 = await this.investor2.getBalance();
        await presale
            .connect(this.investor2)
            .userDeposit(0, { value: ethers.utils.parseEther("1") });

        status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.02")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("2"));
        expect(await this.investor2.getBalance()).to.be.equal(
            userBalance2.sub(ethers.utils.parseEther("0.01"))
        );
    });

    it("should be open for withdaraw tokens after end", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale.connect(this.investor).userWithdrawTokens()
        ).to.be.revertedWith("AWAITING LP GENERATION");

        for (let i = 0; i < 100; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        const ownerBalanceBefore = await this.presaleOwner.getBalance();
        await presale.connect(this.presaleOwner).addLiquidity();

        //presale Owner
        expect(await this.presaleOwner.getBalance()).to.be.gt(ownerBalanceBefore);

        //investor 1
        await presale.connect(this.investor).userWithdrawTokens();
        expect(await this.bnb.balanceOf(this.investor.address)).to.be.equal(
            ethers.utils.parseEther("1")
        );

        //investor 2
        await presale.connect(this.investor2).userWithdrawTokens();
        expect(await this.bnb.balanceOf(this.investor2.address)).to.be.equal(
            ethers.utils.parseEther("1")
        );

        expect(
            await this.locker.getUserNumLockedTokens(this.presaleOwner.address)
        ).to.be.equal("1");

        //staking contract distribution

        expect(await this.wkcs.balanceOf(this.staking.address)).to.be.gt(0);

        let lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");

        let distribution = await this.staking.distributions(lastDistributionIndex);
        expect(distribution.amount).to.gt(0)
        expect(distribution.token).to.equal(this.wkcs.address);
    });
});

describe("KukuSwapPresale Manage Operation", function () {
    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x852ead547a013cc1e35ee41454af7a8d75a7b49d"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
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
            params: [userAddress],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [holderBNB],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");

        this.Staking = await ethers.getContractFactory("KukuSwapStaking");

        this.Generator = await ethers.getContractFactory("KukuSwapPresaleGenerator");

        // locker
        this.locker = await this.Locker.deploy();
        await this.locker.initialize(kukuFactory);

        //factory
        this.factory = await this.Factory.deploy();
        await this.factory.initialize();

        //forwarder
        this.forwarder = await this.Forwarder.deploy();
        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        //staking
        this.staking = await this.Staking.deploy();
        await this.staking.initialize(this.kuku.address, this.wkcs.address);

        //settings
        this.settings = await this.Settings.deploy();
        await this.settings.initialize(this.staking.address);

        //dev
        this.dev = (await ethers.getSigners())[1];

        //generator
        this.generator = await this.Generator.deploy();
        await this.generator.initialize(
            this.factory.address,
            this.wkcs.address,
            this.settings.address,
            this.forwarder.address,
            this.dev.address
        );

        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

        //allow operations to generator
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.staking.authorize(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);
    });

    it("should manage only from presale owner", async function () {
        await this.bnb
            .connect(this.presaleOwner)
            .approve(this.generator.address, ethers.utils.parseEther("1000"));

        const startBlock = (await ethers.provider.getBlockNumber()) + 50;
        const endBlock = (await ethers.provider.getBlockNumber()) + 150;

        await this.generator
            .connect(this.presaleOwner)
            .createPresale(
                this.presaleOwner.address,
                this.bnb.address,
                this.wkcs.address,
                [
                    ethers.utils.parseEther("100"), //amount
                    ethers.utils.parseEther("100"), // 1 KCS = 100
                    ethers.utils.parseEther("0.01"), //maxSpendPerBuyer
                    ethers.utils.parseEther("100"), //hard cap
                    ethers.utils.parseEther("50"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("100"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ]
            );

        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale.connect(this.investor).setWhitelistFlag(true)
        ).to.be.revertedWith("NOT PRESALE OWNER");

        await expect(
            presale.connect(this.investor).editWhitelist([this.investor2.address], true)
        ).to.be.revertedWith("NOT PRESALE OWNER");

        await expect(
            presale
                .connect(this.investor)
                .updateMaxSpendLimit(ethers.utils.parseEther("10"))
        ).to.be.revertedWith("NOT PRESALE OWNER");

        await expect(
            presale.connect(this.investor).updateBlocks(startBlock, endBlock)
        ).to.be.revertedWith("NOT PRESALE OWNER");

        await presale.connect(this.presaleOwner).setWhitelistFlag(true);

        await presale
            .connect(this.presaleOwner)
            .editWhitelist([this.investor2.address], true);

        for (let i = 0; i < 70; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await presale
            .connect(this.investor2)
            .userDeposit(0, { value: ethers.utils.parseEther("1") });

        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("1") })
        ).to.be.revertedWith("NOT WHITELISTED");

        await presale
            .connect(this.presaleOwner)
            .updateMaxSpendLimit(ethers.utils.parseEther("10"));

        await presale
            .connect(this.investor2)
            .userDeposit(0, { value: ethers.utils.parseEther("6") });

        const status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("6.01")
        );

        await expect(
            presale.connect(this.presaleOwner).updateBlocks(startBlock, endBlock)
        ).to.be.revertedWith("PRESALE IS ACTIVE");
    });

    it("should allow the withdrawal of tokens  if presale is fail", async function () {
        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //withdraw base tokens
        const userBalanceBefore = await this.investor2.getBalance();

        await presale.connect(this.investor2).userWithdrawBaseTokens();

        expect(await this.investor2.getBalance()).to.be.equal(
            userBalanceBefore.add(ethers.utils.parseEther("6.01"))
        );

        const ownerBalanceBefore = await this.bnb.balanceOf(this.presaleOwner.address);

        //presale owner withdraw base tokens
        await presale.connect(this.presaleOwner).ownerWithdrawTokens();

        expect(await this.bnb.balanceOf(this.presaleOwner.address)).to.be.gte(
            ownerBalanceBefore
        );
    });
});

describe("KukuSwapPresale Simple Operation - Round 1 with Early Access Tokens", function () {
    const kukuHolder = ethers.utils.getAddress(
        "0xe3905ED0fd3Fa86001ee98A01b32ab732e8E3c27"
    );

    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x852ead547a013cc1e35ee41454af7a8d75a7b49d"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
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
            params: [userAddress],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [holderBNB],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [kukuHolder],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");

        this.Staking = await ethers.getContractFactory("KukuSwapStaking");

        this.Generator = await ethers.getContractFactory("KukuSwapPresaleGenerator");

        // locker
        this.locker = await this.Locker.deploy();
        await this.locker.initialize(kukuFactory);

        //factory
        this.factory = await this.Factory.deploy();
        await this.factory.initialize();

        //forwarder
        this.forwarder = await this.Forwarder.deploy();
        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        //staking
        this.staking = await this.Staking.deploy();
        await this.staking.initialize(this.kuku.address, this.wkcs.address);

        //settings
        this.settings = await this.Settings.deploy();
        await this.settings.initialize(this.staking.address);

        //dev
        this.dev = (await ethers.getSigners())[1];

        //generator
        this.generator = await this.Generator.deploy();
        await this.generator.initialize(
            this.factory.address,
            this.wkcs.address,
            this.settings.address,
            this.forwarder.address,
            this.dev.address
        );

        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

        this.kukuHolder = await ethers.getSigner(kukuHolder);

        //allow operations to generator
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.staking.authorize(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);

        await this.settings.editEarlyAccessTokens(
            this.kuku.address,
            ethers.utils.parseEther("1"),
            true
        );

        await this.settings.setRound1Length(50);
    });

    it("should create presale contract", async function () {
        await this.bnb
            .connect(this.presaleOwner)
            .approve(this.generator.address, ethers.utils.parseEther("1000"));

        const startBlock = (await ethers.provider.getBlockNumber()) + 10;
        const endBlock = (await ethers.provider.getBlockNumber()) + 100;

        await this.generator
            .connect(this.presaleOwner)
            .createPresale(
                this.presaleOwner.address,
                this.bnb.address,
                this.wkcs.address,
                [
                    ethers.utils.parseEther("100"), //amount
                    ethers.utils.parseEther("100"), // 1 KCS = 100
                    ethers.utils.parseEther("0.01"), //maxSpendPerBuyer
                    ethers.utils.parseEther("0.02"), //hard cap
                    ethers.utils.parseEther("0.01"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("100"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ]
            );

        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        const presaleInfo = await presale.PRESALE_INFO();

        expect(presaleInfo.PRESALE_OWNER).to.be.equal(this.presaleOwner.address);
        expect(presaleInfo.S_TOKEN).to.be.equal(this.bnb.address);
        expect(presaleInfo.B_TOKEN).to.be.equal(this.wkcs.address);
        expect(presaleInfo.TOKEN_PRICE).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.MAX_SPEND_PER_BUYER).to.be.equal(
            ethers.utils.parseEther("0.01")
        );
        expect(presaleInfo.AMOUNT).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.HARDCAP).to.be.equal(ethers.utils.parseEther("0.02"));
        expect(presaleInfo.SOFTCAP).to.be.equal(ethers.utils.parseEther("0.01"));
        expect(presaleInfo.LIQUIDITY_PERCENT).to.be.equal(600);
        expect(presaleInfo.LISTING_RATE).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.START_BLOCK).to.be.equal(startBlock);
        expect(presaleInfo.END_BLOCK).to.be.equal(endBlock);
        expect(presaleInfo.LOCK_PERIOD).to.be.equal(806400);
        expect(presaleInfo.PRESALE_IN_KCS).to.be.equal(true);
    });

    it("should be open for deposit after start with whitelist round 1", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("NOT ACTIVE");

        for (let i = 0; i < 12; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //investor 1
        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).revertedWith("INSUFFICENT ROUND 1 TOKEN BALANCE");

        //investor 2
        const userBalance2 = await this.kukuHolder.getBalance();
        await presale
            .connect(this.kukuHolder)
            .userDeposit(0, { value: ethers.utils.parseEther("0.1") });

        const status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.01")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("1"));
        expect(await this.kukuHolder.getBalance()).to.be.equal(
            userBalance2.sub(ethers.utils.parseEther("0.01"))
        );

        for (let i = 0; i < 50; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        presale
            .connect(this.investor)
            .userDeposit(0, { value: ethers.utils.parseEther("0.01") });
    });
});

describe("KukuSwapPresale Simple Operation with KUKU as Base Token", function () {
    const kukuHolder = ethers.utils.getAddress(
        "0xe3905ED0fd3Fa86001ee98A01b32ab732e8E3c27"
    );

    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x852ead547a013cc1e35ee41454af7a8d75a7b49d"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
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
            params: [userAddress],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [holderBNB],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [kukuHolder],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");

        this.Staking = await ethers.getContractFactory("KukuSwapStaking");

        this.Generator = await ethers.getContractFactory("KukuSwapPresaleGenerator");

        // locker
        this.locker = await this.Locker.deploy();
        await this.locker.initialize(kukuFactory);

        //factory
        this.factory = await this.Factory.deploy();
        await this.factory.initialize();

        //forwarder
        this.forwarder = await this.Forwarder.deploy();
        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        //staking
        this.staking = await this.Staking.deploy();
        await this.staking.initialize(this.kuku.address, this.wkcs.address);

        //settings
        this.settings = await this.Settings.deploy();
        await this.settings.initialize(this.staking.address);

        //dev
        this.dev = (await ethers.getSigners())[1];

        //generator
        this.generator = await this.Generator.deploy();
        await this.generator.initialize(
            this.factory.address,
            this.wkcs.address,
            this.settings.address,
            this.forwarder.address,
            this.dev.address
        );

        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

        this.kukuHolder = await ethers.getSigner(kukuHolder);

        //allow operations to generator
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.staking.authorize(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);

        await this.settings.setRound1Length(50);
    });

    it("should create presale contract", async function () {
        await this.bnb
            .connect(this.presaleOwner)
            .approve(this.generator.address, ethers.utils.parseEther("1000"));

        const startBlock = (await ethers.provider.getBlockNumber()) + 10;
        const endBlock = (await ethers.provider.getBlockNumber()) + 100;

        await this.generator
            .connect(this.presaleOwner)
            .createPresale(
                this.presaleOwner.address,
                this.bnb.address,
                this.kuku.address,
                [
                    ethers.utils.parseEther("100"), //amount
                    ethers.utils.parseEther("1"), // 1 KCS = 1
                    ethers.utils.parseEther("10"), //maxSpendPerBuyer
                    ethers.utils.parseEther("10"), //hard cap
                    ethers.utils.parseEther("5"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("1"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ]
            );

        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        const presaleInfo = await presale.PRESALE_INFO();

        expect(presaleInfo.PRESALE_OWNER).to.be.equal(this.presaleOwner.address);
        expect(presaleInfo.S_TOKEN).to.be.equal(this.bnb.address);
        expect(presaleInfo.B_TOKEN).to.be.equal(this.kuku.address);
        expect(presaleInfo.TOKEN_PRICE).to.be.equal(ethers.utils.parseEther("1"));
        expect(presaleInfo.MAX_SPEND_PER_BUYER).to.be.equal(
            ethers.utils.parseEther("10")
        );
        expect(presaleInfo.AMOUNT).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.HARDCAP).to.be.equal(ethers.utils.parseEther("10"));
        expect(presaleInfo.SOFTCAP).to.be.equal(ethers.utils.parseEther("5"));
        expect(presaleInfo.LIQUIDITY_PERCENT).to.be.equal(600);
        expect(presaleInfo.LISTING_RATE).to.be.equal(ethers.utils.parseEther("1"));
        expect(presaleInfo.START_BLOCK).to.be.equal(startBlock);
        expect(presaleInfo.END_BLOCK).to.be.equal(endBlock);
        expect(presaleInfo.LOCK_PERIOD).to.be.equal(806400);
        expect(presaleInfo.PRESALE_IN_KCS).to.be.equal(false);
    });

    it("should be open for deposit after start", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("NOT ACTIVE");

        for (let i = 0; i < 12; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //investor 2
        const kukuBalanceBefore = await this.kuku.balanceOf(this.kukuHolder.address);

        await this.kuku
            .connect(this.kukuHolder)
            .approve(presale.address, ethers.utils.parseEther("100"));

        await presale
            .connect(this.kukuHolder)
            .userDeposit(ethers.utils.parseEther("100"));

        const status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(ethers.utils.parseEther("10"));
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("10"));
        expect(await this.kuku.balanceOf(this.kukuHolder.address)).to.be.equal(
            kukuBalanceBefore.sub(ethers.utils.parseEther("10"))
        );
    });

    it("should be open for withdaraw tokens after end", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale.connect(this.kukuHolder).userWithdrawTokens()
        ).to.be.revertedWith("AWAITING LP GENERATION");

        for (let i = 0; i < 150; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        const ownerBalanceBefore = await this.kuku.balanceOf(this.presaleOwner.address);

        await presale.connect(this.presaleOwner).addLiquidity();

        expect(await this.kuku.balanceOf(this.presaleOwner.address)).to.be.gt(
            ownerBalanceBefore
        );

        const kukuBalanceBefore = await this.bnb.balanceOf(this.kukuHolder.address);

        //investor 1
        await expect(
            presale.connect(this.investor).userWithdrawTokens()
        ).to.be.revertedWith("NOTHING TO WITHDRAW");

        //kukuholder
        await presale.connect(this.kukuHolder).userWithdrawTokens();
        expect(await this.bnb.balanceOf(this.kukuHolder.address)).to.be.equal(
            kukuBalanceBefore.add(ethers.utils.parseEther("10"))
        );

        //staking contract distribution

        expect(await this.kuku.balanceOf(this.staking.address)).to.be.gt(0);

        let lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");

        let distribution = await this.staking.distributions(lastDistributionIndex);
        expect(distribution.amount).to.gt(0)
        expect(distribution.token).to.equal(this.kuku.address);
    });
});

describe("KukuSwapPresale Failed Presale with KUKU as Base Token ", function () {
    const kukuHolder = ethers.utils.getAddress(
        "0xe3905ED0fd3Fa86001ee98A01b32ab732e8E3c27"
    );

    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x852ead547a013cc1e35ee41454af7a8d75a7b49d"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x509195a9d762bc6f3282c874156bd2e45de86a10"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
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
            params: [userAddress],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [holderBNB],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [kukuHolder],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");

        this.Staking = await ethers.getContractFactory("KukuSwapStaking");

        this.Generator = await ethers.getContractFactory("KukuSwapPresaleGenerator");

        // locker
        this.locker = await this.Locker.deploy();
        await this.locker.initialize(kukuFactory);

        //factory
        this.factory = await this.Factory.deploy();
        await this.factory.initialize();

        //forwarder
        this.forwarder = await this.Forwarder.deploy();
        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        //staking
        this.staking = await this.Staking.deploy();
        await this.staking.initialize(this.kuku.address, this.wkcs.address);

        //settings
        this.settings = await this.Settings.deploy();
        await this.settings.initialize(this.staking.address);

        //dev
        this.dev = (await ethers.getSigners())[1];

        //generator
        this.generator = await this.Generator.deploy();
        await this.generator.initialize(
            this.factory.address,
            this.wkcs.address,
            this.settings.address,
            this.forwarder.address,
            this.dev.address
        );

        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

        this.kukuHolder = await ethers.getSigner(kukuHolder);

        //allow operations to generator
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.staking.authorize(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);

        await this.settings.setRound1Length(50);
    });

    it("should create presale contract", async function () {
        await this.bnb
            .connect(this.presaleOwner)
            .approve(this.generator.address, ethers.utils.parseEther("1000"));

        const startBlock = (await ethers.provider.getBlockNumber()) + 10;
        const endBlock = (await ethers.provider.getBlockNumber()) + 100;

        await this.generator
            .connect(this.presaleOwner)
            .createPresale(
                this.presaleOwner.address,
                this.bnb.address,
                this.kuku.address,
                [
                    ethers.utils.parseEther("100"), //amount
                    ethers.utils.parseEther("1"), // 1 KCS = 1
                    ethers.utils.parseEther("10"), //maxSpendPerBuyer
                    ethers.utils.parseEther("100"), //hard cap
                    ethers.utils.parseEther("20"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("1"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ]
            );

        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        const presaleInfo = await presale.PRESALE_INFO();

        expect(presaleInfo.PRESALE_OWNER).to.be.equal(this.presaleOwner.address);
        expect(presaleInfo.S_TOKEN).to.be.equal(this.bnb.address);
        expect(presaleInfo.B_TOKEN).to.be.equal(this.kuku.address);
        expect(presaleInfo.TOKEN_PRICE).to.be.equal(ethers.utils.parseEther("1"));
        expect(presaleInfo.MAX_SPEND_PER_BUYER).to.be.equal(
            ethers.utils.parseEther("10")
        );
        expect(presaleInfo.AMOUNT).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.HARDCAP).to.be.equal(ethers.utils.parseEther("100"));
        expect(presaleInfo.SOFTCAP).to.be.equal(ethers.utils.parseEther("20"));
        expect(presaleInfo.LIQUIDITY_PERCENT).to.be.equal(600);
        expect(presaleInfo.LISTING_RATE).to.be.equal(ethers.utils.parseEther("1"));
        expect(presaleInfo.START_BLOCK).to.be.equal(startBlock);
        expect(presaleInfo.END_BLOCK).to.be.equal(endBlock);
        expect(presaleInfo.LOCK_PERIOD).to.be.equal(806400);
        expect(presaleInfo.PRESALE_IN_KCS).to.be.equal(false);
    });

    it("should allow withdrawal of the tokens after fail presale", async function () {
        expect(
            await this.factory.presalesLengthByUser(this.presaleOwner.address)
        ).to.be.equal(1);

        const presaleIndex =
            (await this.factory.presalesLengthByUser(this.presaleOwner.address)) - 1;

        const newPresale = await this.factory.presaleAtIndexByUser(
            this.presaleOwner.address,
            presaleIndex
        );

        const presale = await ethers.getContractAt("KukuSwapPresale", newPresale);

        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("NOT ACTIVE");

        for (let i = 0; i < 12; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //investor 2
        const kukuBalanceBefore = await this.kuku.balanceOf(this.kukuHolder.address);

        await this.kuku
            .connect(this.kukuHolder)
            .approve(presale.address, ethers.utils.parseEther("100"));

        await presale
            .connect(this.kukuHolder)
            .userDeposit(ethers.utils.parseEther("100"));

        const status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(ethers.utils.parseEther("10"));
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("10"));
        expect(await this.kuku.balanceOf(this.kukuHolder.address)).to.be.equal(
            kukuBalanceBefore.sub(ethers.utils.parseEther("10"))
        );

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        //withdraw base tokens
        const userBalanceBefore = await this.kuku.balanceOf(this.kukuHolder.address);

        await presale.connect(this.kukuHolder).userWithdrawBaseTokens();

        expect(await this.kuku.balanceOf(this.kukuHolder.address)).to.be.equal(
            userBalanceBefore.add(ethers.utils.parseEther("10"))
        );

        const ownerBalanceBefore = await this.bnb.balanceOf(this.presaleOwner.address);

        //presale owner withdraw base tokens
        await presale.connect(this.presaleOwner).ownerWithdrawTokens();

        expect(await this.bnb.balanceOf(this.presaleOwner.address)).to.be.gte(
            ownerBalanceBefore
        );
    });
});
