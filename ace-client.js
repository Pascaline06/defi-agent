const axios = require('axios');
const config = require('./config');

class AceDataCloudClient {
  constructor() {
    this.apiKey = config.aceDataCloud.apiKey;
    this.apiUrl = config.aceDataCloud.apiUrl;
    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  // Service 1: Claude Chat - Analyze swap context
  async analyzeWithClaude(text) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: 'claude-3-5-sonnet-20241022',
        messages: [
          { role: 'user', content: `Analyze this DeFi swap for risks: ${text}` }
        ],
        max_tokens: 200,
      });
      return response.data;
    } catch (error) {
      console.error('Claude error:', error.message);
      throw error;
    }
  }

  // Service 2: OpenAI Chat
  async generateInsightsWithGPT(text) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: `Market insights for: ${text}` }
        ],
        max_tokens: 150,
      });
      return response.data;
    } catch (error) {
      console.error('GPT error:', error.message);
      throw error;
    }
  }

  // Service 3: SERP API - Search
  async searchTokenInfo(tokenSymbol) {
    try {
      const response = await this.client.post('/serp/google', {
        q: `${tokenSymbol} Solana token price`,
        number: 3,
      });
      return response.data;
    } catch (error) {
      console.error('SERP error:', error.message);
      throw error;
    }
  }

  // Service 4: Image Generation
  async generateVisualization(prompt) {
    try {
      const response = await this.client.post('/v1/images/generations', {
        model: 'midjourney',
        prompt: prompt,
        size: '512x512',
      });
      return response.data;
    } catch (error) {
      console.error('Image error:', error.message);
      throw error;
    }
  }

  // Service 5: Suno Audio
  async generateAudio(topic) {
    try {
      const response = await this.client.post('/v1/audios/generations', {
        model: 'suno',
        prompt: `Music about ${topic}`,
      });
      return response.data;
    } catch (error) {
      console.error('Audio error:', error.message);
      throw error;
    }
  }
}

module.exports = AceDataCloudClient;
