# pi-volcengine-provider

Pi package that registers a Volcengine Ark Coding API provider.

## Install

```bash
pi install git:github.com/MacroSony/pi-volcengine-provider
```

For local development:

```bash
pi -e /path/to/pi-volcengine-provider
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

This extension registers:

- `ark-code-latest`
- `doubao-seed-code`
- `glm-5.1`
- `deepseek-v4-flash`
- `deepseek-v4-pro`
- `doubao-seed-2.0-code`
- `doubao-seed-2.0-pro`
- `doubao-seed-2.0-lite`
- `minimax-latest`
- `kimi-k2.6`

Run `pi --list-models` after installing to confirm the provider is loaded.
