import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("../.env");

const provider = new JsonRpcProvider(process.env.RPC);
const StarAbi = JSON.parse(fs.readFileSync('./abis/Star.json'));

export const checkErc20Address = async (req, res, next) => {
    const { accountAddress, transactionAmount, transactionType } = req.params;   // 从请求体中获取地址

    // 检查 accountAddress 是否存在且是有效的以太坊地址
    if (!accountAddress || !ethers.utils.isAddress(accountAddress)) {
        return res.status(400).json({ message: 'Invalid Ethereum account address format' });
    }

    // 使用 ethers.utils.isAddress 检查地址格式是否有效
    if (!ethers.utils.isAddress(accountAddress)) {
        try {
            return res.status(400).json({ message: 'Invalid Ethereum account address format' });
        } catch (error) {
            console.error('Error checking Ethereum account address format:', error);
        }

    }

    const starContractAddress = process.env.STAR_ADDRESS; // Star代币合约地址
    const starContract = new ethers.Contract(starContractAddress, StarAbi, provider);

    try {
        switch (transactionType) {
            case "deposit":
                // 检查地址是否至少有transactionAmount 个 Star代币
                const balance = await starContract.balanceOf(accountAddress);
                if (balance < transactionAmount) {
                    // 如果余额小于transactionAmount，返回错误响应
                    return res.status(400).json({ message: 'Address do not have enough Star tokens' });
                }
            // 如果余额不为0，将地址信息添加到请求中或进行其他逻辑处理
            // TODO
        }
        next(); // 继续执行路由处理器
    } catch (error) {
        // 如果发生错误，返回错误响应
        console.error('Error checking Star token balance:', error);
        return res.status(500).json({ message: 'Error checking ERC20 token balance' });
    }
};
