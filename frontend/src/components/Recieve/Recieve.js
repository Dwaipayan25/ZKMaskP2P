import React, { useState } from 'react';
import './Recieve.css'; // Assuming CSS is saved in this file
import { ethers } from 'ethers';

function Receive({scrollCoin, verifier, customLogic, account}) {
    const [proof, setProof] = useState('');
    const [amount, setAmount] = useState('');
    const [hash, setHash] = useState('');
    const [currency, setCurrency] = useState('ScrollCoin');
    const [paymentType, setPaymentType] = useState(''); // State to store the selected payment type
    const [paymentValue, setPaymentValue] = useState(0); // State to store the corresponding value

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log({
            proof,
            amount,
            hash,
            paymentValue
        });

        const publicInputs = [amount,hash];

        const tx= await customLogic.userReceiving(proof,publicInputs,paymentValue);
        await tx.wait();
        // Here you would normally handle the blockchain transaction

        // Alert Amount recieved successfully.
        alert("Amount recieved successfully");
    };

    const handleSelectionChange = (event) => {
        setPaymentType(event.target.value);
        setPaymentValue(event.target.value === 'ScrollCoin' ? 0 : 1);
    };

    return (
        <form onSubmit={handleSubmit} className="receive-form">
            <div className="input-group">
                <label>Proof (big hash)</label>
                <input
                    type="text"
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    placeholder="Enter proof hash"
                />
            </div>
            <div className="input-group">
                <label>Amount in bytes32</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in bytes32"
                />
            </div>
            <div className="input-group">
                <label>Hash</label>
                <input
                    type="text"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    placeholder="Enter hash"
                />
            </div>
            <div className="input-group">
                <label>Currency</label>
                <select value={paymentType} onChange={handleSelectionChange}>
                    <option value="">Select a payment type</option>
                    <option value="ScrollCoin">ScrollCoin</option>
                    <option value="ScrollETH">ScrollETH</option>
            </select>
            </div>
            <button type="submit" className="submit-button">Receive</button>
        </form>
    );
}

export default Receive;
