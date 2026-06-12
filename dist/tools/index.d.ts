import { Tool } from './base.js';
/**
 * Tools grouped by user-facing category. The category keys match the
 * `enabledServices` checkbox-group values exposed by GPT Workbench and the
 * MEWS_ENABLED_SERVICES env var: only the checked categories are exposed.
 */
export declare const TOOLS_BY_CATEGORY: Record<string, Tool[]>;
export declare const allTools: Tool[];
export declare const toolMap: Map<string, Tool>;
/** A tool mutates Mews data when its name starts with a write verb. */
export declare function isMutatingTool(name: string): boolean;
interface MewsBaseConfig {
    clientToken: string;
    client: string;
    baseUrl: string;
}
export declare function getToolDefinitions(): {
    name: string;
    description: string;
    inputSchema: {
        properties: {
            full: {
                type: string;
                description: string;
            };
            property_name: {
                type: string;
                description: string;
            };
        };
        required: string[];
        type: "object";
        additionalProperties?: boolean;
    };
}[];
/**
 * Execute a tool by name.
 * - resolves the per-property AccessToken from `property_name`,
 * - strips the `property_name`/`full` control args before hitting the Mews API,
 * - injects a default Limitation.Count on getAll* calls,
 * - projects the response for token efficiency (unless `full`).
 */
export declare function executeTool(name: string, base: MewsBaseConfig, registry: Map<string, string>, args: unknown): Promise<any>;
export {};
//# sourceMappingURL=index.d.ts.map