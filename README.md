```markdown
# AceSentinelBot 🤖⚡

**Autonomous Non-Custodial DeFi Intelligence Agent for Solana**

Registered on **SAP Mainnet** | **3+ Ace Data Cloud Services** | **Real x402 Payments** | **24/7 Autonomous Execution**

---

## 🎯 Executive Summary

AceSentinelBot is a sophisticated, autonomous DeFi intelligence agent built for the **OOBE Protocol × Ace Data Cloud Bounty (Category 2)**. Unlike reactive chatbots, this agent runs as a persistent daemon loop that independently monitors live Solana mainnet USDC transactions, performs multi-service AI analysis, and handles cryptographic settlement—all without human intervention.

**Key Proof:**
- ✅ **SAP Mainnet Registration:** [TX: 5khasy9uopiYt4vpQV8ukaceh12VYS6mhcePBpg8RqLysD4HiGuoAqQN8ZkwiPirweNGfCLMjcGwevFDuTFgg1hr](https://solscan.io/tx/5khasy9uopiYt4vpQV8ukaceh12VYS6mhcePBpg8RqLysD4HiGuoAqQN8ZkwiPirweNGfCLMjcGwevFDuTFgg1hr)
- ✅ **Agent PDA:** `4LALLro2XL66dWafJeQtiQpwfbeKTBUptFA3tDctzynh`
- ✅ **Wallet:** `EZiMfPxaPCcCUZQjFkDRN5jwKjvvEgwC9tJeXgSC8UUp`

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  AceSentinelBot Daemon Loop                 │
│                    (20-second cycles)                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
   ┌─────────┐          ┌──────────┐          ┌─────────┐
   │ Solana  │          │  Ace     │          │   SAP   │
   │ RPC     │          │  Services│          │ Protocol│
   │Mainnet  │          │ (3-tier) │          │  (SDK)  │
   └─────────┘          └──────────┘          └─────────┘
        ↓                     ↓                     ↓
   ┌─────────────────────────────────────────────────────────┐
   │  8-Stage Orchestration Pipeline                         │
   │  1. Ingestion → 2. Discovery → 3. Intelligence          │
   │  4. Analysis → 5. Notification → 6. Storage             │
   │  7. Memory Sync → 8. Settlement                         │
   └─────────────────────────────────────────────────────────┘
        ↓
   Real-time Reports + x402 Crypto Settlement
```

---

## ✨ Core Features

### **1. Real-Time Mainnet Ledger Ingestion**
Directly queries Solana Mainnet-Beta RPC for live USDC transactions (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v). Parses true block slot data and transaction signatures in real-time.

**Evidence:** `report-cycle-*.md` files contain live transaction hashes and block slots from actual mainnet queries.

### **2. Dynamic Tool Discovery Layer**
Uses Synapse Agent Protocol SDK to autonomously resolve Ace Data Cloud service endpoints at runtime via decentralized SAP registry. No hardcoded dependencies.

**Code:** `client.discoverService('ace-data-cloud')` pattern throughout agent loop.

### **3. Multi-Service AI Ingestion Multiplexer**
Processes every detected USDC transaction through **3 parallel Ace Data Cloud services:**

- **Ace Serp API:** Performs organic search engine scraping on wallet addresses to detect public footprints
- **Ace OpenAI Gateway:** Aggregates ledger data + Serp context into GPT-4o inference for structured JSON risk profiles
- **Ace Flux Image Engine:** Renders high-fidelity cinematic data infographics matching agent's cyberpunk aesthetic

**Evidence:** Report files show actual Ace API responses with risk evaluations and image rendering links.

### **4. Live x402 Cryptographic Settlement**
Every generated report triggers autonomous payment verification:
- Builds raw Solana Transaction binary
- Appends live recentBlockhash from mainnet
- Cryptographically signs with agent's private key
- Broadcasts to Solana cluster
- Returns authenticated verification signature

**Proof:** Solscan transaction shows real on-chain settlement with compute units consumed (36,106).

### **5. Autonomous Daemon Loop (Zero Human Dependency)**
Non-blocking async event loop executes infinitely every 20 seconds. Once initialized, requires zero human intervention, clicks, or authorization.

**Deployment:** Running 24/7 on Railway.app with real uptime metrics.

### **6. Self-Healing Graceful Degradation**
If upstream API credits run out (HTTP 429), agent dynamically provisions local fallback inference engines and continues at 100% uptime.

**Code:** Exception handling with local model fallback in `agent-loop-run.js`.

### **7. SAP Memory Framework**
Synchronizes state changes and transaction hashes using SDK's updateState layer for chronological runtime context persistence.

### **8. Network Reputation Matrix**
Dynamic health scoring that adjusts agent status (+0.25% per successful cycle, -2.0% on failure) to preserve network standing across global SAP matrix.

---

## 📊 Category 2 Requirements Met

| Requirement | Status | Proof |
|---|---|---|
| **SAP Mainnet Registration** | ✅ | [Solscan TX](https://solscan.io/tx/5khasy9uopiYt4vpQV8ukaceh12VYS6mhcePBpg8RqLysD4HiGuoAqQN8ZkwiPirweNGfCLMjcGwevFDuTFgg1hr) |
| **3+ Ace Data Cloud Services** | ✅ | Serp, OpenAI, Flux (all in `agent-loop-run.js`) |
| **Real x402 Payments** | ✅ | Live settlement in `report-cycle-*.md` files |
| **Synapse Sentinel Integration** | ✅ | Real-time USDC whale monitoring |
| **Automated Workflow** | ✅ | 20-second daemon loop, zero manual steps |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v24+
- npm or yarn
- Solana devnet/mainnet SOL (for fees)
- Ace Data Cloud API key ([Get free credits](https://platform.acedata.cloud))

### Installation

```bash
git clone https://github.com/Pascaline06/defi-agent.git
cd defi-agent
npm install
```

### Configuration

Create/update `.env`:

```env
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY
ACE_DATA_CLOUD_API_KEY
WEBHOOK_SECRET
```

### Run the Agent

```bash
node agent-loop-run.js
```

Expected output:
```
🔗 Initializing AceSentinelBot...
✅ SAP Registration: 4LALLro2XL66dWafJeQtiQpwfbeKTBUptFA3tDctzynh
✅ Ace Data Cloud: 3 services online
🚀 Starting autonomous daemon loop...

[Cycle 1] Ingesting live USDC transactions...
📊 Found: 248953 USDC transaction
🤖 Running AI intelligence multiplexer...
💸 x402 Settlement: [TX_HASH] [VERIFIED]
```

---

## 📁 Project Structure

```
defi-agent/
├── agent-loop-run.js           # Main autonomous daemon loop
├── config.js                   # Configuration loader
├── package.json                # Dependencies
├── .env                        # Environment variables (gitignored)
│
├── report-cycle-*.md           # Generated real-time reports
├── logs.txt                    # Execution logs
│
└── README.md                   # This file
```

---

## 🔗 Live Proof & Links

| Item | Link |
|---|---|
| **SAP Registration TX** | [Solscan](https://solscan.io/tx/5khasy9uopiYt4vpQV8ukaceh12VYS6mhcePBpg8RqLysD4HiGuoAqQN8ZkwiPirweNGfCLMjcGwevFDuTFgg1hr) |
| **Agent PDA** | `4LALLro2XL66dWafJeQtiQpwfbeKTBUptFA3tDctzynh` |
| **Demo Video** | [https://docs.google.com/videos/d/1INjHUPjnaYAGmwBIsz833yoW_u6GEf3CrUwLKOpcAjc/edit?usp=drivesdk] |
| **Ace Data Cloud** | [API Key Verified] |
| **SAP SDK** | [@oobe-protocol-labs/synapse-sap-sdk v0.19.8](https://www.npmjs.com/package/@oobe-protocol-labs/synapse-sap-sdk) |

---

## 💡 What Makes This Different

Most hackathon DeFi agents are:
- ❌ Reactive (wait for user prompt)
- ❌ Simulated (print statements instead of real transactions)
- ❌ Fragile (crash if API fails)
- ❌ Centralized (require human authorization)

**AceSentinelBot is:**
- ✅ **Autonomous** - Infinite daemon loop, zero human dependency
- ✅ **Real** - Live mainnet integration, actual x402 settlement
- ✅ **Resilient** - Self-healing with graceful degradation
- ✅ **Sophisticated** - Multi-service AI pipeline, memory persistence
- ✅ **Decentralized** - SAP Protocol integration, on-chain verification

---

## 📝 Report Examples

See `report-cycle-1.md` through `report-cycle-7.md` for live execution examples showing:
- Real Solana transaction signatures
- Actual USDC amounts tracked
- Ace API risk evaluations
- Flux image rendering links
- Autonomous execution timestamps

---

## 🛠️ Technologies

- **Blockchain:** Solana (Mainnet-Beta)
- **Agent Protocol:** Synapse Agent Protocol (SAP v0.19.8)
- **RPC:** Solana Web3.js
- **Crypto:** Anchor Framework
- **AI Services:** Ace Data Cloud (Serp, OpenAI, Flux)
- **Runtime:** Node.js ESM
- **Deployment:** Railway.app

---

## 🎓 Educational Value

This codebase demonstrates:
1. Production-grade autonomous agent architecture
2. Real blockchain integration patterns
3. Non-custodial key management
4. Multi-service API orchestration
5. Self-healing error handling
6. On-chain settlement verification
7. Decentralized tool discovery

Perfect reference for developers building DeFi agents.

---

## 📄 License

MIT - Built for the OOBE Protocol × Ace Data Cloud Bounty

---

## 🤝 Bounty Submission

**Bounty:** OOBE Protocol × Ace Data Cloud  
**Category:** Category 2 - Ace Data Cloud Usage ($700/$500)  
**Status:** ✅ All requirements met

**Submission Includes:**
- ✅ SAP mainnet registration (TX verified)
- ✅ 3+ Ace Data Cloud services (Serp, OpenAI, Flux)
- ✅ Real x402 payments (live settlement)
- ✅ Autonomous workflow (24/7 daemon)
- ✅ Demo video (CapCut edited)
- ✅ Professional documentation
- ✅ GitHub repo with full source

---

## 👨‍💻 Author

**Pascaline06**  
- GitHub: [@Pascaline06](https://github.com/Pascaline06)
- Project: [defi-agent](https://github.com/Pascaline06/defi-agent)

---

## 📞 Questions?

See SAP SDK docs: [https://github.com/OOBE-PROTOCOL/synapse-sap-sdk](https://github.com/OOBE-PROTOCOL/synapse-sap-sdk)

Built with 💪 for **OOBE × Ace Data Cloud Bounty**

---

**Last Updated:** June 3, 2026  
**Status:** 🟢 Production - Running 24/7
```
