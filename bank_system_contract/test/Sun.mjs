import { expect } from 'chai'
import pkg from 'hardhat'
const { ethers } = pkg

describe("Sun Contract", function () {
  let token, universe, sun, owner, user1, user2
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners()
    // Deploy Token contract by owner
    const TokenContract = await ethers.getContractFactory("Star", owner)
    token = await TokenContract.deploy()
    await token.deployed()

    // Deploy Universe Contract by owner
    const UniverseContract = await ethers.getContractFactory("Universe", owner)
    universe = await UniverseContract.deploy(token.address)
    await universe.deployed()

    // Deploy Sun Contract by owner
    const SunContract = await ethers.getContractFactory("Sun", owner)
    sun = await SunContract.deploy(universe.address)
    await sun.deployed()
  })
  describe("Deploy", function () {
    it("should deploy the contract successfully", async function () {
      expect(sun.address).to.not.equal(ethers.constants.AddressZero)
    })

    it("should set the owner as an authorized user", async function () {
      expect(await sun.wards(owner.address)).to.equal(1)
    })

    it("should allow authorized users to rely and deny addresses", async function () {
      await sun.connect(owner).rely(user1.address)
      expect(await sun.wards(user1.address)).to.equal(1)

      await sun.connect(owner).deny(user1.address)
      expect(await sun.wards(user1.address)).to.equal(0)
    })
  })
  describe("Join AND Exit", function () {

    beforeEach(async function () {
      [owner, user1, user2] = await ethers.getSigners()
      // console.log("user1Address:" + user1.address)
      // Deploy Token contract by owner
      const TokenContract = await ethers.getContractFactory("Star", owner)
      token = await TokenContract.deploy()
      await token.deployed()

      // Mint token by owner
      await token.connect(owner).mint(owner.address, 100000)
      await token.connect(owner).mint(user1.address, 100000)

      // Deploy Universe Contract by owner
      const UniverseContract = await ethers.getContractFactory("Universe", owner)
      universe = await UniverseContract.deploy(token.address)
      await universe.deployed()

      // Deploy Sun Contract by user
      const SunContract = await ethers.getContractFactory("Sun", user1)
      sun = await SunContract.deploy(universe.address)
      await sun.deployed()
      // console.log("sunAddress:" + sun.address)
      await token.connect(owner).mint(sun.address, 100000)

      // user1 deposits 10000 tokens
      await token.connect(user1).approve(universe.address, 10000)
      await universe.connect(user1).deposit(user1.address, 10000)
    })
    it("should correctly calculate and transfer the saving reward", async function () {
      // user1 join 1000 tokens to benifit
      await sun.connect(user1).join(1000)

      await sun.accounts(user1.address)
      const user1UniverseStar = await universe.stars(user1.address)
      // console.log(user1UniverseStar)
      // wait one year
      await ethers.provider.send("evm_increaseTime", [31536000])
      await ethers.provider.send("evm_mine", [])

      // withdraw your reward
      await sun.drip(user1.address)
      const oneYearReward = await sun.reward()
      console.log(oneYearReward)

      expect(oneYearReward).to.be.closeTo(80, 1)

      // 检查账户余额是否正确
      const userBalance = await universe.stars(user1.address)
      expect(userBalance).to.be.closeTo(user1UniverseStar.add(oneYearReward), 1)

    })

    it("should correctly withdraw your saving", async function () {
      // console.log(await token.balanceOf(user1.address))
      // console.log(await universe.totalStars())
      // console.log(await universe.stars(user1.address))
      const saving = 1000
      // user1 join 1000 tokens to benifit
      await sun.connect(user1).join(saving)

      const user1UniverseStar = await universe.stars(user1.address)
      // console.log(user1UniverseStar)

      // withdraw your saving
      await sun.connect(user1).exit(saving)

      const userBalance = await universe.stars(user1.address)
      // console.log(userBalance)
      expect(userBalance).to.be.closeTo(user1UniverseStar.add(saving), 1)

    })
  })
  describe('file', () => {
    beforeEach(async function () {
      [owner, user1, user2] = await ethers.getSigners()
      // Deploy Token contract by owner
      const TokenContract = await ethers.getContractFactory("Star", owner)
      token = await TokenContract.deploy()
      await token.deployed()

      // Deploy Universe Contract by owner
      const UniverseContract = await ethers.getContractFactory("Universe", owner)
      universe = await UniverseContract.deploy(token.address)
      await universe.deployed()

      // Deploy Sun Contract by owner
      const SunContract = await ethers.getContractFactory("Sun", owner)
      sun = await SunContract.deploy(universe.address)
      await sun.deployed()
    })
    it('should update the ssr value when called by an authorized user', async () => {
      const newSsr = ethers.utils.parseUnits('1000000002474313312', 18)

      // 调用 file 函数,传入正确的 bytes32 和 uint256 参数
      await sun.connect(owner).file(ethers.utils.formatBytes32String('ssr'), newSsr)

      // 检查 ssr 值是否已更新
      expect(await sun.ssr()).to.equal(newSsr)
    })

    it('should revert if called by an unauthorized user', async () => {
      const newSsr = ethers.utils.parseUnits('1000000002474313312', 18)

      // 由普通用户 user1 调用 file 函数,应该会触发回滚
      await expect(sun.connect(user1).file(ethers.utils.formatBytes32String('ssr'), newSsr))
        .to.be.revertedWith('Pot/not-authorized')
    })

    it('should revert if the parameter is not recognized', async () => {
      // 尝试更新一个不存在的参数
      await expect(sun.connect(owner).file(ethers.utils.formatBytes32String('invalid_param'), 123))
        .to.be.revertedWith('Sun/file-unrecognized-param')
    })
  })
})