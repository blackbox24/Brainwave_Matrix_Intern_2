// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductChainTracking {
    struct Product {
        uint256 id;
        string name;
        string manufacturer;
        string currentLocation;
        uint256 timestamp;
        address owner;
    }

    Product[] allproducts;
    mapping(uint256 => Product) public products;
    uint256 public productCounter;

    event ProductRegistered(uint256 productId, string name, string manufacturer, address owner);
    event ProductTransferred(uint256 productId, address from, address to, string newLocation);

    function registerProduct(string memory _name, string memory _manufacturer, string memory _currentLocation) public {
        productCounter++;
        allproducts.push(Product(productCounter,_name,_manufacturer,_currentLocation,block.timestamp,msg.sender));
        products[productCounter] = Product(productCounter, _name, _manufacturer, _currentLocation,block.timestamp, msg.sender);
        emit ProductRegistered(productCounter, _name, _manufacturer, msg.sender);
    }

    function transferProduct(uint256 _productId, address _newOwner, string memory _newLocation) public {
        require(products[_productId].owner == msg.sender, "Only the owner can transfer the product");
        products[_productId].owner = _newOwner;
        products[_productId].currentLocation = _newLocation;
        emit ProductTransferred(_productId, msg.sender, _newOwner, _newLocation);
    }

    function getProduct(uint256 _productId) public view returns (Product memory) {
        return products[_productId];
    }

    function getAllProduct() public view returns (Product[] memory){
        return allproducts;
    }
}
