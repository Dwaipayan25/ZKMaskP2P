// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {AggregatorV3Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ScrollCoin.sol";

interface INoirVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

contract NoirCustomLogic {
    INoirVerifier public noirVerifier;
    AggregatorV3Interface internal dataFeed;
    IERC20 token;

    uint public publicInput;
    
    mapping(bytes32 => bool) public nullifiers;
    mapping(bytes32 => uint256) public HashToAmountMap;

    constructor(address noirVeriferAddress, address tokenAddress, address dataFeedAddress) {
        noirVerifier = INoirVerifier(noirVeriferAddress);
        token = IERC20(tokenAddress);
        dataFeed = AggregatorV3Interface(dataFeedAddress);
    }

    function sendProof(bytes calldata _proof, bytes32[] calldata _publicInputs) public {
        // ZK verification
        noirVerifier.verify(_proof, _publicInputs);

        // Ensure proof is fresh
        require(!nullifiers[_publicInputs[1]], "Proof already nullified");
        publicInput = uint(_publicInputs[0]);
        nullifiers[_publicInputs[1]] = true;
    }

    function bytes32ToUint256(bytes32 b) public pure returns (uint256) {
        return uint256(b);
    }

    function customerPaying(bytes32[] calldata _publicInputs, uint256 choice) public payable {
        HashToAmountMap[_publicInputs[1]] = bytes32ToUint256(_publicInputs[0]);

        if (choice == 0) {
            // Token transfer from msg.sender to this contract
            uint256 amount = bytes32ToUint256(_publicInputs[0]);
            // Ensure this Contract address is approved to pull the amount then transfer it.
            require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        } else if (choice == 1) {
            // ETH transfer from msg.sender to this contract
            // Convert the amount of ScrollCoin to equivalent ETH based on latest price from Chainlink
            uint256 scrollCoinAmount = bytes32ToUint256(_publicInputs[0]);
            int latestPrice = getChainlinkDataFeedLatestAnswer();  // ScrollCoins per ETH
            uint256 priceScale = 1e8;  // Chainlink prices are often scaled by 1e8

            // Calculate the necessary ETH amount: we need to divide ScrollCoin amount by ScrollCoin per ETH
            // But first, scale up ScrollCoin amount to adjust for the division (to avoid truncation errors)
            uint256 ethAmountRequired = (scrollCoinAmount * priceScale) / uint256(latestPrice);

            // Check if the sent ETH matches the required amount
            require(msg.value == ethAmountRequired, "Incorrect ETH amount sent");
        }
    }


    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            ,
            int answer,
            ,
            ,
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function userReceiving(bytes calldata _proof, bytes32[] calldata _publicInputs, uint256 choice) public {
        
        noirVerifier.verify(_proof, _publicInputs);

        require(!nullifiers[_publicInputs[1]], "Proof already nullified");
        require(HashToAmountMap[_publicInputs[1]] != 0, "Transaction not funded");

        uint256 amountToTransfer = bytes32ToUint256(_publicInputs[0]);

        if (choice == 0) {
            bool success = token.transfer(msg.sender, amountToTransfer);
            require(success, "Transfer failed: insufficient tokens");
        } else if (choice == 1) {
            // Get the current price from Chainlink
            int latestPrice = getChainlinkDataFeedLatestAnswer();

            // Calculate the amount of ETH to send based on the latest price
            // Assume latestPrice is the price of 1 ETH in terms of Scroll Coins
            uint256 ethAmount = (amountToTransfer * 1e18) / (uint256(latestPrice)/1e8);

            // Transfer ETH to msg.sender
            (bool sent, ) = msg.sender.call{value: ethAmount}("");
            require(sent, "Failed to send Ether");
        }

        nullifiers[_publicInputs[1]] = true;
    }
}
