import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("../.env");

export async function drip(address) {
    // 使用dotenv配置的RPC地址
    const provider = new JsonRpcProvider(process.env.RPC);

    // 获取签名者（通常是部署合约的账户）
    const signer = await provider.getSigner(1);

    try {
        const SunAbi = JSON.parse(fs.readFileSync('./abis/Sun.json'));
        // 创建合约实例
        const SunContract = new ethers.Contract(process.env.SUN_ADDRESS, SunAbi, signer);
        // 执行drip函数
        const result = await SunContract.drip(address);
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}