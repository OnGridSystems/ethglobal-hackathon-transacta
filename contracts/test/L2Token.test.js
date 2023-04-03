const { ethers } = require("hardhat");
const {expect} = require("chai");

describe("L2Token", async () => {
    before(async () => {
        this.factory = await ethers.getContractFactory("L2Token");
        this.contract = await this.factory.deploy();
        this.signers = await ethers.getSigners(); 
        this.owner = this.signers[0];
    });

    it("should mint a token", async () => {
        const result = await this.contract.mint(this.owner.address);
        let balance = await this.contract.balanceOf(this.owner.address);
        let totalTokens = await this.contract.totalSupply();
        expect(balance).eq("1");
        expect(totalTokens).eq("1")
    }
    );

    it("should burn a token", async () => {
        const result = await this.contract.mint(this.owner.address);
        let balance = await this.contract.balanceOf(this.owner.address);
        let totalTokens = await this.contract.totalSupply();
        expect(balance).eq("2");
        expect(totalTokens).eq("2")
        await this.contract.burn(result.value);
        balance = await this.contract.balanceOf(this.owner.address);
        totalTokens = await this.contract.totalSupply();
        expect(balance).eq("1");
        expect(totalTokens).eq("1")
    }
    )
});
