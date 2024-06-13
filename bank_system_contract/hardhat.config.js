require("@nomicfoundation/hardhat-toolbox")

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/**
  sepolia
    Star deployed to: 0xdab35e4F2a84ed3A7302D1F09EB9A3AB02B53fc7
    Universe deployed to: 0x258490069358bf1991d582b502125bBc04B3bE15
    Sun deployed to: 0xa72D4945AC628A1D2Df23Cd4638359075E026A72
 */
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    localhost: {
      url: "http://localhost:8545", // 本地节点的RPC URL
      accounts: ["0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"],
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/2614dccbff9e4817b9322ac078346aba", // Spolia测试网的Infura节点URL
      accounts: [process.env.PRIVATE_KEY],
      gas: 5500000
    }
  },

};

