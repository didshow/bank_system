import React, { useState, useEffect } from 'react';
import { Button, Form, Toast, Card, Typography, Divider ,Slider ,InputNumber} from '@douyinfe/semi-ui';
import axios from 'axios';
import InterestCard from './InterestCard';
import utils from './utils';

const { Text } = Typography;

const API_URL = 'http://localhost:3001';

const ServicePage = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [ssr, setSsr] = useState(0);

    useEffect(() => {
        const fetchSsr = async () => {
            try {
                const response = await axios.get(`${API_URL}/ssr`);
                setSsr(response.data.ssr);
            } catch (error) {
                Toast.error('获取 SSR 失败');
            }
        };

        fetchSsr();
    }, []); // 仅在组件挂载时运行

    // 获取钱包余额的 useEffect
    useEffect(() => {
        utils.addWalletListener();
        const handleGetWalletBalance = async () => {
            try {
                const balance = await utils.getWalletBalance();
                setBalance(balance);
                console.log('balance', balance);
            } catch (error) {
                Toast.error('获取余额失败');
            }
        };

        if (walletAddress) {
            handleGetWalletBalance();
        }
    }, [walletAddress]); // 当 walletAddress 变化时运行

    const handleDeposit = async () => {
        try {
            await axios.post(`${API_URL}/deposit`, { walletAddress, amount });
            Toast.success('Deposit successful');
            setBalance(prev => prev + parseFloat(amount));
        } catch (error) {
            Toast.error('Deposit failed');
        }
    };

    const handleWithdraw = async () => {
        try {
            await axios.post(`${API_URL}/withdraw`, { walletAddress, amount });
            Toast.success('Withdraw successful');
            setBalance(prev => prev - parseFloat(amount));
        } catch (error) {
            Toast.error('Withdraw failed');
        }
    };

    const handleJoin = async () => {
        if (balance < parseFloat(amount)) {
            Toast.error('Not enough balance to join');
            return;
        }

        try {
            await axios.post(`${API_URL}/join`, { walletAddress, amount });
            Toast.success('Join successful');
            setBalance(prev => prev - parseFloat(amount));
        } catch (error) {
            Toast.error('Join failed');
        }
    };

    const handleExit = async () => {
        try {
            await axios.post(`${API_URL}/exit`, { walletAddress, amount });
            Toast.success('Exit successful');
            setBalance(prev => prev + parseFloat(amount));
        } catch (error) {
            Toast.error('Exit failed');
        }
    };

    const handleDrip = async () => {
        try {
            await axios.post(`${API_URL}/drip`, { walletAddress });
            Toast.success('Drip successful');
        } catch (error) {
            Toast.error('Drip failed');
        }
    };

    const handleAmountChange = (value) => {
      setAmount(value);
    };

    const handleGetBalance = async () => {
        try {
            const response = await axios.get(`${API_URL}/balance`);
            setBalance(response.data.balance);
        } catch (error) {
            Toast.error('获取余额失败');
        }
    }

    

    const getStepValue = () => {
      try{
        // 计算大于余额的下一个10的幂
        const nextPowerOfTen = Math.pow(10, Math.ceil(Math.log10(balance)));
        // 返回这个10的幂除以100
        var step = nextPowerOfTen / 100;
        console.log('step', step);
        return step;
      } catch (error) {
        console.error('Failed to calculate step value:', error);
        return 0.1;// 返回一个默认值
      }
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                Current APY 3.87% 30 days average APY 1.34% Total Value Locked $666,749.65
            </div>
            {/* <Button onClick={handleGetWalletBalance} style={{ marginRight: '12px' }}>获取账户余额</Button>
            {balance !== null && (<p>wallet Balance: {balance}</p>)} */}
            <Divider style={{ marginBottom: '20px' }}/>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between'}}>
                <Card title="Universe Service" style={{ width: 400 }}>
                    <Form>
                        <div style={{display: 'flex', gap: '20px'}}>
                          <InputNumber
                              onNumberChange={value => handleAmountChange(Number(value))}
                              min={0}
                              step={getStepValue()}
                              max={balance}
                              value={amount}
                          />
                          <div style={{ marginTop: 20 }}>
                              <Text>Balance: {balance} ETH</Text>
                          </div>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <Button type="primary" onClick={handleDeposit} style={{ marginRight: '12px' }}>Deposit</Button>
                            <Button type="secondary" onClick={handleWithdraw} style={{ marginRight: '12px' }}>Withdraw</Button>
                        </div>
                    </Form>
                </Card>
                <InterestCard ssr={ssr} />
                <Card
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Sun Service</span>
                        <Button onClick={handleGetBalance}>Get Balance</Button>
                        </div>
                    }
                    style={{ width: 400 }}
                >
                    <Form>
                        <div style={{display: 'flex', gap: '20px'}}>
                          <InputNumber
                              onNumberChange={value => handleAmountChange(Number(value))}
                              min={0}
                              step={getStepValue()}
                              max={balance}
                              value={amount}
                          />
                          <div style={{ marginTop: 20 }}>
                              <Text>Balance: {balance} ETH</Text>
                          </div>
                        </div>
                        <Slider
                            min={0}
                            max={balance}
                            step={getStepValue()}
                            value={amount}
                            onChange={value => handleAmountChange(Number(value))}
                            style={{with: 350, marginTop: '12px'}}
                        />
                        <div style={{ marginBottom: '12px' }}>
                            <Button type="primary" onClick={handleJoin} style={{ marginRight: '12px' }}>Join</Button>
                            <Button type="secondary" onClick={handleExit} style={{ marginRight: '12px' }}>Exit</Button>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <Button type="primary" onClick={handleDrip}>Drip</Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ServicePage;
