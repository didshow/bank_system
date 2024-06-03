import { expect } from 'chai'
import pkg from 'hardhat'
const { ethers } = pkg

describe("Star Contract", function () {
  let owner, user1, user2, token

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners()

    // Deploy the Token contract
    const starContract = await ethers.getContractFactory("Star", owner)
    token = await starContract.deploy()
    await token.deployed()
  })

  describe("Mint", function () {
    it("Should mint tokens for the owner", async function () {
      await token.connect(owner).mint(owner.address, 100000)
      expect(await token.balanceOf(owner.address)).to.equal(100000)
    })

    it("Should mint tokens for user1", async function () {
      await token.connect(owner).mint(user1.address, 100000)
      expect(await token.balanceOf(user1.address)).to.equal(100000)
    })

    it("Should not allow non-authorized user to mint tokens", async function () {
      await expect(token.connect(user2).mint(user2.address, 100000)).to.be.revertedWith("Star/not-authorized")
    })
  })
  describe("Burn", function () {
    beforeEach(async function () {
      // Mint some tokens for testing
      await token.connect(owner).mint(owner.address, 100000)
      await token.connect(owner).mint(user1.address, 100000)
    })

    it("Should burn tokens for the owner", async function () {
      await token.connect(owner).burn(owner.address, 50000)
      expect(await token.balanceOf(owner.address)).to.equal(50000)
    })

    it("Should burn tokens for user1", async function () {
      await token.connect(owner).burn(user1.address, 50000)
      expect(await token.balanceOf(user1.address)).to.equal(50000)
    })

    it("Should not allow non-authorized user to burn tokens", async function () {
      await expect(token.connect(user2).burn(user2.address, 50000)).to.be.revertedWith("Star/not-authorized")
    })

    it("Should revert if trying to burn more than the account balance", async function () {
      await expect(token.connect(owner).burn(owner.address, 150000)).to.be.revertedWith("ERC20: burn amount exceeds balance")
    })
  })
})