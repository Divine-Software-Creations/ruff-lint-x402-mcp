# ruff-lint-x402-mcp
MCP server exposing `lint_python`, backed by https://api.stevensaavedra.com/lint ($0.005 USDC/call on Base via x402).
```json
{"mcpServers":{"ruff-lint":{"command":"npx","args":["-y","ruff-lint-x402-mcp"],"env":{"EVM_PRIVATE_KEY":"0x..."}}}}
```
