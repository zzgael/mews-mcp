import { z } from 'zod';
// Mews API Authentication Configuration Schema
export const MewsAuthConfigSchema = z.object({
    clientToken: z.string().describe('Unique to your application, serving as the identifier of the API client'),
    accessToken: z.string().describe('Unique to the connection with a property (enterprise), identifying the property or properties whose data and services you can access'),
    client: z.string().describe('The name and version of the client application you are integrating with Mews'),
    baseUrl: z.string().url().default('https://api.mews.com').describe('Base URL for the Mews API'),
});
// Standard Mews API Request Headers
export const MewsRequestHeadersSchema = z.object({
    'Content-Type': z.literal('application/json'),
    'Client-Token': z.string(),
    'Access-Token': z.string(),
    'Client': z.string(),
});
// Environment variables schema
export const MewsEnvSchema = z.object({
    MEWS_CLIENT_TOKEN: z.string().optional(),
    MEWS_ACCESS_TOKEN: z.string().optional(),
    MEWS_CLIENT: z.string().optional(),
    MEWS_BASE_URL: z.string().url().optional(),
});
//# sourceMappingURL=auth.js.map