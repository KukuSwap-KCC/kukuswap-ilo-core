import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";

describe("KukuSwapPresale User Operation - Success Presale", function () {
    const userAddress = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
    );

    const kukuGenerator = ethers.utils.getAddress(
        "0x3c9288772e34C6921c1Aec34177e217AC5B06c79"
    );

    const kukuFactory = ethers.utils.getAddress(
        "0x2458884038099730e74D71111c40601bd09Ca1DD"
    );

    const kukuSettings = ethers.utils.getAddress(
        "0xE8c49Fc14d091928C8bb516A7a4eF4D3a136b7A5"
    );

    const kukuStaking = ethers.utils.getAddress(
        "0x85c68f64330816399158f405a8ea083a3e21f284"
    );

    const wkcsToken = ethers.utils.getAddress(
        "0x4446fc4eb47f2f6586f9faab68b3498f86c07521"
    );

    const kukuToken = ethers.utils.getAddress(
        "0x1542c99cb3133fa187761ab2c07fbf72be287524"
    );

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const holderBNB = ethers.utils.getAddress(
        "0x4db6719dba90224b2ff1ce2b4ae442ac9c374db8"
    );

    const owner = ethers.utils.getAddress(
        "0x8F294BbD5E14D86E4C380f9451c5c75be8764141"
    );

    const kukuLocker = ethers.utils.getAddress(
        "0xf4d9c9F4b47744801494ecd674A999Ae4b1D8C15"
    );

    const kukuHolder = ethers.utils.getAddress(
        "0x9280E3Eb147027FC04d4805f21D629eBCf305493"
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
            params: [owner],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [kukuHolder],
        });

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

     
 
        //generator
        this.generator = await ethers.getContractAt('KukuSwapPresaleGenerator', kukuGenerator);

        //Settings
        this.settings = await ethers.getContractAt('KukuSwapPresaleSettings', kukuSettings);
        
        //Kuku Factory
        this.factory = await ethers.getContractAt('KukuSwapPresaleFactory', kukuFactory);

        this.staking = await ethers.getContractAt('KukuSwapStaking', kukuStaking);
        
        //locker
        this.locker = await ethers.getContractAt('KukuSwapLocker', kukuLocker);

        //Kuku
        //presale owner
        this.presaleOwner = await ethers.getSigner(userAddress);

        this.bnbHolder = await ethers.getSigner(holderBNB);

        this.owner = await ethers.getSigner(owner);

        this.kukuHolder = await ethers.getSigner(kukuHolder);

        await this.bnb
            .connect(this.bnbHolder)
            .transfer(this.presaleOwner.address, ethers.utils.parseEther("500"));

        this.investor = (await ethers.getSigners())[1];

        this.investor2 = (await ethers.getSigners())[2];

    })

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
        const endBlock = (await ethers.provider.getBlockNumber()) + 1500;

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
                    ethers.utils.parseEther("0.05"), //hard cap
                    ethers.utils.parseEther("0.01"), //soft cap
                    600, //liquidity percent 60
                    ethers.utils.parseEther("100"), //listing rate
                    startBlock, //start block
                    endBlock, //end block
                    1200, //lock period
                ],
                true
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
        expect(presaleInfo.HARDCAP).to.be.equal(ethers.utils.parseEther("0.05"));
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

        for (let i = 0; i < 30; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        
        const holderBalance = await this.kukuHolder.getBalance();

        //kuku holder
        await presale
            .connect(this.kukuHolder)
            .userDeposit(0, { value: ethers.utils.parseEther("0.01") });


        let status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.01")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("1"));
        expect(await this.kukuHolder.getBalance()).to.be.equal(
            holderBalance.sub(ethers.utils.parseEther("0.01"))
        );


        await expect(
            presale
                .connect(this.investor)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("INSUFFICENT ROUND 1 TOKEN BALANCE");



        await expect(
            presale
                .connect(this.investor2)
                .userDeposit(0, { value: ethers.utils.parseEther("0.01") })
        ).to.be.revertedWith("INSUFFICENT ROUND 1 TOKEN BALANCE");



        for (let i = 0; i < 1300; i++) {
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

        status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.02")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("2"));
        expect(await this.investor.getBalance()).to.be.equal(
            userBalance1.sub(ethers.utils.parseEther("0.01"))
        );

        //await presale
        //    .connect(this.investor)
        //    .userDeposit(0, { value: ethers.utils.parseEther("0.01") });

        //investor 2
        const userBalance2 = await this.investor2.getBalance();
        await presale
            .connect(this.investor2)
            .userDeposit(0, { value: ethers.utils.parseEther("1") });

        status = await presale.STATUS();

        expect(status.TOTAL_BASE_COLLECTED).to.be.equal(
            ethers.utils.parseEther("0.03")
        );
        expect(status.TOTAL_TOKENS_SOLD).to.be.equal(ethers.utils.parseEther("3"));
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

        for (let i = 0; i < 1500; i++) {
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
    });
})