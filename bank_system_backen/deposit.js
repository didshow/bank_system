import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config("../.env");

export async function deposit(address, amount) {
    // 使用dotenv配置的RPC地址
    const provider = new JsonRpcProvider(process.env.RPC);

    // 获取签名者（通常是部署合约的账户）
    const signer = await provider.getSigner();
    // fs.readFileSync('../abis/Universe.json', 'utf8')
    // const __filename = import.meta.url;
    // const __dirname = path.dirname(__filename);
    // 读取合约ABI

    try {
        const DepositAbi =  JSON.parse(fs.readFileSync('./abis/Universe.json'));
        // const DepositAbi = JSON.parse(fs.readFileSync(path.join(__dirname,'../abis/Universe.json'), 'utf8'),(err,dataStr)=>{
            // if(err){
            //     return console.log("文件读取失败",err);
            // }else{
            //     console.log("文件读取成功",err)
            // }
        // });
        // 创建合约实例
        const DepositContract = new ethers.Contract(process.env.UNI_ADDRESS, DepositAbi, signer);
        // 执行deposit函数
        const result = await DepositContract.deposit(address, amount);
        console.log(result);
    
    } catch (err) {
        console.log(err);
    }
   



}