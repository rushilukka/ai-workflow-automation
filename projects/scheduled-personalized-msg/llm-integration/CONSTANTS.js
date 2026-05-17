import dotenv from 'dotenv';

dotenv.config();

export const NVIDIA_CONFIG = {
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
  model: process.env.NVIDIA_MODEL || 'deepseek-ai/deepseek-v4-flash',
};

export const LLM_PARAMS = {
  temperature: 1,
  top_p: 0.95,
  max_tokens: 16384,
  chat_template_kwargs: { thinking: false },
  stream: false,
};

export const SYSTEM_PROMPTS = {
  english_only: "You must respond ONLY in English. Do not use any other language. If the user asks in another language, translate and respond in English only.",
  default: "You are a helpful assistant.",
};

export const PROMPTS = {
  simple: "Hi",
  math: "What is 2+2?",
  reminder: "Generate today's productivity reminder.",
  greeting: "Hello, how can you help me?",
};

export function getConfig(key) {
  return NVIDIA_CONFIG[key];
}

export function getPrompt(promptName) {
  return PROMPTS[promptName] || PROMPTS.simple;
}

export function getSystemPrompt(promptName = 'english_only') {
  return SYSTEM_PROMPTS[promptName] || SYSTEM_PROMPTS.english_only;
}

export function getLLMParams(overrides = {}) {
  return { ...LLM_PARAMS, ...overrides };
}
