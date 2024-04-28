// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script,console} from "forge-std/Script.sol";
import {ScrollCoin} from "../src/ScrollCoin.sol";


contract Deploy is Script{
    function run() public{
        vm.startBroadcast();
            ScrollCoin scrollCoin = new ScrollCoin();
        vm.stopBroadcast();
    }
    
}

// forge script script/Deploy.s.sol --rpc-url $URL --private-key $PKEY --broadcast

//scrollcoin: 0x1E066480866E5588a38d7749d17D098A187B2f1b
//url: https://sepolia.scrollscan.dev/address/0x1e066480866e5588a38d7749d17d098a187b2f1b