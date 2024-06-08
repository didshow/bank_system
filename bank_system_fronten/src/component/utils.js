import Web3 from 'web3';

const utils = {
    getWalletAddress: async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            let Faddress = accounts[0];
            console.log('getWalletAddress', Faddress)
            return Faddress;
        } else {
            alert('Please install metamask');
        }
    },

    getWalletBalance: async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const accountAddress = accounts[0];
            console.log("Account Address:", accountAddress);
    
            // 获取账户余额
            const balance = await web3.eth.getBalance(accountAddress);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            console.log("账户余额:", balanceInEth);
            return parseFloat(balanceInEth);
        } catch (error) {
            console.error("获取账户余额失败:", error);
            throw error; // Optional: rethrow the error if you want to handle it elsewhere
        }
    },

    addWalletListener: (setWalletAddress) => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length > 0) {
                    console.log('setWalletAddress', accounts[0])
                    setWalletAddress(accounts[0]);
                } else {
                    setWalletAddress('');
                }
            });
        } else {
            console.log('Please install MetaMask');
        }
    }
    
}

export default utils;
