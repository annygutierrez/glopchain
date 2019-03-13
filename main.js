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

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    // Set the previous block to the last block on the chain
    newBlock.previousHash = this.getLatestBlock().hash;
    //  We need to recalculate its hash, so everytime we change any of its properties
    // in our block the hash function should be changed as well
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  
  // To verify the integrity of our blockchain
  isChainValid() {
    // We are NOT going to start with block 0 because block 0 is a genesis block
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i- 1];

      // Check if the hash of the block is still valid
      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if our block point to the correct previus block
      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Let's test it

let glopcoin = new Blockchain();
glopcoin.addBlock(new Block(1, "11/03/2019", { amount: 4 }));
glopcoin.addBlock(new Block(2, "11/03/2019", { amount: 10 }));

console.log('Is blockchain valid? ' + glopcoin.isChainValid());
console.log(JSON.stringify(glopcoin, null, 4));
