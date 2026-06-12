#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { z } from "zod";
export declare const configSchema: z.ZodObject<{
    clientToken: z.ZodString;
    accessToken: z.ZodString;
    client: z.ZodDefault<z.ZodString>;
    baseUrl: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clientToken: string;
    accessToken: string;
    client: string;
    baseUrl: string;
}, {
    clientToken: string;
    accessToken: string;
    client?: string | undefined;
    baseUrl?: string | undefined;
}>;
export default function ({ config }: {
    config: z.infer<typeof configSchema>;
}): Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
//# sourceMappingURL=index.d.ts.map