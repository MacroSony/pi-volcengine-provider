# pi-volcengine-provider

Pi package that registers a Volcengine Ark Coding API provider.

## Install

npm package: [pi-volcengine-provider](https://www.npmjs.com/package/pi-volcengine-provider)

Recommended install from npm:

```bash
pi install npm:pi-volcengine-provider
```

To pin a specific npm version:

```bash
pi install npm:pi-volcengine-provider@0.1.2
```

You can also install from GitHub:

```bash
pi install git:github.com/MacroSony/pi-volcengine-provider
```

For local development:

```bash
pi -e /path/to/pi-volcengine-provider
```

To try the published package for one run without installing it:

```bash
pi -e npm:pi-volcengine-provider
```

## Authentication

The provider id is `volcengine-plan`. Pi will use `~/.pi/agent/auth.json` first, then the `VOLCENGINE_API_KEY` environment variable as a fallback.

```json
{
  "volcengine-plan": { "type": "api_key", "key": "your-volcengine-key" }
}
```

Or:

```bash
export VOLCENGINE_API_KEY=your-volcengine-key
```

## Models

This extension follows the [Volcengine Coding Plan model list](https://www.volcengine.com/docs/82379/1925114?lang=zh) and registers:

- `ark-code-latest`
- `doubao-seed-2.0-code`
- `doubao-seed-2.0-pro`
- `doubao-seed-2.0-lite`
- `doubao-seed-code`
- `minimax-m2.7`
- `minimax-m3`
- `glm-5.2`
- `glm-latest`
- `deepseek-v4-flash`
- `deepseek-v4-pro`
- `kimi-k2.6`
- `kimi-k2.7-code`

Run `pi --list-models` after installing to confirm the provider is loaded.

## Thinking levels

This extension maps Pi's native thinking selector to provider-specific Chat Completions controls:

- Pi `off` -> `thinking: { "type": "disabled" }`
- Most Volcengine reasoning models: Pi `low`, `medium`, `high` -> `thinking: { "type": "enabled" }` plus matching `reasoning_effort`
- Pi `minimal` is hidden because Volcengine's `reasoning_effort: "minimal"` means no thinking; selecting it clamps to `low`
- Pi `xhigh` -> `reasoning_effort: "max"` only for models verified to accept it (`ark-code-latest`, `deepseek-v4-flash`, `deepseek-v4-pro`)
- `glm-5.2` and `glm-latest` use the GLM/Z.AI thinking shape: Pi `low`, `medium`, and `high` send `thinking: { "type": "enabled" }` without `reasoning_effort`; Pi `off` sends disabled.
