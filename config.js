require('dotenv').config();

module.exports = {
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    privateKey: process.env.SOLANA_PRIVATE_KEY,
  },
  aceDataCloud: {
    apiKey: process.env.ACE_DATA_CLOUD_API_KEY,
    apiUrl: process.env.ACE_DATA_CLOUD_API_URL || 'https://api.acedata.cloud',
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET,
  },
  // Agent settings
  agent: {
    name: 'DeFi Intelligence Agent',
    pollInterval: 30000, // Check every 30 seconds
    maxRetries: 3,
  },
};
