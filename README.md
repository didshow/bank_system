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

配置的合约地址在bank_system_contract 里的deploy.js，已经部署在sepolia测试网上

