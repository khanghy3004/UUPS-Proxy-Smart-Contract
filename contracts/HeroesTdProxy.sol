// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// Open Zeppelin libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract HeroesTdProxy is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    address heroesNftAddress;

    ///@dev no constructor in upgradable contracts. Instead we have initializers
    function initialize(address _heroesNftAddress) public initializer {
        heroesNftAddress = _heroesNftAddress;

        ///@dev as there is no constructor, we need to inititalze the OwnableUpgradeable explicitly
        __Ownable_init();
    }

    ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function multiTransfer(address _to, uint256[] calldata listNftId) public {
        require(listNftId.length > 0, "listNftId is empty");
        require(listNftId.length <= 100, "listNftId is too long");

        for (uint256 i = 0; i < listNftId.length; i++) {
            uint256 nftId = listNftId[i];
            // check nft in walet
            try IERC721(heroesNftAddress).ownerOf(nftId) {
                if (IERC721(heroesNftAddress).ownerOf(nftId) == msg.sender) {
                    IERC721(heroesNftAddress).safeTransferFrom(msg.sender, _to, nftId);
                } 
            } catch {
                // do nothing
            }
        }
    }
}