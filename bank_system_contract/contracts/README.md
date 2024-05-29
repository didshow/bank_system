# Universe Bank 储蓄合约

Universe Bank 由三个模块组成

- Stars Module
- Bank Module
- Saving Module

## Star Module

stars Module 只有一个合约:star.sol, 该合约符合 ERC20 代币标准。

star 是 Universe 的发行的代币，使用 star 能够参与项目业务

### 全局变量

`name` - Star

`symbol` - STA

`version` - 1

`decimals` - 18

## Bank Module

Bank Module 包括有一个合约:universe.sol，该合约用于管理用户的银行账户，实现了银行存款、取款、转账的业务逻辑。

### **全局变量**

`stars` - 用户的余额

`token` - stars 的地址

`totalStars` - 银行的总存储金额 = 储备金 + 所有账户的金额

`reserve` - 银行的储备金，用于向储蓄用户支付利息或银行的其他支出

### **事件**

`Deposit` -存款

`Withdraw` -取款

`AddResrves` - 添加储备金

`MoveResrves` - 转移储备金

`Transfer` - 转账

### 银行业务

#### 存款与取款

用户通过转移 star 在银行存取款，用户能调用银行的三个基础业务：存款、取款、转账。

**存款**

1. 用户将 star 转移到银行地址
2. 银行为用户指定地址存款
3. 银行总存储金增加
4. 触发存款事件

**转账**

用户账户是在银行账户之间进行的

1. 检查用户是否有账户的授权
2. 检查用户是否有足够金额
3. 用户金额减少，到账方金额增加
4. 触发转账事件

#### 银行储备金

银行储备金用于支持银行支付存款利息和运营等，所有人都可以为银行贡献储备金

**addReserves**

1. 检查转账地址余额是否足够
2. 用户金额减少，储备金金额增加
3. 触发转账事件
4. 触发添加储备金事件

**moveReserve**

1. 检查银行储备金是否足够
2. 转账账户金额增加，储备金减少
3. 触发转账事件
4. 触发移动储备金事件

## Saving Module

Saving Module 包括有一个合约：sun.sol，该合约实现储蓄获得存款利息逻辑，银行可以通过设置 ssr(sun saving rate)调整银行的利息

用户需要使用 join 参与银行的储蓄合约中，通过 dirp 获取报酬，使用 exit 退出储蓄合约将钱转移回自己的账户

### **全局变量**

`Acount`：用户储蓄记录

- bal：储蓄金额
- nst：上一次储蓄时间

`ssr`：sun 的存款利率，ssr 为每秒可获得奖励(精度 10^18)

- eg: r^n = 1.08, r = 1.000000002474313311, ssr = 1000000002474313311

`tsb`：储蓄合约总存款

`uni`：银行地址

### **储蓄业务**

#### 获取储蓄利息

获取储蓄利息，用户需要调用 drip 获取过去时间内储蓄的奖励

利息计算公式：rwd = ssr ^ (now - nst) \* bal - bal

#### join 和 exit

jion 是用户参与 sun 的储蓄合约的方式，其步骤描述如下

1. 查看用户银行账户余额
2. 将用户账户转入储蓄合约账户下
3. 储蓄合约更新储蓄账户
4. 增加总存款

exit 使用户从 sun 取回自己储蓄余额的方式，步骤与 join 相似

#### file（bytes32, uint256）

用于更新 ssr 的函数
