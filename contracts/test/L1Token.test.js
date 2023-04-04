const { ethers } = require("hardhat");
const {expect} = require("chai");

describe("L1Token", async () => {
    before(async () => {
        this.factory = await ethers.getContractFactory("L1Token");
        this.contract = await this.factory.deploy();
        this.signers = await ethers.getSigners(); 
        this.owner = this.signers[0];
    });

    it("should give me token name", async () => {
        const name = await this.contract.name();
        expect(name).eq("Grizzly");
    });

    it("should mint a token", async () => {
        const result = await this.contract.mint(this.owner.address);
        let balance = await this.contract.balanceOf(this.owner.address);
        let totalTokens = await this.contract.totalSupply();
        expect(balance).eq("1");
        expect(totalTokens).eq("1")
    }
    )
});
