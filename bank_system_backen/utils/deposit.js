import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("../.env");

export async function deposit(address, amount) {
    // 使用dotenv配置的RPC地址
    const provider = new JsonRpcProvider(process.env.RPC);

    // 获取签名者（通常是部署合约的账户）
    const signer = await provider.getSigner();

    try {
        const DepositAbi = JSON.parse(fs.readFileSync('./abis/Universe.json'));
        // 创建合约实例
        const DepositContract = new ethers.Contract(process.env.UNI_ADDRESS, DepositAbi, signer);
        // 执行deposit函数
        const result = await DepositContract.deposit(address, amount);
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}

export async function getBalance(address) {
    // 使用dotenv配置的RPC地址
    const provider = new JsonRpcProvider(process.env.RPC);

    // 获取签名者（通常是部署合约的账户）
    const signer = await provider.getSigner();

    try {
        const DepositAbi = JSON.parse(fs.readFileSync('./abis/Universe.json'));
        // 创建合约实例
        const DepositContract = new ethers.Contract(process.env.UNI_ADDRESS, DepositAbi, signer);
        // 执行deposit函数
        const result = await DepositContract.deposit(address, amount);
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}