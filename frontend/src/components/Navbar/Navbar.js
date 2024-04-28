import React from 'react';
import './Navbar.css'; // Ensure you create this CSS file in the same directory
import logoImage from './ZKMaskP2P.webp'; // Update the path according to where you store your logo image
import { Link } from "react-router-dom";


const Navbar=({web3Handler,account})=>{
    return (
        <nav className="navbar">
            <Link to="/">
            <div className="navbar-logo">
                <img src={logoImage} alt="Logo" />
            </div>
            </Link>

            <div className="navbar-buttons">
                <Link to='/CreateLink'>
                  <button>Create Link</button>
                </Link>
                <Link to='/Recieve'>
                  <button>Receive Payment</button>
                </Link>
                <>
                {account ? (
                  <>
                    <button>
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={web3Handler}
                  >
                    Connect Wallet
                  </button>
                )
                }
                </>
            </div>
        </nav>
    );
}

export default Navbar;
