import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("../.env");

// 存定期
export async function saving(amount) {
    const provider = new JsonRpcProvider(process.env.RPC);
    const signer = await provider.getSigner();

    try {
        const SunAbi = JSON.parse(fs.readFileSync('./abis/Sun.json'));
        // 创建合约实例
        const SunContract = new ethers.Contract(process.env.SUN_ADDRESS, SunAbi, signer);
        const result = await SunContract.join(amount);
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}
// 计算利息
export async function getBalance(userAddress) {
    const provider = new JsonRpcProvider(process.env.RPC);
    const signer = await provider.getSigner();

    try {
        const SunAbi = JSON.parse(fs.readFileSync('./abis/Sun.json'));
        // 创建合约实例
        const SunContract = new ethers.Contract(process.env.SUN_ADDRESS, SunAbi, signer);
        // const result = await SunContract.join(amount);
        const account = await SunContract.account(userAddress);

        const DepositAbi = JSON.parse(fs.readFileSync('./abis/Universe.json'));
        // 创建合约实例
        const DepositContract = new ethers.Contract(process.env.UNI_ADDRESS, DepositAbi, signer);
        const star = await DepositContract.stars(userAddress);

        // 获取合约当前的ssr和ONE值
        const ssr = await contract.ssr();
        const ONE = await contract.ONE()
        // console.log(result);
        // 计算利息 
        const interest = await calculateInterestLogic(account.bal, account.nst, ssr, ONE);
        const balance = star + interest;
        console.log(balance);
        return balance;
    } catch (err) {
        console.log(err)
    }
}
async function calculateInterestLogic(balance, lastTimestamp, ssr, ONE) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const timeDifference = currentTime - lastTimestamp;
    // 复利利息计算——和solidity内逻辑一致，_rmul(_rpow(ssr, block.timestamp - accounts[usr].nst, ONE), accounts[usr].bal) - accounts[usr].bal;
    const interest = rmul(solidityRpow(ssr, timeDifference, ONE), balance) - balance;
    return interest;
}

function rmul(x, y) {
    const z = (x * y) / ONE;
    return z;
}

function solidityRpow(x, n, base) {
    // 初始化结果
    let result = BigInt(1);
    x = BigInt(x);

    while (n > 0) {
        if (n % BigInt(2) !== BigInt(0)) {
            // 乘以 x 并取模
            result = (result * x) % base;
        }
        // 将 n 除以 2
        n = n >> BigInt(1);
        // 平方 x 并取模
        x = (x * x) % base;
    }
    return result;
}