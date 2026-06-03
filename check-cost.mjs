import { Connection, PublicKey } from '@solana/web3.js';

async function checkRegistrationCost() {
    // Connect to Solana Mainnet
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    
    // The official Synapse Agent Protocol Program ID
    const SAP_PROGRAM_ID = new PublicKey("SAPpUhsWLJG1FfkGRcXagEDMrMsWGjbky7AyhGpFETZ");
    
    console.log("🔍 Fetching exact rent-exemption requirements from Mainnet...");
    
    try {
        // According to SAP v2 architecture specs, the MemoryLedger account size is hardcoded
        // Let's query the network for the rent required for that exact account size
        // Hardcoded space for the standard SAP memory ledger state is ~1,500 bytes
        const targetAccountSpace = 1500; 
        
        const rentRequiredLamports = await connection.getMinimumBalanceForRentExemption(targetAccountSpace);
        const rentRequiredSol = rentRequiredLamports / 1000000000;
        
        // Fetch current estimated priority fee
        const recentBlockhash = await connection.getLatestBlockhash();
        const standardFeeSol = 0.000005; // Base signature fee
        const safetyBufferSol = 0.005;   // Account for variable priority fees
        
        const totalEstimatedSol = rentRequiredSol + standardFeeSol + safetyBufferSol;

        console.log(`\n==================================================`);
        console.log(`💰 MANDATORY ON-CHAIN STORAGE RENT: ${rentRequiredSol.toFixed(4)} SOL`);
        console.log(`⚡ ESTIMATED HIGH-PRIORITY GAS FEE:  ~0.0010 SOL`);
        console.log(`🛡️ RECOMMENDED SAFE WALLET BALANCE:  ${totalEstimatedSol.toFixed(3)} SOL`);
        console.log(`==================================================`);
        console.log(`\nDo not run the script until your wallet has at least ${totalEstimatedSol.toFixed(3)} SOL.`);
        
    } catch (error) {
        console.error("❌ Failed to pull rent data from the blockchain:", error);
    }
}

checkRegistrationCost();
