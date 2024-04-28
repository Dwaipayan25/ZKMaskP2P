use dep::std;

fn main(
    date: Field, 
    month: Field, 
    year: Field, 
    hour: Field, 
    min: Field, 
    sec: Field,
    ms: Field,
    amount: pub Field
    ) -> pub Field {
    // Construct an array with all the inputs to be hashed together
    let inputs = [date, month, year, hour, min, sec, ms, amount];

    // Generate a hash of all input fields
    let hash = std::hash::pedersen_hash(inputs);

    // Output the generated hash
    hash
}