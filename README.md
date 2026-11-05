# Ruff Python Lint API — pay-per-call for AI agents (MCP + x402)

[![npm](https://img.shields.io/npm/v/@divine-software-creations/ruff-lint-x402-mcp)](https://www.npmjs.com/package/@divine-software-creations/ruff-lint-x402-mcp)

Give any AI agent instant Python linting with [ruff](https://github.com/astral-sh/ruff). No signup, no API key, no subscription: **$0.005 USDC per call**, paid automatically over [x402](https://x402.org) on Base.

- ⚡ Fast: ruff-powered, results in milliseconds
- 🔒 Safe: code is statically analyzed, never executed
- 🤖 Agent-native: MCP tool `lint_python` for Claude, Cursor, Windsurf, Gemini/Antigravity and any MCP client
- 💸 Pay only for what you use; the facilitator covers gas, so your wallet only needs USDC

Landing page: https://stevensaavedra.com/lint · API: `POST https://api.stevensaavedra.com/lint` · Verified on [PayAPI Market](https://payapi.market/api/ruff-python-lint)

## MCP install

```json
{
  "mcpServers": {
    "ruff-lint": {
      "command": "npx",
      "args": ["-y", "@divine-software-creations/ruff-lint-x402-mcp"],
      "env": { "EVM_PRIVATE_KEY": "0x<key of a Base wallet holding a little USDC>" }
    }
  }
}
```

Use a dedicated low-balance wallet. $1 of USDC covers 200 lint calls.

## Direct HTTP (x402)

```bash
curl -i -X POST https://api.stevensaavedra.com/lint \
  -H 'content-type: application/json' \
  -d '{"code":"import os\nx = 1","language":"python"}'
# -> 402 Payment Required with x402 payment requirements.
# Any x402 client (e.g. @x402/fetch) pays and retries automatically.
```

## Tool

`lint_python({ code: string (≤200KB), filename?: string })` → ruff diagnostics (rule code, message, line/column, fix hints).

## License
MIT
