const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const config = require('./config');

class SolanaClient {
  constructor() {
    this.connection = new Connection(config.solana.rpcUrl, 'confirmed');
    this.keypair = this.loadKeypair();
  }

  loadKeypair() {
    try {
      const privateKeyString = config.solana.privateKey;
      
      if (!privateKeyString) {
        throw new Error('No private key found in .env');
      }

      let secretKey;
      
      if (privateKeyString.startsWith('[') || privateKeyString.includes(',')) {
        // JSON array format: [1,2,3,...]
        const arr = JSON.parse(privateKeyString);
        secretKey = new Uint8Array(arr);
      } else {
        throw new Error('Please use JSON array format for private key in .env');
      }

      return Keypair.fromSecretKey(secretKey);
    } catch (error) {
      console.error('Failed to load keypair:', error.message);
      throw new Error('Invalid private key format');
    }
  }

  getPublicKey() {
    return this.keypair.publicKey.toString();
  }

  async getBalance() {
    try {
      const balance = await this.connection.getBalance(this.keypair.publicKey);
      return balance / 1e9;
    } catch (error) {
      console.error('Balance fetch error:', error.message);
      throw error;
    }
  }

  async getRecentTransactions(limit = 10) {
    try {
      const signatures = await this.connection.getSignaturesForAddress(
        this.keypair.publicKey,
        { limit }
      );
      return signatures;
    } catch (error) {
      console.error('Transaction fetch error:', error.message);
      throw error;
    }
  }

  async monitorDEXActivity() {
    try {
      const transactions = await this.getRecentTransactions(20);
      const dexActivities = [];

      for (const tx of transactions) {
        if (tx.blockTime) {
          dexActivities.push({
            signature: tx.signature,
            slot: tx.slot,
            timestamp: tx.blockTime,
          });
        }
      }

      return dexActivities;
    } catch (error) {
      console.error('DEX monitoring error:', error.message);
      throw error;
    }
  }
}

module.exports = SolanaClient;
