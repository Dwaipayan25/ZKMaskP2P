# ZKMaskP2P

##### Table of Contents 
- [ZKMaskP2P](#zkmaskp2p)
        - [Table of Contents](#table-of-contents)
  - [0. Let's understand the problem ?](#0-lets-understand-the-problem-)
  - [1. Inspiration behind making this](#1-inspiration-behind-making-this)
  - [2. WorkFlow](#2-workflow)
  - [3. Diagram](#3-diagram)
  - [4. Brief overview of the technologies used in the ZK-Mask-P2P :](#4-brief-overview-of-the-technologies-used-in-the-zk-mask-p2p-)
    - [4.1 NOIR and Sindri CLI:](#41-noir-and-sindri-cli)
    - [4.2 Chainlink Price Feed](#42-chainlink-price-feed)
    - [4.3 Solidity and Smart Contracts:](#43-solidity-and-smart-contracts)
  - [5. How to start with it](#5-how-to-start-with-it)
  - [6. What's next for ZKMaskP2P?](#6-whats-next-for-zkmaskp2p)
  - [Deployed \& Verified Contract Links on Sepoila:](#deployed--verified-contract-links-on-sepoila)



## 0. Let's understand the problem ?

Sharing your public key can expose you to various risks and vulnerabilities. Here are some solid reasons and examples illustrating why it's generally advisable to keep your public key private:

- Association of Identity with Transactions:
Example: If someone knows your public key, they can easily track all transactions associated with that key on the blockchain. This could lead to unwanted exposure of your financial habits or holdings, potentially making you a target for targeted advertisements, phishing attacks, or even social engineering tactics.
- Increased Risk of Targeted Theft:
Example: By exposing your public key, you increase the risk of becoming a target for hackers, especially if your wallet holds a substantial amount of value. Hackers might use sophisticated methods like dusting attacks (sending small amounts of cryptocurrency to known wallets) to confirm the wallet’s activity and then employ various strategies to compromise your wallet or devices.
- Security Through Obscurity:
Example: Although not a primary security strategy, keeping your public key private adds an additional layer of security through obscurity. Without access to your public key, malicious actors are hindered in their ability to specifically target your assets. This extra layer of obscurity can be particularly important in cases where other security measures might be weaker.
- Potential for Future Vulnerabilities:
Example: While current blockchain technologies are considered secure, future advancements in computing, such as quantum computing, could potentially break the cryptographic algorithms that protect public keys. If your public key has been widely shared and associated with significant assets, it could make your funds a more tempting target when and if such vulnerabilities are discovered.

**So I'm trying to create a way in which u don't share your public key for recieving money.**

## 1. Inspiration behind making this
-  In a digital era where privacy is increasingly becoming a luxury, ZK Mask P2P stands as a beacon of hope, promising a future where financial transactions remain confidential and secure. Imagine a world where your financial identity is shielded, where each transaction you make doesn’t leave a trail that could be traced back to your personal life. With ZK Mask P2P, this isn’t just a possibility—it's a reality.

- Harnessing the revolutionary power of zero-knowledge proofs, ZK Mask P2P is not just an innovation; it's a commitment to privacy and security. Each link generated by our system is a fortress, guarding the transaction details within, visible only to those who are meant to see it. By converting intricate details into a simple, secure link, we ensure that the user's public address remains an enigma, known only to them.

- In a landscape where trust is hard-earned and easily lost, ZK Mask P2P rebuilds that trust, transaction by transaction, without ever compromising on the anonymity of our users. It's not just about protecting assets; it's about preserving the very essence of freedom in every transaction.

## 2. WorkFlow
1. Initialization:
- User Input: The user decides on the amount they wish to receive.
- Hash Generation: Using a combination of the current date, time (down to milliseconds), and the specified amount, the system generates a unique hash.
2. Link Creation:
- Link Parameters: The hash and the specified amount are embedded into a unique URL.
- Zero-Knowledge Proof Generation: The system, leveraging **Sindri and Noir circuits**, generates a zero-knowledge proof corresponding to the hash and amount without revealing the user's private details.
3. Payment Invitation:
- Sending the Link: The user sends this link to the payee via any preferred communication method.
- Link Access: The payee accesses the link which redirects them to a payment interface.
4. Payment Execution:
- Currency Choice: The payee chooses to pay either in ScrollCoin or ScrollETH, with equivalent values calculated in real-time via **Chainlink Price Feeds**.
- Smart Contract Interaction: The payee submits the payment to a designated smart contract.
5. Claim Process:
- Ownership Proof Submission: To withdraw the funds, the user submits the hash, the encrypted amount, and the zero-knowledge proof to the smart contract.
- On-Chain Verification: The smart contract validates the proof against the stored hash and amount.
6. Funds Transfer:
- Releasing Funds: Upon successful verification, the smart contract transfers the funds to the user’s wallet.
- Proof Nullification: The system nullifies the used proof to ensure it cannot be reused, maintaining the integrity of the transaction.
7. Transaction Anonymity:
- Privacy Preservation: Throughout the process, the public addresses of both the user and the payee remain concealed, ensuring total anonymity.
- Blockchain Record: The transaction is recorded on the blockchain as a normal transfer, without any links to the user's or payee's identity.
## 3. Diagram
<img width="1259" alt="ZKMaskWorkflow" src="https://github.com/Dwaipayan25/ZKMaskP2P/assets/91361409/fee9c449-6105-4e7f-8aaa-00bb43bf15a6">

## 4. Brief overview of the technologies used in the ZK-Mask-P2P :
### 4.1 NOIR and Sindri CLI:
- Circuits: The project utilizes NOIR, a domain-specific language for writing zero-knowledge circuits, to define the cryptographic operations needed for generating and verifying proofs. Here the circuit is written in ```cd is-equal/src ```. You can also look at the circuit here [Circuits folder in repo](https://github.com/Dwaipayan25/ZKMaskP2P/tree/master/is-equal)
- Sindri CLI: This command-line tool compiles the written circuits into executable code and generates the zero-knowledge proofs. The proofs are then integrated into the project's ecosystem to ensure transaction privacy and security.
- Sindri TypeScript SDK: Facilitates developer interaction with the Sindri API, allowing them to compile circuits and generate proofs programmatically. This SDK streamlines the process of incorporating zero-knowledge proofs into applications, enhancing both development efficiency and application performance. [Use of Sindri TS SDK](https://github.com/Dwaipayan25/ZKMaskP2P/blob/master/compile.ts) , [Generating proof using Sindri TS SDK](https://github.com/Dwaipayan25/ZKMaskP2P/blob/master/prove.ts)
### 4.2 Chainlink Price Feed
- Purpose of Chainlink Price Feeds:
   The project uses Chainlink Price Feeds to obtain real-time price data for ETH/USD. This data is crucial for determining the value of ETH relative to USD, enabling the conversion between ScrollCoin and ScrollETH.  [Line no: 6,33,55,60,84,88: are major parts where I used ETH/USD price feed to change things onChain](https://github.com/Dwaipayan25/ZKMaskP2P/blob/master/smart_contracts/src/CustomLogic.sol)
- Conversion Mechanism:
   The equivalence of 1 wei of ScrollCoin to 1 USDC is a key part of the project's design. By leveraging the ETH/USD price feed from Chainlink, the smart contracts can dynamically calculate the amount of ScrollETH equivalent to a given amount of ScrollCoin based on the current USD value of ETH.
  This conversion allows users to transact seamlessly in either ScrollCoin or ScrollETH, depending on their preference or the requirements of the transaction, without needing to manually calculate exchange rates.
- Integration in Smart Contracts:
   - The ```CustomLogic.sol``` smart contract integrates the Chainlink Price Feed to fetch the current ETH/USD price. 
   - This allows Flexibility in Transactions.
   - Also secure and Reliable
### 4.3 Solidity and Smart Contracts:
- **verifier.sol**: A smart contract generated by Sindri, based on the NOIR circuit, that verifies zero-knowledge proofs to ensure that only legitimate transactions are processed.
- **ScrollCoin.sol**: An ERC20 token created on the Scroll Chain, used within the platform for transactions, providing a custom cryptocurrency option for users.
- **CustomLogic.sol**: The core smart contract where all critical operations occur, including the transfer and receipt of funds, as well as the verification and nullification of proofs to prevent reuse and ensure transaction integrity.

## 5. How to start with it
1. Clone the Repo: ```git clone https://github.com/Dwaipayan25/ZKMaskP2P.git```
2. ```cd ZKMaskP2P```
3. ```npm install```
4. Run ```npx sindri login``` and enter your ```username``` and ```password``` to create a new API key that is stored persistently in a configuration file in your home directory (see sindri login docs). This configuration file is sourced by both the CLI and the SDK by default.
5. Run the server ```node backend.js```
6. Go to smart Contract ```cd smart_contracts``` paste your own ```Verifier.sol ``` (or you can continue with the already provided one)
7. Go to frontend ```cd frontend```
8. Run ```npm install```
9. ```npm run start``` enjoy running the project


## 6. What's next for ZKMaskP2P?
1. Think of ways to Enhance Security for Hash Generation
2. Learn some Advanced Zero-Knowledge Proof Techniques and apply that
3. Improved Currency Conversion Mechanisms: Multi-Currency Support, Dynamic Adjustment
4. User Interface and Experience Enhancements: Mobile Integration, User-Centered Design

## Deployed & Verified Contract Links on Sepoila:
1. https://sepolia.scrollscan.dev/address/0x1e066480866e5588a38d7749d17d098a187b2f1b
2. https://sepolia.scrollscan.dev/address/0xd816998606256a0e1a23c3E01638774824248d93
3. https://sepolia.scrollscan.dev/address/0x66725A0d3A992B83E5c4A793D49D60479075598a
