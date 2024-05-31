import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { deposit } from './deposit.js';


dotenv.config("./.env");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/', (req, res) => {
    res.render("home");
});

// TODO
app.post('/transaction', (req, res) => {
    // res.render("transaction");
    console.log(req.body);
    const { accountAddress, transactionType, transactionAmount } = req.body;

    if (transactionType === 'deposit') {
        
        deposit(accountAddress, transactionAmount);
        
        // 返回存款成功的消息
        const message = `成功存款 ${transactionAmount} 到账户 ${accountAddress}`;
        res.send(`
        <script>
          alert('${message}');
          window.location.href = '/'; // 重定向到根路径
          
        </script>
        `);
    } else if (transactionType === 'withdraw') {
        // 处理取款逻辑
        
        // 返回取款成功的消息
        const message = `成功从账户 ${accountAddress} 取款 ${transactionAmount}`;
        res.send(message);
    } else {
        // 处理其他情况（如无效的交易类型）
        const message = '无效的交易类型';
        res.send(message);
    }
});

// const HOST = process.env.HOST 
const PORT = process.env.PORT

app.listen(PORT, () => {
    // console.log(`HOST: ${HOST}, PORT: ${PORT}`);
    // console.log(proce0ss.env.RPC);
    console.log(`Server is running on port ${PORT}`)
})



