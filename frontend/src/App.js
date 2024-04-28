import './App.css';
import ScrollCoin from "./contracts/ScrollCoin.json";
import Verifier from "./contracts/UltraVerifier.json";
import CustomLogic from "./contracts/NoirCustomLogic.json";
import ProofComponent from './components/ProofComponent';
import DataExtractor from './components/DataExtractor';
import Navbar from './components/Navbar/Navbar';
import HeroPage from './components/HeroPage/HeroPage';
import Footer from './components/Footer/Footer';
import Recieve from './components/Recieve/Recieve.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, Spinner } from 'react-bootstrap';
import { useState } from 'react';
const { ethers } = require("ethers");

function App() {

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollCoin,setScrollCoin] = useState(null);
  const [verifier, setVerifier] = useState(null);
  const [customLogic, setCustomLogic] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    //Get Provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //Set up signer
    const signer = provider.getSigner();
    loadContracts(signer);
  }

  const loadContracts = async (signer) => {
    const scrollCoin = new ethers.Contract("0x1E066480866E5588a38d7749d17D098A187B2f1b",ScrollCoin.abi,signer);
    setScrollCoin(scrollCoin);

    const verifier = new ethers.Contract("0x66725A0d3A992B83E5c4A793D49D60479075598a",Verifier.abi,signer);
    setVerifier(verifier);
    
    const customLogic = new ethers.Contract("0xd816998606256a0e1a23c3E01638774824248d93",CustomLogic.abi,signer);
    setCustomLogic(customLogic);

    console.log(scrollCoin);
    console.log(customLogic);
    console.log(verifier);
    
    setLoading(false);
  }

  return (
    <div className="App" style={{ flex: 1 }}>
      {/* <ProofComponent /> */}
      {/* <button onClick={web3Handler} disabled={!window.ethereum}>
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
      </button> */}
      {/* {account && <p>Connected Account: {account}</p>} */}

      <BrowserRouter>
      <Navbar web3Handler={web3Handler} account={account} />
      {loading ? 
        (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spinner animation="border" style={{ display: 'flex' }} />
        <p className='mx-3 my-0'>Awaiting Metamask Connection...Connect to Scroll Sepoila Testnet</p>
        </div>)
        :
        (<Routes>
          <Route path="/" element={<HeroPage />}/>
          <Route path="/CreateLink" element={<ProofComponent />}/>
          <Route path="/Recieve" element={<Recieve scrollCoin={scrollCoin} verifier={verifier} customLogic={customLogic} account={account}/>}/>
          <Route path="/extract/:hash/:amount" element={<DataExtractor scrollCoin={scrollCoin} verifier={verifier} customLogic={customLogic} account={account}/>} />
        </Routes>)}
        
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
