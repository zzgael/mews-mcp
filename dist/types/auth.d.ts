import { z } from 'zod';
export declare const MewsAuthConfigSchema: z.ZodObject<{
    clientToken: z.ZodString;
    accessToken: z.ZodString;
    client: z.ZodString;
    baseUrl: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    clientToken: string;
    accessToken: string;
    client: string;
    baseUrl: string;
}, {
    clientToken: string;
    accessToken: string;
    client: string;
    baseUrl?: string | undefined;
}>;
export type MewsAuthConfig = z.infer<typeof MewsAuthConfigSchema>;
export declare const MewsRequestHeadersSchema: z.ZodObject<{
    'Content-Type': z.ZodLiteral<"application/json">;
    'Client-Token': z.ZodString;
    'Access-Token': z.ZodString;
    Client: z.ZodString;
}, "strip", z.ZodTypeAny, {
    'Content-Type': "application/json";
    'Client-Token': string;
    'Access-Token': string;
    Client: string;
}, {
    'Content-Type': "application/json";
    'Client-Token': string;
    'Access-Token': string;
    Client: string;
}>;
export type MewsRequestHeaders = z.infer<typeof MewsRequestHeadersSchema>;
export declare const MewsEnvSchema: z.ZodObject<{
    MEWS_CLIENT_TOKEN: z.ZodOptional<z.ZodString>;
    MEWS_ACCESS_TOKEN: z.ZodOptional<z.ZodString>;
    MEWS_CLIENT: z.ZodOptional<z.ZodString>;
    MEWS_BASE_URL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    MEWS_CLIENT_TOKEN?: string | undefined;
    MEWS_ACCESS_TOKEN?: string | undefined;
    MEWS_CLIENT?: string | undefined;
    MEWS_BASE_URL?: string | undefined;
}, {
    MEWS_CLIENT_TOKEN?: string | undefined;
    MEWS_ACCESS_TOKEN?: string | undefined;
    MEWS_CLIENT?: string | undefined;
    MEWS_BASE_URL?: string | undefined;
}>;
export type MewsEnv = z.infer<typeof MewsEnvSchema>;
//# sourceMappingURL=auth.d.ts.map