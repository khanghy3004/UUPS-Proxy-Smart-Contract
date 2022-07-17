// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./HeroesTdProxy.sol";

contract HeroesTdProxyV2 is HeroesTdProxy {
    function multiTransferV2(address _to, uint256 nftId) public {
        IERC721(heroesNftAddress).safeTransferFrom(msg.sender, _to, nftId);
    }
    function HeroesTdProxyVersion() external pure returns (uint256) {
        return 2;
    }
}