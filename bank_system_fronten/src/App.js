 
import './App.css';
import Navbar from './Navbar.js';
import { useState, useEffect } from 'react';
import UploadSuccess from './UploadSuccess.js';

 

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
      <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress}/>
     <UploadSuccess/>
    </div>
  );
}

export default App;
