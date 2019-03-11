const SHA256 = require('crypto-js/sha256');

class Block {
  // The index is optional and it tell us where the block is on the chain
  // The timestamp tell us when the block was created
  // Data includes any type of data that you want to associate with the block -How much mony was transfered and who is the sender and the reciver
  // The previous hash is a string that contains the hash of the block before this one - This is very important and ensures the importance of the blockchain

  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    // This would be an array of blocks
    // The first block on a blockchain is called a GENESIS block and it should be added manually
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "11/03/2019", "Genesis block", "0");
  }
}