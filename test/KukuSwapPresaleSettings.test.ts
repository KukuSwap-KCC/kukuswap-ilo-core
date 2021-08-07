import { ethers, network } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";

describe("KukuSwapPresaleSettings", function () {
    before(async function () {

        await network.provider.request({
            method: "hardhat_reset",
            params: [],
        });

        this.Settings = await ethers.getContractFactory("KukuSwapPresaleSettings");
        this.KukuToken = await ethers.getContractFactory("ERC20Mock");

        this.signers = await ethers.getSigners();
        this.owner = this.signers[0];
        this.user = this.signers[1];
        this.staking = this.signers[2];
    });

    beforeEach(async function () {
        this.settings = await this.Settings.deploy(this.staking.address);
        this.kuku = await this.KukuToken.deploy();

        await this.kuku.mint(this.owner.address, "1000");
        await this.kuku.mint(this.user.address, "10");
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

    it("should not be manage from no owner address", async function () {
        await expect(
            this.settings.connect(this.user).setFeeAddress(this.staking.address)
        ).to.be.revertedWith("Ownable: caller is not the owner");
        await expect(this.settings.connect(this.user).setFee(50)).to.be.revertedWith(
            "Ownable: caller is not the owner"
        );
        await expect(
            this.settings.connect(this.user).setRound1Length(1200)
        ).to.be.revertedWith("Ownable: caller is not the owner");
        await expect(
            this.settings.connect(this.user).setMaxPresaleLength(93046)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should be manage from owner address", async function () {
        await this.settings.connect(this.owner).setFeeAddress(this.staking.address);
        await this.settings.connect(this.owner).setFee(55);
        await this.settings.connect(this.owner).setRound1Length(1205);
        await this.settings.connect(this.owner).setMaxPresaleLength(93051);

        expect(await this.settings.getStakingAddress()).to.be.equal(
            this.staking.address
        );
        expect(await this.settings.getBaseFee()).to.be.equal(55);
        expect(await this.settings.getRound1Length()).to.be.equal(1205);
        expect(await this.settings.getMaxPresaleLength()).to.be.equal(93051);
    });

    it("should not be edited early access tokens from no owner address", async function () {
        await expect(
            this.settings
                .connect(this.user)
                .editEarlyAccessTokens(this.kuku.address, 100, true)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should  be edited early access tokens from owner address", async function () {
        this.settings
            .connect(this.owner)
            .editEarlyAccessTokens(this.kuku.address, 100, true);

        expect(await this.settings.earlyAccessTokensLength()).to.be.equal(1);

        let [token, holdAmount]: Address[] =
            await this.settings.getEarlyAccessTokenAtIndex(0);

        expect(token).to.be.equal(this.kuku.address);
        expect(holdAmount).to.be.equal(100);
    });

    it("should corrent return if user holds sufficient Round1 token", async function () {
        this.settings
            .connect(this.owner)
            .editEarlyAccessTokens(this.kuku.address, 100, true);

        expect(await this.settings.earlyAccessTokensLength()).to.be.equal(1);
        let [token, holdAmount]: Address[] =
            await this.settings.getEarlyAccessTokenAtIndex(0);

        expect(token).to.be.equal(this.kuku.address);
        expect(holdAmount).to.be.equal(100);

        expect(
            await this.settings.userHoldsSufficientRound1Token(this.owner.address)
        ).to.be.equal(true);
        expect(
            await this.settings.userHoldsSufficientRound1Token(this.user.address)
        ).to.be.equal(false);
    });
});
