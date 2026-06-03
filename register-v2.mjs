import { Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { SapClient } from '@oobe-protocol-labs/synapse-sap-sdk';
import bs58 from 'bs58';

async function register() {
    console.log("🔗 Connecting to Solana Mainnet...");
        
            const secretKeyEnv = process.env.SOLANA_PRIVATE_KEY;
                if (!secretKeyEnv) {
                        console.error("❌ Error: SOLANA_PRIVATE_KEY environment variable is missing.");
                                return;
                                    }

                                        let walletKeypair;
                                            try {
                                                    const cleanedKey = secretKeyEnv.trim();
                                                            if (cleanedKey.startsWith('[')) {
                                                                        walletKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(cleanedKey)));
                                                                                } else {
                                                                                            walletKeypair = Keypair.fromSecretKey(bs58.decode(cleanedKey));
                                                                                                    }
                                                                                                        } catch (err) {
                                                                                                                console.error("❌ Failed to parse private key.");
                                                                                                                        return;
                                                                                                                            }

                                                                                                                                const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
                                                                                                                                    const wallet = new Wallet(walletKeypair);
                                                                                                                                        const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
                                                                                                                                            const client = new SapClient(provider);

                                                                                                                                                console.log("🚀 Executing registration with all 8 required arguments...");
                                                                                                                                                    try {
                                                                                                                                                            // We pass all 8 arguments in the exact order the live contract demands
                                                                                                                                                                    const txSignature = await client.methods
                                                                                                                                                                                .registerAgent(
                                                                                                                                                                                                "Ace Data Agent",               // 1. name
                                                                                                                                                                                                                "OOBE bounty autonomous agent", // 2. description
                                                                                                                                                                                                                                [],                             // 3. capabilities (empty array)
                                                                                                                                                                                                                                                [],                             // 4. pricing (empty array)
                                                                                                                                                                                                                                                                [],                             // 5. protocols (empty array)
                                                                                                                                                                                                                                                                                null,                           // 6. agentId (optional)
                                                                                                                                                                                                                                                                                                null,                           // 7. agentUri (optional)
                                                                                                                                                                                                                                                                                                                null                            // 8. x402Endpoint (optional)
                                                                                                                                                                                                                                                                                                                            )
                                                                                                                                                                                                                                                                                                                                        .accounts({
                                                                                                                                                                                                                                                                                                                                                        wallet: walletKeypair.publicKey // Attaching the wallet exactly as required
                                                                                                                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                                                                                                                                .rpc();

                                                                                                                                                                                                                                                                                                                                                                                        console.log(`\n🎉 TRANSACTION SUCCESS!`);
                                                                                                                                                                                                                                                                                                                                                                                                console.log(`🔗 Transaction Hash: ${txSignature}`);
                                                                                                                                                                                                                                                                                                                                                                                                        console.log(`💡 Copy the hash string above to submit as your proof!`);
                                                                                                                                                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                                    console.error("\n❌ On-chain execution failed:", error.message || error);
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                        register();