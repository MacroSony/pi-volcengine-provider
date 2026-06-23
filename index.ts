import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export const PROVIDER_ID = "volcengine-plan";
export const PROVIDER_NAME = "Volcengine Coding Plan";
export const VOLCENGINE_CODING_BASE_URL = "https://ark.cn-beijing.volces.com/api/coding/v3";

type ModelInput = ("text" | "image")[];
type PiThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh";
type VolcengineOpenAICompat = {
  supportsDeveloperRole?: boolean;
  supportsReasoningEffort?: boolean;
  maxTokensField?: "max_completion_tokens" | "max_tokens";
  thinkingFormat?: "deepseek" | "zai";
};

interface VolcengineModelDefinition {
  id: string;
  name: string;
  input: ModelInput;
  contextWindow: number;
  maxTokens: number;
  reasoning: boolean;
  thinkingLevelMap?: Partial<Record<PiThinkingLevel, string | null>>;
  compat?: VolcengineOpenAICompat;
}

const TEXT_ONLY: ModelInput = ["text"];
const TEXT_AND_IMAGE: ModelInput = ["text", "image"];

const OPENAI_COMPAT = {
  supportsDeveloperRole: false,
  maxTokensField: "max_tokens" as const,
};

const VOLCENGINE_THINKING_COMPAT = {
  supportsDeveloperRole: false,
  supportsReasoningEffort: true,
  maxTokensField: "max_tokens" as const,
  thinkingFormat: "deepseek" as const,
};

const ZAI_THINKING_COMPAT = {
  supportsDeveloperRole: false,
  maxTokensField: "max_tokens" as const,
  thinkingFormat: "zai" as const,
};

// Volcengine uses `minimal` to mean "no thinking". Pi already has a separate
// `off` level, so hide Pi's `minimal` and clamp it up to `low`.
const VOLCENGINE_THINKING_LEVEL_MAP = {
  minimal: null,
} satisfies Partial<Record<PiThinkingLevel, string | null>>;

const VOLCENGINE_MAX_THINKING_LEVEL_MAP = {
  ...VOLCENGINE_THINKING_LEVEL_MAP,
  xhigh: "max",
} satisfies Partial<Record<PiThinkingLevel, string | null>>;

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
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_MAX_THINKING_LEVEL_MAP,
  },
  {
    id: "doubao-seed-2.0-code",
    name: "doubao-seed-2.0-code",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "doubao-seed-2.0-pro",
    name: "doubao-seed-2.0-pro",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "doubao-seed-2.0-lite",
    name: "doubao-seed-2.0-lite",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 65536,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "doubao-seed-code",
    name: "doubao-seed-code",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "minimax-m2.7",
    name: "minimax-m2.7",
    input: TEXT_ONLY,
    contextWindow: 200000,
    maxTokens: 128000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "minimax-m3",
    name: "minimax-m3",
    input: TEXT_ONLY,
    contextWindow: 512000,
    maxTokens: 128000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "glm-5.2",
    name: "glm-5.2",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 128000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
    compat: ZAI_THINKING_COMPAT,
  },
  {
    id: "glm-latest",
    name: "glm-latest",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 128000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
    compat: ZAI_THINKING_COMPAT,
  },
  {
    id: "deepseek-v4-flash",
    name: "deepseek-v4-flash",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 384000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_MAX_THINKING_LEVEL_MAP,
  },
  {
    id: "deepseek-v4-pro",
    name: "deepseek-v4-pro",
    input: TEXT_ONLY,
    contextWindow: 1024000,
    maxTokens: 384000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_MAX_THINKING_LEVEL_MAP,
  },
  {
    id: "kimi-k2.6",
    name: "kimi-k2.6",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
  },
  {
    id: "kimi-k2.7-code",
    name: "kimi-k2.7-code",
    input: TEXT_AND_IMAGE,
    contextWindow: 256000,
    maxTokens: 32000,
    reasoning: true,
    thinkingLevelMap: VOLCENGINE_THINKING_LEVEL_MAP,
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
      cost: { ...ZERO_COST },
      ...(model.thinkingLevelMap ? { thinkingLevelMap: { ...model.thinkingLevelMap } } : {}),
      compat: { ...(model.compat ?? (model.reasoning ? VOLCENGINE_THINKING_COMPAT : OPENAI_COMPAT)) },
    })),
  });
}
