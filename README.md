# bank_system

## 项目介绍

基于智能合约的银行储蓄系统
核心功能是:
存款(deposit)、取款(withdraw)、计息存款(saving)、取出本金[这里是取出saving里的balance]、查询余额

后端使用express.js：localhost:3001
前端使用react.js：localhost:3000
合约使用hardhat：localhost:8545

## 运行步骤

node.js版本：16.20.0

1.运行hardhat节点

切换到合约路径
```
`npm install hardhat`
`npx hardhat node`
```
2.运行后端
```
`npm install`
`npm  run start`
```
3.运行前端
```
`npm install`
`npm run start`
```
## 配置相关

部署合约地址
1.sepolia测试链
    Star deployed to: 0xdab35e4F2a84ed3A7302D1F09EB9A3AB02B53fc7
    Universe deployed to: 0x258490069358bf1991d582b502125bBc04B3bE15
    Sun deployed to: 0xa72D4945AC628A1D2Df23Cd4638359075E026A72
2.hardhat
    UNI_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    STAR_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
    SUN_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
