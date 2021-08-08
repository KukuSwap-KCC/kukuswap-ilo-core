import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";
import { throws } from "assert";

describe("KukuSwapPresale", function () {
    const userAddress = ethers.utils.getAddress(
        "0xe3905ED0fd3Fa86001ee98A01b32ab732e8E3c27"
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

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

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
});
