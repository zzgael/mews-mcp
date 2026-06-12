/**
 * Token-efficient response projection.
 *
 * Mews API responses are raw passthrough and ~70-80% null / noise GUIDs, so an
 * unprojected `getAll*` can blow the LLM context window. We apply, by default:
 *  1. a generic prune (drop null/empty + noise keys, cap arrays & long strings),
 *  2. a per-tool whitelist for the heaviest entities (reservations, customers).
 *
 * Callers can pass `full: true` on a tool to bypass projection and get the raw
 * response (costly but complete).
 */
/**
 * Project a parsed Mews response for a given tool.
 * @param toolName MCP tool name (e.g. 'getAllReservations')
 * @param raw      Parsed JSON response from the Mews API
 * @param full     When true, return the raw response untouched
 */
export declare function project(toolName: string, raw: unknown, full: boolean): unknown;
//# sourceMappingURL=project.d.ts.map