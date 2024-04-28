import React from 'react';
import './HeroPage.css'; // This will be your styling file
import image1 from './chain01.jpeg'; // Update the path and names according to your images
import image2 from './scroll01.png';
import image3 from './sindri01.jpg';
import {Link} from "react-router-dom";

function HeroPage() {
    return (
        <div className="hero-page">
            <div className="section section1">
                <div className="text-content">
                    <h1>Welcome to ZK Mask</h1>
                    <p>Anyone can pay you without knowing your Wallet Address.</p>
                </div>
                <div className="buttons">
                    <Link to="CreateLink"><button>Create Link</button></Link>
                    <Link to="Recieve"><button>Recieve Payment</button></Link>
                </div>
            </div>
            <div className="section section2">
                <div className="box">
                    <img src={image1} alt="Description 1" />
                    <p>Chainlink's price feeds are used to obtain the real-time value of ETH for accurately converting payments into ScrollETH based on the current market rates</p>
                </div>
                <div className="box">
                    <img src={image2} alt="Description 2" />
                    <p>Scroll handles contract deployment and transaction execution</p>
                </div>
                <div className="box">
                    <img src={image3} alt="Description 3" />
                    <p>Sindri is employed to design the zero-knowledge circuits essential for securely generating cryptographic proofs and hashes.</p>
                </div>
            </div>
        </div>
    );
}

export default HeroPage;
