import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { deposit } from './utils/deposit.js';
import { withdraw } from './utils/withdraw.js';
import { drip } from './utils/drip.js';
import { exit } from './utils/exit.js';
// import { checkErc20Address } from './utils/checkErc20Address.js';
import { getBalance, saving } from './utils/sun.js';
dotenv.config("./.env");

const app = express();

app.set('view engine', 'ejs');

// 解析 JSON 格式的请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // 允许的前端域名
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
    res.render("home");
});

// TODO
app.post('/transaction', (req, res) => {
    const { accountAddress, transactionType, transactionAmount } = req.body;
    switch (transactionType) {
        case 'deposit':
            try {
                // checkErc20Address(req, res);
                deposit(accountAddress, transactionAmount);
                // 如果存款成功，发送成功的 JSON 响应
                res.json({ message: `成功存款 ${transactionAmount} 到账户 ${accountAddress}` });
            } catch (error) {
                // 如果存款失败，发送失败的 JSON 响应
                res.status(400).json({ message: `存款失败：${error.message}` });
            }
            break;
        case 'withdraw':
            try {
                //checkErc20Address(req,res);
                withdraw(accountAddress, withdrawAddress, transactionAmount);
                // 如果取款成功，发送成功的 JSON 响应
                res.json({ message: `成功从${withdrawAddress}取款 ${transactionAmount} 到账户 ${accountAddress}` });
            } catch (error) {
                // 如果取款失败，发送失败的 JSON 响应
                res.status(400).json({ message: `取款失败：${error.message}` });
            }
            break;
        case 'saving':
            // 前端在这里需要判断当前账户的余额是否>transactionAmount
            if (transactionAmount > 0) {
                saving(transactionAmount);
                res.json({ message: `成功存入 ${transactionAmount} ` });
            } else {
                res.status(400).json({ message: `存入失败，存入金额必须大于0` });
            }
            break
        case 'cancelSaving':
            try {
                //checkErc20Address(req,res);
                exit(transactionAmount);
                // 如果取款成功，发送成功的 JSON 响应
                res.json({ message: `成功从定期中取款 ${transactionAmount} ` });
            } catch (error) {
                // 如果取款失败，发送失败的 JSON 响应
                res.status(400).json({ message: `取款失败：${error.message}` });
            }
            break;
        case 'drip':
            try {
                //checkErc20Address(req, res);
                drip(accountAddress);
                // 如果存款成功，发送成功的 JSON 响应
                res.json({ message: `成功提取利息到账户 ${accountAddress}` });
            } catch (error) {
                // 如果存款失败，发送失败的 JSON 响应
                res.status(400).json({ message: `提取利息失败：${error.message}` });
            }
            break;
        case 'getBalance':
            try {
                getBalance(accountAddress);
                // 如果存款成功，发送成功的 JSON 响应
                res.json({ message: `成功获取账户 ${accountAddress} 的余额` });
            } catch (error) {
                // 如果存款失败，发送失败的 JSON 响应
                res.status(400).json({ message: `获取余额失败：${error.message}` });
            }
            break
    }
});

// const HOST = process.env.HOST 
const PORT = process.env.PORT

app.listen(PORT, () => {
    // console.log(`HOST: ${HOST}, PORT: ${PORT}`);
    // console.log(proce0ss.env.RPC);
    console.log(`Server is running on port ${PORT}`)
})



