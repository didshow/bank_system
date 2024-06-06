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
// 1. 用户approve Universe(solidity里的saving已经实现了)
// 2. 获取当前账户的地址（在前端获取后端获取都可以）
// 3. 判断账户在Universe里的存款是否大于transactionAmount
// 4. 调用universe.saving存定期

### 提取利息 drip

从Sun账户中取出利息

### 取消定期存款 cancelSaving

取消定期存款

### 实时查询账户余额 getBalance

包含实时计算的利息和银行里面的余额

### 测试地址

Star: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Sun: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
Universe: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Deploy_Hardhat_Account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266  项目投资方（owner）
Test_Hardhat_Account: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30


