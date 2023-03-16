const { ethers } = require("hardhat");
const { describe } = require("mocha");
const {expect} = require("chai");

describe("L1Token", () => {
    before(async () => {
        this.factory =await ethers.getContractFactory("L1Token");
        this.contract = await  this.factory.deploy();
    });

    it("should give me token name", async () => {
        const name = await this.contract.name();
        expect(name).eq("Grizzly");
    });
});
