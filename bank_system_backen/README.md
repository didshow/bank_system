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
// 1.判断账户是否有足够的Star Token，需要用到Star中的balanceOf 
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
