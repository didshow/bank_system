import { expect } from 'chai'
import pkg from 'hardhat'
const { ethers } = pkg

describe("Universe Contract", function () {
  let universe, token, owner, user1, user2

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners()
    // Deploy the Token contract
    const TokenContract = await ethers.getContractFactory("Star", owner)
    token = await TokenContract.deploy()

    //Mint token
    await token.connect(owner).mint(owner.address, 10000)
    await token.connect(owner).mint(user1.address, 10000)

    // Deploy the Universe contract
    const universeContract = await ethers.getContractFactory("Universe", owner)
    universe = await universeContract.deploy(token.address)
  })

  it("should deposit and withdraw stars correctly", async function () {
    await token.connect(user1).approve(universe.address, 1000)
    await universe.connect(user1).deposit(user1.address, 1000)
    expect(await universe.stars(user1.address)).to.equal(1000)
    expect(await universe.totalStars()).to.equal(1000)

    await universe.connect(user1).withdraw(user1.address, user1.address, 500)
    expect(await universe.stars(user1.address)).to.equal(500)
    expect(await universe.totalStars()).to.equal(500)
  })

  it("should transfer stars correctly", async function () {
    await token.connect(user1).approve(universe.address, 1000)
    await universe.connect(user1).deposit(user1.address, 1000)
    await universe.connect(user1).transfer(user1.address, user2.address, 500)
    expect(await universe.stars(user1.address)).to.equal(500)
    expect(await universe.stars(user2.address)).to.equal(500)
  })

  it("should add and move reserves correctly", async function () {
    await token.connect(owner).approve(universe.address, 1000)
    await universe.connect(owner).deposit(owner.address, 1000)
    await universe.connect(owner).addReserves(500)
    expect(await universe.reserve()).to.equal(500)
    expect(await universe.stars(owner.address)).to.equal(500)

    await universe.connect(owner).moveResrves(user1.address, 300)
    expect(await universe.reserve()).to.equal(200)
    expect(await universe.stars(user1.address)).to.equal(300)
  })
})
