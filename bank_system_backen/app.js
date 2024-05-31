import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { deposit } from './deposit.js';
import { checkErc20Address } from './checkErc20Address.js';

dotenv.config("./.env");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.render("home");
});

// TODO
app.post('/transaction', (req, res) => {
    const { accountAddress, transactionType, transactionAmount } = req.body;

    if (transactionType === 'deposit') {
        try {
            checkErc20Address(req,res);
            deposit(accountAddress, transactionAmount);
            // 如果存款成功，发送成功的 JSON 响应
            res.json({ message: `成功存款 ${transactionAmount} 到账户 ${accountAddress}` });
        } catch (error) {
            // 如果存款失败，发送失败的 JSON 响应
            res.status(400).json({ message: `存款失败：${error.message}` });
        }
    } else if (transactionType === 'withdraw') {
        // 处理取款逻辑
        // 假设取款逻辑在这里执行，并返回结果

        // 如果取款成功
        // res.json({ message: `成功从账户 ${accountAddress} 取款 ${transactionAmount}` });

        // 如果取款失败，处理错误并返回
        // res.status(400).json({ message: '取款失败的错误信息' });
    } else {
        // 处理其他情况（如无效的交易类型）
        res.status(400).json({ message: '无效的交易类型' });
    }
});


// const HOST = process.env.HOST 
const PORT = process.env.PORT

app.listen(PORT, () => {
    // console.log(`HOST: ${HOST}, PORT: ${PORT}`);
    // console.log(proce0ss.env.RPC);
    console.log(`Server is running on port ${PORT}`)
})



