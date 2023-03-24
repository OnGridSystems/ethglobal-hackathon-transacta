const { ethers } = require("hardhat");
const {expect} = require("chai");

describe("ExampleNFT", () => {
    before(async () => {
        this.factory =await ethers.getContractFactory("ExampleNFT");
        this.contract = await  this.factory.deploy();
    });

    it("should give me token name", async () => {
        const name = await this.contract.name();
        expect(name).eq("Grizzly");
    });
});
