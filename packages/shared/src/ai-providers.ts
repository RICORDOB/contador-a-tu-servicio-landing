export type AIProviderId = "gemini" | "openai" | "claude" | "custom";

export interface AIProviderConfig {
  id: AIProviderId;
  name: string;
  apiKeyEnv: string;
  baseUrl: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export const AI_PROVIDERS: Record<AIProviderId, AIProviderConfig> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    apiKeyEnv: "GEMINI_API_KEY",
    baseUrl: "https://generativelanguage.googleapis.com/v1",
    model: "gemini-3.1-pro",
    temperature: 0.3,
    maxTokens: 8192,
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    apiKeyEnv: "OPENAI_API_KEY",
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-5.6-luna",
    temperature: 0.3,
    maxTokens: 8192,
  },
  claude: {
    id: "claude",
    name: "Anthropic Claude",
    apiKeyEnv: "CLAUDE_API_KEY",
    baseUrl: "https://api.anthropic.com/v1",
    model: "claude-sonnet-4.5",
    temperature: 0.3,
    maxTokens: 4096,
  },
  custom: {
    id: "custom",
    name: "Proveedor personalizado",
    apiKeyEnv: "CUSTOM_AI_API_KEY",
    baseUrl: "",
    model: "",
    temperature: 0.3,
    maxTokens: 4096,
  },
};

export interface AIRequest {
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  provider: AIProviderId;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  provider: AIProviderId;
}