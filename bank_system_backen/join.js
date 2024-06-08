import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function join(amount) {
    try {
        // 使用dotenv配置的RPC地址
        const provider = new JsonRpcProvider(process.env.RPC);

        const wallet = new ethers.Wallet(privateKey, provider);

        // 读取合约的ABI
        const abi = JSON.parse(fs.readFileSync('./abis/Sun.json', 'utf8'));
        
        // 合约地址
        const contractAddress = process.env.CONTRACT_ADDRESS;
        
        // 创建合约实例
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // 将金额转换为合适的单位，例如从以太转换为wei
        const formattedAmount = ethers.utils.parseEther(amount.toString());

        // 调用join函数
        const tx = await contract.join(formattedAmount);
        console.log("Transaction hash:", tx.hash);

        // 等待交易被挖掘
        await tx.wait();
        console.log("Transaction confirmed.");
    } catch (error) {
        console.error("Error:", error);
    }
}

// 从命令行接收金额参数
const amount = process.argv[2];
if (!amount) {
    console.log("Usage: node join.js <amount>");
} else {
    join(amount);
}
