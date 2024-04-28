// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script,console} from "forge-std/Script.sol";
import {NoirCustomLogic} from "../src/CustomLogic.sol";


contract DeployCustomLogic is Script{
    function run() public{
        address noirVerifier=0x66725A0d3A992B83E5c4A793D49D60479075598a;
        address token=0x1E066480866E5588a38d7749d17D098A187B2f1b;
        address priceFeed=0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41;
        vm.startBroadcast();
            NoirCustomLogic noirCustomLogic = new NoirCustomLogic(noirVerifier,token,priceFeed);
        vm.stopBroadcast();
    }
}

// forge script script/DeployCustomLogic.s.sol --rpc-url $URL --private-key $PKEY --broadcast

// Contract Address: 0xd816998606256a0e1a23c3E01638774824248d93

// forge verify-contract 0xd816998606256a0e1a23c3E01638774824248d93 NoirCustomLogic --verifier-url $vurl --etherscan-api-key $sAPI --constructor-args $(cast abi-encode "constructor(address,address,address)" 0x66725A0d3A992B83E5c4A793D49D60479075598a 0x1E066480866E5588a38d7749d17D098A187B2f1b 0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41)

// https://sepolia.scrollscan.dev/address/0xd816998606256a0e1a23c3E01638774824248d93