import sindri from 'sindri';

// Compile the circuit in the `is-equal` directory.
const circuit = await sindri.createCircuit('is-equal');

// Log out the circuit object as JSON.
console.log(JSON.stringify(circuit, null, 2));