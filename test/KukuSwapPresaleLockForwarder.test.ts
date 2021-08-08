import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";
import { throws } from "assert";

describe("KukuSwapPresaleLockForwarder", function () {
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

    const bnbToken = ethers.utils.getAddress(
        "0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c"
    );

    const lpToken = ethers.utils.getAddress(
        "0x126b1d5377f656a4a6861fb0393b1bbd1e67ce8d"
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

        this.wkcs = await ethers.getContractAt("IERC20Ext", wkcsToken);

        this.kuku = await ethers.getContractAt("IERC20Ext", kukuToken);

        this.bnb = await ethers.getContractAt("IERC20Ext", bnbToken);

        this.lpToken = await ethers.getContractAt("IERC20Ext", lpToken);

        this.Forwarder = await ethers.getContractFactory(
            "KukuSwapPresaleLockForwarder"
        );

        this.Factory = await ethers.getContractFactory("KukuSwapPresaleFactory");

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        // deploy contracts
        this.locker = await this.Locker.deploy();

        this.locker.initialize(kukuFactory);

        this.factory = await this.Factory.deploy();

        this.forwarder = await this.Forwarder.deploy();

        await this.factory.initialize();

        await this.forwarder.initialize(
            this.factory.address,
            this.locker.address,
            kukuFactory
        );

        this.presale = await ethers.getSigner(userAddress);

        this.generator = (await ethers.getSigners())[1];

        this.presaleOwner = (await ethers.getSigners())[2]
    });

    it("should lock liqiduity from presale for existing pair", async function () {
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);

        await this.factory
            .connect(this.generator)
            .registerPresale(this.presale.address, this.presaleOwner.address);

        await this.wkcs
            .connect(this.presale)
            .approve(this.forwarder.address, ethers.utils.parseEther("100"));
        await this.kuku
            .connect(this.presale)
            .approve(this.forwarder.address, ethers.utils.parseEther("100"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        expect(await this.locker.getNumLockedTokens()).to.be.equal(0);

        await this.forwarder
            .connect(this.presale)
            .lockLiquidity(
                this.wkcs.address,
                this.kuku.address,
                ethers.utils.parseEther("0.001"),
                ethers.utils.parseEther("100"),
                unlockBlockNumber,
                this.presaleOwner.address
            );

        expect(await this.locker.getNumLockedTokens()).to.be.equal(1);

        const lock = await this.locker.getUserLockForTokenAtIndex(
            this.presaleOwner.address,
            this.lpToken.address,
            0
        );

        expect(lock[1]).to.be.gte(0);
        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[5]).to.be.equal(this.presaleOwner.address);
        expect(await this.locker.getLockedTokenAtIndex(0)).to.be.equal(
            this.lpToken.address
        );
    });

    it("should lock liqiduity from presale for non-existing pair", async function () {
        await this.factory.adminAllowPresaleGenerator(this.generator.address, true);

        await this.locker.whitelistFeeAccount(this.forwarder.address, true);

        await this.factory
            .connect(this.generator)
            .registerPresale(this.presale.address, this.presaleOwner.address);

        await this.wkcs
            .connect(this.presale)
            .approve(this.forwarder.address, ethers.utils.parseEther("100"));
        await this.bnb
            .connect(this.presale)
            .approve(this.forwarder.address, ethers.utils.parseEther("100"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        expect(await this.locker.getNumLockedTokens()).to.be.equal(1);

        await this.forwarder
            .connect(this.presale)
            .lockLiquidity(
                this.wkcs.address,
                this.bnb.address,
                ethers.utils.parseEther("0.001"),
                ethers.utils.parseEther("0.001"),
                unlockBlockNumber,
                this.presaleOwner.address
            );

        expect(await this.locker.getNumLockedTokens()).to.be.equal(2);

        const lpToken = await this.locker.getLockedTokenAtIndex(1);

        const lock = await this.locker.getUserLockForTokenAtIndex(
            this.presaleOwner.address,
            lpToken,
            0
        );

        expect(lock[1]).to.be.gte(0);
        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[5]).to.be.equal(this.presaleOwner.address);
    });
});
