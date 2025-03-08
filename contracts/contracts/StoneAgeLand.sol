// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StoneAgeLand is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct Land {
        uint256 id;
        address owner;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => Land) public lands;
    mapping(address => uint256[]) public ownerLands;

    event LandMinted(uint256 indexed landId, address indexed owner, uint256 price);
    event LandTransferred(uint256 indexed landId, address indexed from, address indexed to, uint256 price);
    event LandListedForSale(uint256 indexed landId, uint256 price);
    event LandDelistedFromSale(uint256 indexed landId);

    constructor() ERC721("StoneAgeLand", "SAL") Ownable(msg.sender) {}

    function mintLand(uint256 price, string memory tokenURI) external onlyOwner {
        _tokenIds++;
        uint256 newLandId = _tokenIds;

        lands[newLandId] = Land(newLandId, msg.sender, price, false);
        ownerLands[msg.sender].push(newLandId);

        _mint(msg.sender, newLandId);
        _setTokenURI(newLandId, tokenURI);

        emit LandMinted(newLandId, msg.sender, price);
    }

    function transferLand(uint256 landId, address newOwner) external {
        require(ownerOf(landId) == msg.sender, "You do not own this land");
        require(lands[landId].forSale, "Land is not for sale");

        lands[landId].owner = newOwner;
        lands[landId].forSale = false;

        _transfer(msg.sender, newOwner, landId);
        
        emit LandTransferred(landId, msg.sender, newOwner, lands[landId].price);
    }

    function listLandForSale(uint256 landId, uint256 price) external {
        require(ownerOf(landId) == msg.sender, "You do not own this land");
        lands[landId].forSale = true;
        lands[landId].price = price;

        emit LandListedForSale(landId, price);
    }

    function delistLandFromSale(uint256 landId) external {
        require(ownerOf(landId) == msg.sender, "You do not own this land");
        lands[landId].forSale = false;

        emit LandDelistedFromSale(landId);
    }
}

contract StoneAgeEquipment is ERC1155, Ownable {
    uint256 private _equipmentIds;

    mapping(uint256 => string) private _equipmentURIs;

    event EquipmentMinted(uint256 indexed equipmentId, address indexed owner, uint256 amount);

    constructor() ERC1155("") Ownable(msg.sender) {}

    function mintEquipment(address account, uint256 amount, string memory tokenURI) external onlyOwner {
        _equipmentIds++;
        uint256 newEquipmentId = _equipmentIds;
        
        _mint(account, newEquipmentId, amount, "");
        _equipmentURIs[newEquipmentId] = tokenURI;

        emit EquipmentMinted(newEquipmentId, account, amount);
    }
    
    function uri(uint256 tokenId) override public view returns (string memory) {
        return _equipmentURIs[tokenId];
    }
}

