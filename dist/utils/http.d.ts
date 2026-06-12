import type { MewsAuthConfig } from '../types/auth.js';
export type MewsResponse<T = unknown> = T;
/**
 * Simple POST request to Mews API with authentication in body
 */
export declare function mewsRequest<B = Record<string, unknown>, R = unknown>(config: MewsAuthConfig, endpoint: string, data: B): Promise<MewsResponse<R>>;
//# sourceMappingURL=http.d.ts.map