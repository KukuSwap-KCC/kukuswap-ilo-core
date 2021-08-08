import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";

describe("KukuSwapPresaleFactory", function () {
    before(async function () {
        await network.provider.request({
            method: "hardhat_reset",
            params: [],
        });

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.generator = (await ethers.getSigners())[1];

        this.presale = (await ethers.getSigners())[2];
    });

    beforeEach(async function () {
        this.factory = await this.Factory.deploy();
    });

    it("should allow admin access for presale generator", async function () {
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        expect(await this.factory.presaleGeneratorsLength()).to.be.equal(1);

        expect(await this.factory.presaleGeneratorAtIndex(0)).to.be.equal(
            this.generator.address
        );
    });

    it("should not allow admin access for presale generator from non-owner", async function () {
        await expect(
            this.factory
                .connect(this.generator)
                .adminAllowPresaleGenerator(this.generator.address, true)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should register presale from authorized presale generator", async function () {
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.factory
            .connect(this.generator)
            .registerPresale(this.presale.address);

        expect(
            await this.factory.presaleIsRegistered(this.presale.address)
        ).to.be.equal(true);

        expect(await this.factory.presalesLength()).to.be.equal(1);
    });

    it("should not register presale from regular user", async function () {
        await expect(
            this.factory.connect(this.presale).registerPresale(this.presale.address)
        ).to.be.revertedWith("FORBIDDEN");
    });
});
