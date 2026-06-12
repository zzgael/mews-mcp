# Mews MCP Server

[![smithery badge](https://smithery.ai/badge/@code-rabi/mews-mcp)](https://smithery.ai/server/@code-rabi/mews-mcp)

A Model Context Protocol (MCP) server for the Mews hospitality platform API. This server provides comprehensive access to Mews operations through a standardized interface.

## Overview

This MCP server provides comprehensive access to the Mews hospitality platform API, covering customer and company management, reservation operations, financial transactions, account management, configuration settings, and services inventory. It implements the core functionality needed for hospitality management through a standardized Model Context Protocol interface.

> **Disclaimer**: This is an unofficial MCP server for the Mews API and is not affiliated with or officially supported by Mews Systems s.r.o.

## GPT Workbench / Plemio fork

This fork (`zzgael/mews-mcp`) adds, on top of the upstream server:

- **Multi-property support.** The Mews `ClientToken` is constant per integration
  and environment (global), while each property (enterprise) has its own
  `AccessToken`. Provide all properties as a single JSON env var and select one
  per call via the `property_name` tool argument.
- **Token-efficient responses.** Mews responses are raw and mostly null/noise
  GUIDs. By default responses are projected to essential fields (per-entity
  whitelist for reservations/customers + a generic prune of null/empty/noise).
  Pass `full: true` on any read tool to get the raw response.
- **Category filtering & read-only safe mode** to keep the tool surface lean.

### Environment variables

| Variable | Description |
| --- | --- |
| `MEWS_CLIENT_TOKEN` | Global Client Token (shared by all properties). **Required.** |
| `MEWS_PROPERTIES` | JSON array `[{"propertyName":"...","token":"<AccessToken>"}]`. |
| `MEWS_BASE_URL` | API endpoint (default `https://api.mews.com`; demo: `https://api.mews-demo.com`). |
| `MEWS_CLIENT` | Client name/version string (default `mews-mcp/1.0.0`). |
| `MEWS_ENABLED_SERVICES` | Comma-separated categories to expose (empty = all). e.g. `reservations,customers`. |
| `MEWS_READ_ONLY` | `true` hides every mutating tool (add/update/delete/cancel/charge/merge). |

Categories: `reservations, customers, companies, finance, payments, rates,
services, availability, configuration, loyalty, vouchers, tasks`.

Legacy single-property mode (`MEWS_ACCESS_TOKEN`, no `MEWS_PROPERTIES`) is still
supported: it registers a single `default` property.

## Quick Start

### Using Smithery (Recommended)

The easiest way to use this MCP server is through [Smithery](https://smithery.ai), which provides hosted MCP servers:

1. Go to the [Mews MCP server on Smithery](https://smithery.ai/server/@code-rabi/mews-mcp)
2. Click "Add Configuration" and provide your Mews credentials
3. Copy the connection URL to your AI client

> **Demo Environment**: You can test this MCP server using Mews' public demo environment. The demo credentials are already included in the local installation example below and work with the demo API at `https://api.mews-demo.com`. These are publicly available test credentials from the [Mews API documentation](https://mews-systems.gitbook.io/connector-api/guidelines/environments#api-tokens-gross-pricing-environment).

### Using with NPX directly 

To work directly with the published package, copy the following JSON and paste it in Claude, Cursor, or any other AI client that supports MCPs:

```json
{
    "mcpServers": {
        "mews-mcp": {
            "command": "npx",
            "args": ["-y", "mews-mcp@latest"],
            "env": {
                "MEWS_CLIENT_TOKEN": "07AB1F14B55C49B8BDD6AD200158423B-273A4497AFF5E20566D7199DB3DC2BA",
                "MEWS_ACCESS_TOKEN": "BFD4298010F54B069F3DAD20015D53EA-D5561FADFBA4EFC8EA4C179C6BC461F",
                "MEWS_CLIENT": "mews-mcp/1.0.0",
                "MEWS_BASE_URL": "https://api.mews-demo.com"
            }
        }
    }
}
```

> **Note**: The tokens above are public demo credentials from [Mews API documentation](https://mews-systems.gitbook.io/connector-api/guidelines/environments#api-tokens-gross-pricing-environment). Replace the `args` path with your actual installation path.


## License

MIT License - see LICENSE file for details. 