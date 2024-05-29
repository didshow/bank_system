 import './App.css';
import Navbar from './component/Navbar.js';
import Home from './component/Home';
import { useState, useEffect } from 'react';
import {Router,Route,Routes} from 'react-router-dom';
import axios from 'axios';
 

function App() {
  const [walletAddress,setWalletAddress] = useState('');
  useEffect(()=>{
  //  getWalletAddress();
  addWalletListener();
  })


  function addWalletListener(){
    if(window.ethereum){
      window.ethereum.on('accountsChanged', function(accounts){
        if(accounts.length>0){
          setWalletAddress(accounts[0]);
        }else{
          setWalletAddress('');
        }
      });
    }else{
      console.log('Please install metamask');
    }
  }
  async function getWalletAddress(){
    if(window.ethereum){
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      setWalletAddress(accounts[0]);
    }else{
      alert('Please install metamask');
    }
  }

  return (
    <div className="container">
      <Router>
        <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress}/>
        <Routes> 
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      
     
    </div>
  );
}

export default App;
