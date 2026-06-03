const { Connection, PublicKey, SystemProgram, Transaction, Keypair } = require('@solana/web3.js');

async function checkFees() {
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
  
  // Create dummy transaction
  const dummyKeypair = Keypair.generate();
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: dummyKeypair.publicKey,
      toPubkey: dummyKeypair.publicKey,
      lamports: 1,
    })
  );
  
  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = dummyKeypair.publicKey;
  
  // Estimate fees
  const fees = await connection.getFeeForMessage(tx.compileMessage());
  
  console.log(`Estimated fee: ${fees} lamports`);
  console.log(`Estimated fee: ${fees / 1e9} SOL`);
  console.log(`\n✅ Safe amount to send: 0.01 SOL (${0.01 * 1e9} lamports)`);
}

checkFees().catch(console.error);
