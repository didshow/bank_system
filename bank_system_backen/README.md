# Bank Backen

银行系统后端
-直接存款不会计算利息，需要将钱放进Sun账户才能计算利息
-体现在用户必须点击saving按钮来将Star(token)存入Sun账户

## 项目运行

1. 安装依赖

```
npm install
```

2. 运行

```
npm run start
```

3. 访问

```
http://127.0.0.1:3001
```

## 项目功能介绍

### 存款 deposit

将自己的钱存入Universe
// 1.用户的地址对Universe的地址进行Approve(solidity里的deposit已经实现了)
// 2.判断账户是否为ERC20地址以及是否有足够的Star
// 2.调用universe.deposit存款

### 取款 withdraw

从Universe取出钱到自己账户

### 定期存款 saving

将Star存入Sun账户

### 提取利息 drip

从Sun账户中取出利息

### 取消定期存款 cancelSaving

取消定期存款

### 查询账户余额 getBalance

### 测试地址

Star: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
Sun: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
Universe: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
Deploy_Hardhat_Account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Test_Hardhat_Account: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30


