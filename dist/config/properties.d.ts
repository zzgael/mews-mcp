/**
 * Multi-property credential registry.
 *
 * Mews auth model: the ClientToken is constant per integration & environment
 * (global), while the AccessToken is issued per property (enterprise). A hotel
 * chain therefore has one AccessToken per property. We receive them as a single
 * JSON env var `MEWS_PROPERTIES` = [{ "propertyName": "...", "token": "..." }].
 *
 * Tools select a property at call time via the `property_name` argument; this
 * module resolves that name to its AccessToken.
 */
export interface MewsProperty {
    propertyName: string;
    token: string;
}
/**
 * Build the propertyName -> AccessToken registry from MEWS_PROPERTIES.
 * Falls back to a single 'default' property from the legacy MEWS_ACCESS_TOKEN
 * env var (single-property / Smithery backward compatibility).
 */
export declare function loadPropertyRegistry(): Map<string, string>;
/**
 * Resolve the AccessToken for a given property_name.
 * - If a name is provided, it must exist (otherwise a helpful error listing the
 *   available names is thrown).
 * - If no name is provided and exactly one property is configured, it is used.
 * - If no name is provided and several exist, an error asks for one.
 */
export declare function resolveAccessToken(registry: Map<string, string>, propertyName?: string): {
    propertyName: string;
    accessToken: string;
};
//# sourceMappingURL=properties.d.ts.map