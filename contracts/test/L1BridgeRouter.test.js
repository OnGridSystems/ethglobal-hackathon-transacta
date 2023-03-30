const { ethers } = require("hardhat");
const { expect } = require("chai");

const TOKEN_ID = 0;
const L2_NETWORK_ID = 125;

describe("L1BridgeRouter", () => {
  beforeEach(async () => {
    this.signers = await ethers.getSigners();
    this.deployer = this.signers[0];
    this.tokenFactory = await ethers.getContractFactory("ExampleNFT");
    this.token = await this.tokenFactory.deploy();
    this.bridgeFactory = await ethers.getContractFactory("L1BridgeRouter");
    this.bridge = await this.bridgeFactory.deploy(this.token.address);
    await this.token.mint(this.deployer.address);
  });

  it("bridge and token are connected", async () => {
    expect(await this.bridge.token()).eq(this.token.address);
  });

  describe("Bridge to L2", () => {
    beforeEach(async () => {
      await this.token.approve(this.bridge.address, TOKEN_ID);
      await this.bridge.bridgeToL2(L2_NETWORK_ID, TOKEN_ID);
    });

    it("token got withdrawn to BridgeRouter", async () => {
      expect(await this.token.ownerOf(TOKEN_ID)).eq(this.bridge.address);
    });

    describe("Unbridge back from L2", () => {
      beforeEach(async () => {
        await this.bridge.unbridge(TOKEN_ID, this.deployer.address);
      });

      it("token got released", async () => {
        expect(await this.token.ownerOf(TOKEN_ID)).eq(this.deployer.address);
      });
    });
  });
});
