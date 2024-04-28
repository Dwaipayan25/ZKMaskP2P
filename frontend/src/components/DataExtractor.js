import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

function DataExtractor({scrollCoin, verifier, customLogic, account}) {
    const { hash, amount } = useParams(); // Extract parameters from URL
    const [paymentType, setPaymentType] = useState(''); // State to store the selected payment type
    const [paymentValue, setPaymentValue] = useState(0); // State to store the corresponding value

    const pay = async () => {

        const hash01 = hash;
        const amount01 = "0x0000000000000000000000000000000000000000000000000000000000000001";

        // Create the array of bytes32 inputs for the smart contract function
        const publicInputs = [amount01,hash];

        if(paymentValue==0){
            console.log('Paying:', amount,paymentType, 'with payment type value:', paymentValue);
            const approve = await scrollCoin.approve(customLogic.address,amount);
            await approve.wait();
            const hash01 = hash;
            const amount01 = "0x0000000000000000000000000000000000000000000000000000000000000001";

            // Create the array of bytes32 inputs for the smart contract function
            const publicInputs = [amount01,hash];
            const value=0;
            // const tx = await customLogic.customerPaying(ethers.utils.formatBytes32String(`"0x0000000000000000000000000000000000000000000000000000000000000001","${hash}"`),paymentValue);
            
            const tx = await customLogic.customerPaying(publicInputs,paymentValue);
            await tx.wait();
        }else{
            const options = {value: "304878048780487"}
            const tx = await customLogic.customerPaying(publicInputs,paymentValue,options);
            await tx.wait();
        }

        alert ("Paid Successfully");
        // console.log(paymentType);
        // Additional logic here
    };

    const handleSelectionChange = (event) => {
        setPaymentType(event.target.value);
        setPaymentValue(event.target.value === 'ScrollCoin' ? 0 : 1);
    };

    return (
        <div>
            <h1>Data Extractor</h1>
            <p>Hash: {hash}</p>
            <p>Amount: {amount}</p>
            <select value={paymentType} onChange={handleSelectionChange}>
                <option value="">Select a payment type</option>
                <option value="ScrollCoin">ScrollCoin</option>
                <option value="ScrollETH">ScrollETH</option>
            </select>
            <button onClick={pay}>Pay</button>
        </div>
    );
}

export default DataExtractor;
