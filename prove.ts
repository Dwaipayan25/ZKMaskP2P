import sindri from 'sindri';

// Generate a proof for the `latest` tag of the `is-equal` circuit.
// The `is-equal` circuit name is specified in the `name` field of `./is-equal/sindri.json`.
const circuitIdentifier = 'is-equal:latest';

function generateProofInput(): string {
    const now = new Date();

    const date = now.getDate(); // Day of the month (1-31)
    const month = now.getMonth() + 1; // Month (0-11, where January is 0)
    const year = now.getFullYear(); // Full year
    const hour = now.getHours(); // Hour (0-23)
    const min = now.getMinutes(); // Minute (0-59)
    const sec = now.getSeconds(); // Second (0-59)
    const ms = now.getMilliseconds();
    
    // Assume 'amount' is a predefined or calculated value
    const amount = 1; // This can be dynamically set based on your application needs

    const proofInput = `date=${date}\nmonth=${month}\nyear=${year}\nhour=${hour}\nmin=${min}\nsec=${sec}\nms=${ms}\namount=${amount}`;
    // console.log(proofInput);
    return proofInput;
}

// Example usage:
const proofInput = generateProofInput();

const proof = await sindri.proveCircuit(circuitIdentifier, proofInput);

// Log out the proof object as JSON.
console.log(JSON.stringify(proof, null, 2));


