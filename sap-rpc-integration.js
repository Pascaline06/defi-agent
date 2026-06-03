const { Connection, PublicKey, SystemProgram, Transaction, Keypair, sendAndConfirmTransaction } = require('@solana/web3.js');
const bs58 = require('bs58');
const config = require('./config');

class SAPRPCIntegration {
  constructor() {
    this.connection = null;
    this.wallet = null;
    this.agentPDA = null;
    this.registered = false;
    
    // SAP Program constants
    this.SAP_PROGRAM_ID = new PublicKey('SAPpUhsWLJG1FfkGRcXagEDMrMsWGjbky7AyhGpFETZ');
    this.SYNAPSE_RPC_URL = config.solana.rpcUrl;
  }

  async initialize() {
    try {
      console.log('🔗 Initializing SAP RPC Connection...');
      
      // Connect to Synapse RPC
      this.connection = new Connection(this.SYNAPSE_RPC_URL, 'confirmed');
      
      // Load wallet from private key
      const privateKeyString = config.solana.privateKey;
      let secretKey;
      
      if (privateKeyString.startsWith('[')) {
        const arr = JSON.parse(privateKeyString);
        secretKey = new Uint8Array(arr);
      } else {
        throw new Error('Invalid private key format');
      }
      
      this.wallet = Keypair.fromSecretKey(secretKey);
      
      // Test connection
      const balance = await this.connection.getBalance(this.wallet.publicKey);
      
      console.log('✅ SAP RPC Initialized');
      console.log(`   Wallet: ${this.wallet.publicKey.toString()}`);
      console.log(`   Balance: ${balance / 1e9} SOL`);
      console.log(`   RPC: ${this.SYNAPSE_RPC_URL}`);
      console.log(`   SAP Program: ${this.SAP_PROGRAM_ID.toString()}`);
      
      return true;
    } catch (error) {
      console.error('SAP RPC initialization error:', error.message);
      throw error;
    }
  }

  // Derive PDA for agent
  async deriveAgentPDA(agentName) {
    try {
      // Use hash of name to keep seed short
      const crypto = require('crypto');
      const nameHash = crypto.createHash('sha256').update(agentName).digest().slice(0, 16);
      
      const [pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('agent'),
          this.wallet.publicKey.toBuffer(),
          nameHash,
        ],
        this.SAP_PROGRAM_ID
      );
      
      this.agentPDA = pda;
      return pda;
    } catch (error) {
      console.error('PDA derivation error:', error.message);
      throw error;
    }
  }

  // Register agent on-chain
  async registerAgent(agentName, description) {
    try {
      console.log('📝 Registering agent on SAP mainnet via RPC...');
      
      // Derive agent PDA
      const agentPDA = await this.deriveAgentPDA(agentName);
      console.log(`   Agent PDA: ${agentPDA.toString()}`);
      
      // Build registration instruction (simplified Solana instruction)
      const registrationData = Buffer.alloc(1000);
      let offset = 0;
      
      // Instruction discriminator for register (0 = register)
      registrationData[offset++] = 0;
      
      // Write name length and data
      const nameBuffer = Buffer.from(agentName);
      registrationData.writeUInt32LE(nameBuffer.length, offset);
      offset += 4;
      nameBuffer.copy(registrationData, offset);
      offset += nameBuffer.length;
      
      // Write description length and data
      const descBuffer = Buffer.from(description);
      registrationData.writeUInt32LE(descBuffer.length, offset);
      offset += 4;
      descBuffer.copy(registrationData, offset);
      offset += descBuffer.length;
      
      // Trim to actual size
      const trimmedData = registrationData.slice(0, offset);
      
      // Create instruction
      const instruction = {
        programId: this.SAP_PROGRAM_ID,
        keys: [
          { pubkey: agentPDA, isSigner: false, isWritable: true },
          { pubkey: this.wallet.publicKey, isSigner: true, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: trimmedData,
      };
      
      // Build and send transaction
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = this.wallet.publicKey;
      
      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      
      console.log('   Signing transaction...');
      transaction.sign(this.wallet);
      
      console.log('   Submitting to SAP mainnet...');
      const signature = await sendAndConfirmTransaction(this.connection, transaction, [this.wallet]);
      
      this.registered = true;
      
      console.log('✅ Agent registered on SAP mainnet!');
      console.log(`   TX Signature: ${signature}`);
      console.log(`   Agent PDA: ${agentPDA.toString()}`);
      console.log(`   🔍 View: https://solscan.io/tx/${signature}`);
      console.log(`   🔍 Agent: https://explorer.oobeprotocol.ai/agents/${agentPDA.toString()}`);
      
      return {
        success: true,
        signature: signature,
        agentPDA: agentPDA.toString(),
        txHash: signature,
      };
    } catch (error) {
      console.error('Agent registration error:', error.message);
      console.log('   ℹ️  Note: Agent registration requires SOL for transaction fees');
      console.log('   Make sure you have SOL in your wallet');
      throw error;
    }
  }

  // Execute tool on-chain with x402 payment
  async executeTool(toolId, input) {
    try {
      console.log(`⚙️ Executing tool on-chain: ${toolId}`);
      
      // Build tool execution instruction
      const toolData = Buffer.alloc(500);
      let offset = 0;
      
      // Instruction discriminator for execute (1 = execute)
      toolData[offset++] = 1;
      
      // Write tool ID
      const toolBuffer = Buffer.from(toolId);
      toolData.writeUInt32LE(toolBuffer.length, offset);
      offset += 4;
      toolBuffer.copy(toolData, offset);
      offset += toolBuffer.length;
      
      // Write input
      const inputBuffer = Buffer.from(JSON.stringify(input));
      toolData.writeUInt32LE(inputBuffer.length, offset);
      offset += 4;
      inputBuffer.copy(toolData, offset);
      offset += inputBuffer.length;
      
      const trimmedData = toolData.slice(0, offset);
      
      // Create instruction
      const instruction = {
        programId: this.SAP_PROGRAM_ID,
        keys: [
          { pubkey: this.agentPDA, isSigner: false, isWritable: true },
          { pubkey: this.wallet.publicKey, isSigner: true, isWritable: true },
        ],
        data: trimmedData,
      };
      
      // Build and send transaction
      const transaction = new Transaction().add(instruction);
      transaction.feePayer = this.wallet.publicKey;
      
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      
      transaction.sign(this.wallet);
      
      const signature = await sendAndConfirmTransaction(this.connection, transaction, [this.wallet]);
      
      console.log(`   ✅ Tool executed`);
      console.log(`   TX: ${signature}`);
      
      return {
        success: true,
        signature: signature,
        tool: toolId,
      };
    } catch (error) {
      console.error('Tool execution error:', error.message);
      throw error;
    }
  }

  // Get agent info from chain
  async getAgentInfo() {
    try {
      if (!this.agentPDA) {
        return null;
      }
      
      const accountInfo = await this.connection.getAccountInfo(this.agentPDA);
      return accountInfo;
    } catch (error) {
      console.error('Get agent info error:', error.message);
      return null;
    }
  }

  isRegistered() {
    return this.registered;
  }

  getExplorerUrl() {
    if (!this.agentPDA) return null;
    return `https://explorer.oobeprotocol.ai/agents/${this.agentPDA.toString()}`;
  }
}

module.exports = SAPRPCIntegration;
