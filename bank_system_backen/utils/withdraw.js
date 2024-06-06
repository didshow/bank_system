import {ethers,JsonRpcProvider} from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("../.env");

 
export async function withdraw(src,to,amount) {
   // 使用dotenv配置的RPC地址
   const provider = new JsonRpcProvider(process.env.RPC);

   // 获取签名者（通常是部署合约的账户）
   const signer = await provider.getSigner();
     
    const abi =JSON.parse(fs.readFileSync('./abis/Universe.json'));
    const contract=new ethers.Contract(process.env.UNI_ADDRESS,abi,signer);
    const result = await contract.withdraw(src,to,amount);
    console.log(result.hash);
}


 