#!/usr/bin/env node
// MCP stdio server wrapping POST https://api.stevensaavedra.com/lint (x402, $0.005 USDC on Base).
// The buyer supplies their own wallet via EVM_PRIVATE_KEY env var; it is never logged.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

const ENDPOINT = process.env.LINT_ENDPOINT || "https://api.stevensaavedra.com/lint";
const key = process.env.EVM_PRIVATE_KEY;

let payFetch = null;
if (key) {
  const client = new x402Client();
  registerExactEvmScheme(client, { signer: privateKeyToAccount(key) });
  payFetch = wrapFetchWithPayment(fetch, client);
}

const server = new McpServer({ name: "ruff-lint-x402", version: "1.0.0" });
server.tool(
  "lint_python",
  "Lint Python source with ruff (static; code is never executed). Costs $0.005 USDC on Base per call via x402.",
  { code: z.string().describe("Python source, max 200KB"), filename: z.string().optional() },
  async ({ code, filename }) => {
    if (!payFetch) {
      return { isError: true, content: [{ type: "text", text: "Set EVM_PRIVATE_KEY (a Base wallet holding USDC) to pay $0.005 per lint call." }] };
    }
    const res = await payFetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code, language: "python", filename }),
    });
    const text = await res.text();
    return { isError: !res.ok, content: [{ type: "text", text }] };
  }
);
await server.connect(new StdioServerTransport());
