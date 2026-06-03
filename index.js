const DeFiIntelligenceAgent = require('./agent');

async function main() {
  const agent = new DeFiIntelligenceAgent();

  // Initialize the agent
  const initialized = await agent.initialize();
  if (!initialized) {
    console.error('Failed to initialize agent');
    process.exit(1);
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n⚠️ Shutdown signal received');
    agent.stop();
    process.exit(0);
  });

  // Start the event loop
  // This will run continuously, monitoring for events
  await agent.runEventLoop();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
