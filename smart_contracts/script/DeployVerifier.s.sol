// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script,console} from "forge-std/Script.sol";
import {UltraVerifier} from "../src/verifier.sol";


contract DeployVerifier is Script{
    function run() public{
        vm.startBroadcast();
            UltraVerifier ultraVerifier = new UltraVerifier();
        vm.stopBroadcast();
    }
    
}

// forge script script/DeployVerifier.s.sol --rpc-url $URL --private-key $PKEY --broadcast

// Contract Address: 0x66725A0d3A992B83E5c4A793D49D60479075598a

// forge verify-contract 0x66725A0d3A992B83E5c4A793D49D60479075598a UltraVerifier --verifier-url $vurl --etherscan-api-key $sAPI 

// https://sepolia.scrollscan.dev/address/0x66725A0d3A992B83E5c4A793D49D60479075598a