import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { deposit } from './utils/deposit.js';
import { withdraw } from './utils/withdraw.js';
import { drip } from './utils/drip.js';
import { checkErc20Address } from './utils/checkErc20Address.js';
import { saving, calculateInterest } from './utils/sun.js';
dotenv.config("./.env");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.render("home");
});
app.get('/drip', (req, res) => {
    res.render("drip");
});
app.get('/deposit', (req, res) => {
    res.render("deposit");
});
app.get('/withdraw', (req, res) => {
    res.render("withdraw");
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
        case 'saving':
            // 前端在这里需要判断当前账户的余额是否>transactionAmount
            if (transactionAmount > 0) {
                saving(transactionAmount);
                res.json({ message: `成功存入 ${transactionAmount} ` });
            } else {
                res.status(400).json({ message: `存入失败，存入金额必须大于0` });
            }
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
    }
});

// const HOST = process.env.HOST 
const PORT = process.env.PORT

app.listen(PORT, () => {
    // console.log(`HOST: ${HOST}, PORT: ${PORT}`);
    // console.log(proce0ss.env.RPC);
    console.log(`Server is running on port ${PORT}`)
})



