import './App.css';
import Navbar from './component/Navbar.js';
import Home from './component/Home';
import Service from './component/Service.js';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import utils from './component/utils';
//import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  useEffect(() => {
    //  getWalletAddress();
    utils.addWalletListener();
  })



  async function getWalletAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } else {
      alert('Please install metamask');
    }
  }

  return (
    <div className="container">
      <Router>
        <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress} />
        <Routes>
          <Route path='/Service' element={<Service />} />
          <Route path='/' element={<Home onConnectWallet={getWalletAddress} walletAddress={walletAddress} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;