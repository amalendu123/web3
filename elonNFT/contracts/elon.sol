// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract ElonNFT is ERC721URIStorage {

    //Counters.Counter private _tokenIds -- replaced with below
    uint private _tokenIds;

    constructor() ERC721("ElonMusk", "ELON") {}

    function mintNFT() public returns (uint256) {
        // _tokenIds.increment() -- replaced with below
        _tokenIds++;
        //uint256 newItemId = _tokenIds.current(); -- replaced with below
        uint newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, "https://ivory-left-antelope-293.mypinata.cloud/ipfs/QmcErAXBSmTkih9id61JcotCuwaSdUneXW5mrVQSzxUGpe?_gl=1*awo1qr*_ga*NjQ1NTc3NzIyLjE3MDA5ODE1OTU.*_ga_5RMPXG14TE*MTcwMDk4MTU5NC4xLjEuMTcwMDk4MjY3Mi42MC4wLjA.");
        console.log(
            "The NFT ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        return newItemId;
    }
}
