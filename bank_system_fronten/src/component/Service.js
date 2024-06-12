import React, { useState, useEffect } from 'react';
import { Button, Form, Toast, Card, Typography, Divider, Slider, InputNumber } from '@douyinfe/semi-ui';
import axios from 'axios';
import InterestCard from './InterestCard';
import utils from './utils';

const { Text } = Typography;
// package.json 中的 proxy 配置,不用每次都配置API_URL
//  "proxy": "http://localhost:3001"
const API_URL = 'http://localhost:3001';

const ServicePage = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [toatlbalance, setTotalBalance] = useState(0);
  const [ssr, setSsr] = useState(0);


  // 获取钱包余额的 useEffect
  useEffect(() => {
    utils.addWalletListener(setWalletAddress);
    const handleGetWalletBalance = async () => {
      try {
        const balance = await utils.getWalletBalance();
        setBalance(balance);
        Toast.success('余额已更新');
        console.log('balance', balance);
      } catch (error) {
        Toast.error('获取余额失败');
      }
    };
    if (walletAddress) {
      handleGetWalletBalance();
    }
    utils.addWalletListener(setWalletAddress); // 将 setWalletAddress 作为参数传递
  }, [walletAddress]); // 当 walletAddress 变化时运行

  useEffect(() => {
    utils.addWalletListener(setWalletAddress);
  }, []);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await utils.getWalletAddress();
      setWalletAddress(address);
    };
    fetchWalletAddress();
  }, []);

  const handleDeposit = async () => {
    console.log("deposit => begin");
    console.log("address=>", walletAddress);

    if (!walletAddress) {
      Toast.error("钱包地址不能为空");
      return;
    }

    try {
      // 使用 axios 发送 POST 请求
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'deposit',
        transactionAmount: amount,
      });

      // 请求成功后的操作
      console.log("Response from server:", response);
      Toast.success(response.data.message);

      console.log("deposit => end");
    } catch (error) {
      // 请求失败后的操作
      console.error("Error during deposit:", error);

      // 根据错误类型显示不同的错误消息
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      Toast.error(errorMessage);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'withdraw',
        transactionAmount: amount,
      });
      Toast.success(response.data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleJoin = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'saving',
        transactionAmount: amount,
      });
      Toast.success(response.data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleExit = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'cancelSaving',
        transactionAmount: amount,
      });
      Toast.success(response.data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDrip = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'drip',
      });
      Toast.success(response.data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleGetTotalBalance = async () => {
    Toast.info('Getting total balance...');
    try {
      Toast.info('walletAddress', walletAddress);
      const response = await axios.post(`${API_URL}/transaction`, {
        accountAddress: walletAddress,
        transactionType: 'getBalance',
      });
      setTotalBalance(response.data.balance);
      Toast.success(response.data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.message : error.message);
    }
  }

  const getStepValue = () => {
    try {
      // 计算大于余额的下一个10的幂
      const nextPowerOfTen = Math.pow(10, Math.ceil(Math.log10(balance)));
      // 返回这个10的幂除以100
      var step = nextPowerOfTen / 100;
      // console.log('step', step);
      return step;
    } catch (error) {
      console.error('Failed to calculate step value:', error);
      return 0.1; // 返回一个默认值
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        Current APY 3.87% | 30 days average APY 1.34% | Total Value Locked $666,749.65
      </div>
      <Divider style={{ marginBottom: '20px' }} />
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
        <Card title="Universe Service" style={{ width: 400 }}>
          <Form>
            <div style={{ display: 'flex', gap: '20px' }}>
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
              <Button onClick={handleGetTotalBalance}>Get Balance</Button>
            </div>
          }
          style={{ width: 400 }}
        >
          <Form>
            <div style={{ display: 'flex', gap: '20px' }}>
              <InputNumber
                onNumberChange={value => handleAmountChange(Number(value))}
                min={0}
                step={getStepValue()}
                max={balance}
                value={amount}
              />
              <div style={{ marginTop: 20 }}>
                <Text>Total Balance: {balance} ETH</Text>
              </div>
            </div>
            <Slider
              min={0}
              max={toatlbalance}
              step={getStepValue()}
              value={amount}
              onChange={value => handleAmountChange(Number(value))}
              style={{ width: 350, marginTop: '12px' }}
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
