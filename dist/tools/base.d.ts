import type { MewsAuthConfig } from '../types/auth.js';
export interface ToolDefinition {
    name: string;
    description: string;
    inputSchema: {
        type: 'object';
        properties: Record<string, any>;
        required?: string[];
        additionalProperties?: boolean;
    };
}
export interface Tool extends ToolDefinition {
    execute(config: MewsAuthConfig, args: unknown): Promise<any>;
}
export interface ToolResult {
    content: Array<{
        type: 'text';
        text: string;
    }>;
}
//# sourceMappingURL=base.d.ts.map