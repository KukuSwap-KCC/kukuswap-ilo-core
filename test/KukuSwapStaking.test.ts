import { ethers } from "hardhat";
import { expect } from "chai";

describe("KukuSwapStaking", function () {
    before(async function () {
        this.KukuToken = await ethers.getContractFactory("ERC20Mock");
        this.WKCSToken = await ethers.getContractFactory("ERC20Mock");
        this.KukuSwapStaking = await ethers.getContractFactory("KukuSwapStaking");

        this.signers = await ethers.getSigners();
        this.alice = this.signers[0];
        this.bob = this.signers[1];
        this.carol = this.signers[2];
        this.minter = this.signers[3];
    });

    beforeEach(async function () {
        this.kuku = await this.KukuToken.deploy();
        this.WKCS = await this.WKCSToken.deploy();
        this.staking = await this.KukuSwapStaking.deploy();

        await this.staking.initialize(this.kuku.address, this.WKCS.address)

        await this.kuku.mint(this.alice.address, "1000");
        await this.kuku.mint(this.bob.address, "100");
        await this.kuku.mint(this.carol.address, "100");
        await this.WKCS.mint(this.minter.address, "1000");
        await this.staking.authorize(this.minter.address, true);
    });

    it("should not allow enter if not enough approve", async function () {
        await expect(this.staking.enter("100")).to.be.reverted;

        await this.kuku.approve(this.staking.address, "50");
        await expect(this.staking.enter("100")).to.be.reverted;

        await this.kuku.approve(this.staking.address, "100");
        await this.staking.enter("100");
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("100");
    });

    it("should not allow create distribution from non-authirized", async function () {
        await expect(this.staking.connect(this.bob).createDistribution("100")).to.be.revertedWith(
            "KukuSwap Staking: not authorized user"
        );
    });

    it("should only owner cor authorized can authorize address", async function () {
        await expect(this.staking.connect(this.bob).authorize(this.bob.address, true)).to.be.revertedWith(
            "KukuSwap Staking: not authorized user"
        );
    });

    it("should authorized can authorize new address", async function () {
        await this.staking.authorize(this.bob.address, true);
        await this.staking.connect(this.bob).authorize(this.carol.address, true)
    });

    it("should not allow withraw more than what you have", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.staking.enter("100");
        await expect(this.staking.leave("200")).to.be.revertedWith(
            "ERC20: burn amount exceeds balance"
        );
    });

    it("should work with more than one participant", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.kuku
            .connect(this.bob)
            .approve(this.staking.address, "100", { from: this.bob.address });
        // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
        await this.staking.enter("20");
        await this.staking.connect(this.bob).enter("10", { from: this.bob.address });
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("20");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        expect(await this.kuku.balanceOf(this.staking.address)).to.equal("30");
        // KukuSwapStaking get 20 more KUKUs from an external source.
        await this.kuku
            .connect(this.carol)
            .transfer(this.staking.address, "20", { from: this.carol.address });
        // Alice deposits 10 more KUKUs. She should receive 10*30/50 = 6 shares.
        await this.staking.enter("10");
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("26");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        // Bob withdraws 5 shares. He should receive 5*60/36 = 8 shares
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("26");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("5");
        expect(await this.kuku.balanceOf(this.staking.address)).to.equal("52");
        expect(await this.kuku.balanceOf(this.alice.address)).to.equal("970");
        expect(await this.kuku.balanceOf(this.bob.address)).to.equal("98");
    });

    it("should create distribution from minter", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.staking.enter("20");
        await this.WKCS.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });
        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });

        const lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        const distribution = await this.staking.distributions(lastDistributionIndex);

        const shares = await this.staking.shares(
            lastDistributionIndex,
            this.alice.address
        );

        expect(shares).to.equal("20");
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal("20");

        expect(await this.WKCS.balanceOf(this.staking.address)).to.equal("100");
    });

    it("should claim more than one distribution with more than one stake", async function () {
        await this.kuku.approve(this.staking.address, "200");
        await this.staking.enter("20");
        await this.WKCS.connect(this.minter).approve(this.staking.address, "300", {
            from: this.minter.address,
        });

        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });
        let lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        let distribution = await this.staking.distributions(lastDistributionIndex);
        let shares = await this.staking.shares(
            lastDistributionIndex,
            this.alice.address
        );

        expect(shares).to.equal("20");
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal("20");

        expect(await this.WKCS.balanceOf(this.staking.address)).to.equal("100");

        await this.staking.leave("10");
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("100");

        await this.staking.leave("10");
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("100");

        await this.staking.enter("80");

        await this.staking
            .connect(this.minter)
            .createDistribution("200", { from: this.minter.address });

        lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("2");
        distribution = await this.staking.distributions(lastDistributionIndex);
        shares = await this.staking.shares(lastDistributionIndex, this.alice.address);
        expect(shares).to.equal("80");
        expect(distribution.amount).to.equal("200");
        expect(distribution.shares).to.equal("80");
        await this.staking.enter("100");

        lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("2");
        distribution = await this.staking.distributions(lastDistributionIndex);
        shares = await this.staking.shares(
            lastDistributionIndex.add("1"),
            this.alice.address
        );
        expect(shares).to.equal("180");
        expect(distribution.amount).to.equal("200");
        expect(distribution.shares).to.equal("80");
        
        expect(await this.staking.getRewardsAmount(this.alice.address)).to.equal("200");
        expect(await this.staking.getStakingAmount(this.alice.address)).to.equal("180");
       

        await this.staking.transfer(this.bob.address, "90")

        expect(await this.staking.shares(
            lastDistributionIndex.add("1"),
            this.alice.address)).to.equal("90")
        
        expect(await this.staking.shares(
                lastDistributionIndex.add("1"),
                this.bob.address)).to.equal("90")
        

        await this.staking.leave("10");
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("300");
        
        await this.staking.leave("10");
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("300");      
        
    });

    it("should claim one distribution with more than one participant", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.kuku
            .connect(this.bob)
            .approve(this.staking.address, "100", { from: this.bob.address });
        // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
        await this.staking.enter("20");
        await this.staking.connect(this.bob).enter("10", { from: this.bob.address });
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("20");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        expect(await this.kuku.balanceOf(this.staking.address)).to.equal("30");
        // KukuSwapStaking get 20 more KUKUs from an external source.
        await this.kuku
            .connect(this.carol)
            .transfer(this.staking.address, "20", { from: this.carol.address });
        // Alice deposits 10 more KUKUs. She should receive 10*30/50 = 6 shares.
        await this.staking.enter("10");
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("26");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        await this.WKCS.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });
        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });
        const lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        const distribution = await this.staking.distributions(lastDistributionIndex);
        const totalShares = await this.staking.totalSupply();
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal(totalShares);
        //Alica shares in 1 distribution 26
        const aliceShares = await this.staking.shares(
            lastDistributionIndex,
            this.alice.address
        );
        expect(aliceShares).to.equal("26");
        //Bob shares in 1 distribution 10
        const bobShares = await this.staking.shares(
            lastDistributionIndex,
            this.bob.address
        );
        expect(bobShares).to.equal("10");
        // alice get 26 shares * 100 / 36 = 72 WKCS
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("72");
        // 0
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("72");
        //bob get 10 * 100 / 36 27 WKCS
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("27");
        //0
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("27");
    });

    it("should claim one distribution with more than one participant", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.kuku
            .connect(this.bob)
            .approve(this.staking.address, "100", { from: this.bob.address });
        // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
        await this.staking.enter("20");
        await this.staking.connect(this.bob).enter("10", { from: this.bob.address });
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("20");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        expect(await this.kuku.balanceOf(this.staking.address)).to.equal("30");
        // KukuSwapStaking get 20 more KUKUs from an external source.
        await this.kuku
            .connect(this.carol)
            .transfer(this.staking.address, "20", { from: this.carol.address });
        // Alice deposits 10 more KUKUs. She should receive 10*30/50 = 6 shares.
        await this.staking.enter("10");
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("26");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        await this.WKCS.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });
        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });
        const lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        const distribution = await this.staking.distributions(lastDistributionIndex);
        const totalShares = await this.staking.totalSupply();
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal(totalShares);
        //Alica shares in 1 distribution 26
        const aliceShares = await this.staking.shares(
            lastDistributionIndex,
            this.alice.address
        );
        expect(aliceShares).to.equal("26");
        //Bob shares in 1 distribution 10
        const bobShares = await this.staking.shares(
            lastDistributionIndex,
            this.bob.address
        );
        expect(bobShares).to.equal("10");
        // alice get 26 shares * 100 / 36 = 72 WKCS
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("72");
        // 0
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("72");
        //bob get 10 * 100 / 36 27 WKCS
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("27");
        //0
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("27");
    });

    it("should claim  more 1 distribution with more than one participant from previous stake", async function () {
        await this.kuku.approve(this.staking.address, "100");
        await this.kuku
            .connect(this.bob)
            .approve(this.staking.address, "100", { from: this.bob.address });
        // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
        await this.staking.enter("20");
        await this.staking.connect(this.bob).enter("10", { from: this.bob.address });
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("20");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");
        expect(await this.kuku.balanceOf(this.staking.address)).to.equal("30");
        // KukuSwapStaking get 20 more KUKUs from an external source.
        await this.kuku
            .connect(this.carol)
            .transfer(this.staking.address, "20", { from: this.carol.address });
        // Alice deposits 10 more KUKUs. She should receive 10*30/50 = 6 shares.
        await this.staking.enter("10");
        expect(await this.staking.balanceOf(this.alice.address)).to.equal("26");
        expect(await this.staking.balanceOf(this.bob.address)).to.equal("10");

        await this.WKCS.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });
        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });

        let lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("1");
        let distribution = await this.staking.distributions(lastDistributionIndex);
        let totalShares = await this.staking.totalSupply();
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal(totalShares);

        //Alica shares in 1 distribution 26
        const aliceShares = await this.staking.shares(
            lastDistributionIndex,
            this.alice.address
        );
        expect(aliceShares).to.equal("26");
        //Bob shares in 1 distribution 10
        const bobShares = await this.staking.shares(
            lastDistributionIndex,
            this.bob.address
        );
        expect(bobShares).to.equal("10");

        //create 2 distribution
        await this.WKCS.connect(this.minter).approve(this.staking.address, "100", {
            from: this.minter.address,
        });
        await this.staking
            .connect(this.minter)
            .createDistribution("100", { from: this.minter.address });

        lastDistributionIndex = await this.staking.lastDistributionIndex();
        expect(lastDistributionIndex).to.equal("2");
        distribution = await this.staking.distributions(lastDistributionIndex);
        totalShares = await this.staking.totalSupply();
        expect(distribution.amount).to.equal("100");
        expect(distribution.shares).to.equal(totalShares);

        expect(await this.staking.getRewardsAmount(this.alice.address)).to.equal("144");

        // Alice get 26 shares * 100 / 36 = 72 WKCS
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("144");

        // 0
        await this.staking
            .connect(this.alice)
            .leave("13", { from: this.alice.address });
        expect(await this.WKCS.balanceOf(this.alice.address)).to.equal("144");

        //Bob get 10 * 100 / 36 27 WKCS
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("54");
        //0
        await this.staking.connect(this.bob).leave("5", { from: this.bob.address });
        expect(await this.WKCS.balanceOf(this.bob.address)).to.equal("54");
    });
});
