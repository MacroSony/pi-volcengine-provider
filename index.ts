import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export const PROVIDER_ID = "volcengine-plan";
export const PROVIDER_NAME = "Volcengine Coding Plan";
export const VOLCENGINE_CODING_BASE_URL = "https://ark.cn-beijing.volces.com/api/coding/v3";

type ModelInput = ("text" | "image")[];

interface VolcengineModelDefinition {
  id: string;
  name: string;
  input: ModelInput;
  contextWindow: number;
  maxTokens: number;
}

const TEXT_ONLY: ModelInput = ["text"];
const TEXT_AND_IMAGE: ModelInput = ["text", "image"];

const OPENAI_COMPAT = {
  supportsDeveloperRole: false,
  maxTokensField: "max_tokens" as const,
};

const ZERO_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export const MODELS: VolcengineModelDefinition[] = [
  {
    id: "ark-code-latest",
    name: "ark-code-latest",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
  },
  {
    id: "doubao-seed-code",
    name: "doubao-seed-code",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
  },
  {
    id: "glm-5.1",
    name: "glm-5.1",
    input: TEXT_ONLY,
    contextWindow: 200000,
    maxTokens: 65536,
  },
  {
    id: "deepseek-v4-flash",
    name: "deepseek-v4-flash",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 65536,
  },
  {
    id: "deepseek-v4-pro",
    name: "deepseek-v4-pro",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 65536,
  },
  {
    id: "doubao-seed-2.0-code",
    name: "doubao-seed-2.0-code",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
  },
  {
    id: "doubao-seed-2.0-pro",
    name: "doubao-seed-2.0-pro",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
  },
  {
    id: "doubao-seed-2.0-lite",
    name: "doubao-seed-2.0-lite",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
  },
  {
    id: "minimax-latest",
    name: "minimax-latest",
    input: TEXT_ONLY,
    contextWindow: 200000,
    maxTokens: 65536,
  },
  {
    id: "kimi-k2.6",
    name: "kimi-k2.6",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
  },
];

export default function volcengineProvider(pi: ExtensionAPI) {
  pi.registerProvider(PROVIDER_ID, {
    name: PROVIDER_NAME,
    baseUrl: VOLCENGINE_CODING_BASE_URL,
    apiKey: "$VOLCENGINE_API_KEY",
    api: "openai-completions",
    models: MODELS.map((model) => ({
      ...model,
      input: [...model.input],
      reasoning: false,
      cost: { ...ZERO_COST },
      compat: { ...OPENAI_COMPAT },
    })),
  });
}
