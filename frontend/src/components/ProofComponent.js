import React, { useState } from 'react';
import './ProofComponent.css';

function ProofComponent() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayProof,setDisplayProof]=useState(null);
  const [hash,setHash]=useState(null);
  const [amount,setAmount]=useState(null);
  const [link,setLink]=useState(null);

  function extractValues(data) {
    const amountRegex = /amount = "([^"]+)"/;
    const returnRegex = /return = "([^"]+)"/;
  
    const amountMatch = data.match(amountRegex);
    const returnMatch = data.match(returnRegex);
  
    const amount = amountMatch ? amountMatch[1] : null;
    const returnValue = returnMatch ? returnMatch[1] : null;
  
    return { amount, returnValue };
  }

  const fetchProof = async () => {
    setLoading(true);
    setError(''); // Clear previous errors on new fetch

    try {
        const response = await fetch('http://localhost:3001/generate-proof');
        const data = await response.json();

        // Update state with the proof data from response
        setProof(data.proof);

        // Assuming proof data comes as a stringified JSON and needs to be parsed
        const proof_object = JSON.parse(data.proof);

        // Setting display proof directly from the parsed object
        setDisplayProof(proof_object.proof.proof);

        // Extract Verifier.toml and log it
        const jsondata = proof_object.public["Verifier.toml"];
        console.log(jsondata);

        // Extract values using the helper function
        const { amount, returnValue } = extractValues(jsondata);
        setAmount(amount); // Setting amount directly without converting to integer
        setHash(returnValue);

        const link=`http://localhost:3000/extract/${returnValue}/${hexToDecimal(amount)}`
        setLink(link);

    } catch (error) {
        console.error('Failed to fetch proof', error);
        setError('Failed to fetch proof. Please try again.');
    }

    setLoading(false); // Ensure loading is handled correctly regardless of error status
};


  const proof_object = JSON.parse(proof);
  const [proofObject, setProofObject] = useState(proof_object);

  // Helper function to convert hex to decimal
  const hexToDecimal = (hex) => parseInt(hex, 16);

  // Safely extract data if proof is available .()

  return (
    <div className="proof-container">
      <button onClick={fetchProof} disabled={loading}>
         {loading ? 'Generating...' : 'Generate Proof'}
       </button>
       
       

       {proof && <div className="data-container">
       <div className="data-box">
          <h2>Link</h2>
          <pre>{link}</pre>
        </div>
        <div className="data-box">
          <h2>Amount</h2>
          <pre>{hexToDecimal(amount)}</pre>
        </div>
        <div className="data-box">
          <h2>Hash</h2>
          <pre>{hash}</pre>
        </div>
        <div className="data-box">
          <h2>Amount in Hex</h2>
          <pre>{amount}</pre>
        </div>
        <div className="data-box">
          <h2>Proof</h2>
          <pre>{displayProof}</pre>
        </div>
      </div>}
      {proof && <div><h2>Proof:</h2><pre>{proof}</pre></div>}
    </div>
  );
}

export default ProofComponent;
