const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { BlockChain, Transaction } = require('./blockchain/BlockChain');

const myKey = ec.keyFromPrivate(
  '44cc63dfeaa6a364481e901105cb033aebe1cf297b24c130de23f5087382133c'
);
const walletAddress = myKey.getPublic('hex');

let MyCoin = new BlockChain();
MyCoin.minePendingTransactions(walletAddress);

const tx1 = new Transaction(walletAddress, 'testing public key', 10);
tx1.signTransaction(myKey);

MyCoin.addTransaction(tx1);
MyCoin.addTransaction(tx1);

console.log('Starting mining');
MyCoin.minePendingTransactions(walletAddress);
console.log('My balance: ', MyCoin.getBalanceOfAddress(walletAddress));

console.log('History? ', MyCoin.getHistoryOfAddress(walletAddress));
