import { ethers, network, waffle } from "hardhat";
import { expect } from "chai";
import { throws } from "assert";
import { timeEnd } from "console";

describe("KukuSwapLocker", function () {
    const userAddress = ethers.utils.getAddress(
        "0xe3905ED0fd3Fa86001ee98A01b32ab732e8E3c27"
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

        this.Locker = await ethers.getContractFactory("KukuSwapLocker");

        this.lpToken = await ethers.getContractAt(
            "IERC20Ext",
            ethers.utils.getAddress("0x126b1d5377f656a4a6861fb0393b1bbd1e67ce8d")
        );

        this.user = await ethers.getSigner(userAddress);

        this.user2 = (await ethers.getSigners())[1];

        this.locker = await this.Locker.deploy(
            ethers.utils.getAddress("0x852ead547a013cc1e35ee41454af7a8d75a7b49d")
        ); //Kuku Factory

        this.balance = await this.lpToken.balanceOf(this.user.address);
    });

    it("should have correct default settings", async function () {
        expect(await this.locker.kukuswapFactory()).to.be.equal(
            ethers.utils.getAddress("0x852ead547a013cc1e35ee41454af7a8d75a7b49d")
        );
    });

    it("should lock lp token", async function () {
        await this.locker.whitelistFeeAccount(this.user.address, true);

        await this.lpToken
            .connect(this.user)
            .approve(this.locker.address, ethers.utils.parseEther("10000000"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        await this.locker
            .connect(this.user)
            .lockLPToken(
                this.lpToken.address,
                this.balance,
                unlockBlockNumber,
                false,
                this.user.address
            );

        const lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(this.balance);

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(1);

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(0);
    });

    it("should not withdraw before lock block", async function () {
        await expect(
            this.locker
                .connect(this.user)
                .withdraw(this.lpToken.address, 0, 0, this.balance)
        ).to.be.revertedWith("NOT YET");
    });

    it("should withdraw only after lock block", async function () {
        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(1);

        for (let i = 0; i < 120; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await this.locker
            .connect(this.user)
            .withdraw(this.lpToken.address, 0, 0, this.balance);

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(
            this.balance
        );

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(0);
    });

    it("should relock lp", async function () {
        await this.locker.whitelistFeeAccount(this.user.address, true);

        await this.lpToken
            .connect(this.user)
            .approve(this.locker.address, ethers.utils.parseEther("10000000"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        await this.locker
            .connect(this.user)
            .lockLPToken(
                this.lpToken.address,
                this.balance,
                unlockBlockNumber,
                false,
                this.user.address
            );

        let lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(this.balance);
        expect(lock[4]).to.be.equal(1);

        const unlockBlockNumber1 = unlockBlockNumber + 20;

        await this.locker
            .connect(this.user)
            .relock(this.lpToken.address, 0, 1, unlockBlockNumber1);

        lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber1);
        expect(lock[1]).to.be.equal(this.balance);

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await this.locker
            .connect(this.user)
            .withdraw(this.lpToken.address, 0, 1, this.balance);

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(
            this.balance
        );

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(0);
    });

    it("should increase lock lp", async function () {
        await this.locker.whitelistFeeAccount(this.user.address, true);

        await this.lpToken
            .connect(this.user)
            .approve(this.locker.address, ethers.utils.parseEther("10000000"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        await this.locker
            .connect(this.user)
            .lockLPToken(
                this.lpToken.address,
                ethers.utils.parseEther("1"),
                unlockBlockNumber,
                false,
                this.user.address
            );

        let lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(ethers.utils.parseEther("1"));
        expect(lock[4]).to.be.equal(2);

        await this.locker
            .connect(this.user)
            .incrementLock(
                this.lpToken.address,
                0,
                2,
                await this.lpToken.balanceOf(this.user.address)
            );

        lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(this.balance);
        expect(lock[4]).to.be.equal(2);
        expect(lock[2]).to.be.equal(ethers.utils.parseEther("1"));

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await this.locker
            .connect(this.user)
            .withdraw(this.lpToken.address, 0, 2, this.balance);

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(
            this.balance
        );

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(0);
    });

    it("should split lock lp", async function () {
        await this.locker.whitelistFeeAccount(this.user.address, true);

        await this.lpToken
            .connect(this.user)
            .approve(this.locker.address, ethers.utils.parseEther("10000000"));

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        await this.locker
            .connect(this.user)
            .lockLPToken(
                this.lpToken.address,
                this.balance,
                unlockBlockNumber,
                false,
                this.user.address
            );

        let lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(this.balance);
        expect(lock[4]).to.be.equal(3);

        await this.locker
            .connect(this.user)
            .splitLock(this.lpToken.address, 0, 3, ethers.utils.parseEther("1"));

        lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(this.balance.sub(ethers.utils.parseEther("1")));
        expect(lock[4]).to.be.equal(3);

        lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            1
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);
        expect(lock[1]).to.be.equal(ethers.utils.parseEther("1"));
        expect(lock[4]).to.be.equal(4);

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await this.locker
            .connect(this.user)
            .withdraw(
                this.lpToken.address,
                0,
                3,
                this.balance.sub(ethers.utils.parseEther("1"))
            );

        await this.locker
            .connect(this.user)
            .withdraw(this.lpToken.address, 0, 4, ethers.utils.parseEther("1"));

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(
            this.balance
        );

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(0);
    });

    it("should lock lp token with fee", async function () {
        await this.locker.whitelistFeeAccount(this.user.address, false);

        await this.lpToken
            .connect(this.user)
            .approve(this.locker.address, ethers.utils.parseEther("10000000"));

        await this.locker.setDev(this.user2.address);

        const unlockBlockNumber = (await ethers.provider.getBlockNumber()) + 100;

        await this.locker
            .connect(this.user)
            .lockLPToken(
                this.lpToken.address,
                this.balance,
                unlockBlockNumber,
                true,
                this.user.address,
                { value: ethers.utils.parseEther("0.01") }
            );

        const lock = await this.locker.getUserLockForTokenAtIndex(
            this.user.address,
            this.lpToken.address,
            0
        );

        expect(lock[3]).to.be.equal(unlockBlockNumber);

        expect(lock[1]).to.be.lte(this.balance);

        expect(
            await this.locker.getUserNumLocksForToken(
                this.user.address,
                this.lpToken.address
            )
        ).to.be.equal(1);

        expect(await this.lpToken.balanceOf(this.user.address)).to.be.equal(0);

        expect(await this.lpToken.balanceOf(this.user2.address)).to.be.gte(0);

        expect(await this.user2.getBalance()).to.be.gte(0);
    });

    it("should transfer ownerhip of locks", async function () {
        await this.locker
            .connect(this.user)
            .transferLockOwnership(this.lpToken.address, 0, 5, this.user2.address);

        const lock = await this.locker.getUserLockForTokenAtIndex(
            this.user2.address,
            this.lpToken.address,
            0
        );

        for (let i = 0; i < 200; i++) {
            await network.provider.request({
                method: "evm_mine",
                params: [],
            });
        }

        await this.locker
            .connect(this.user2)
            .withdraw(this.lpToken.address, 0, 5, lock[1]);

        expect(await this.lpToken.balanceOf(this.user2.address)).to.be.equal(
            this.balance
        );
    });
});
