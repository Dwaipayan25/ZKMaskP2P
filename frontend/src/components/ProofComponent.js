import React, { useState } from 'react';

function ProofComponent() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProof = () => {
    setLoading(true);
    fetch('http://localhost:3001/generate-proof')
      .then(response => response.json())
      .then(data => {
        setProof(data.proof);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch proof', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={fetchProof} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Proof'}
      </button>
      {proof && <div><h2>Proof:</h2><pre>{proof}</pre></div>}
    </div>
  );
}

export default ProofComponent;


