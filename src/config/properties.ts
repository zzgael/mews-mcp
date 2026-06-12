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
export function loadPropertyRegistry(): Map<string, string> {
  const registry = new Map<string, string>();
  const raw = process.env.MEWS_PROPERTIES;

  if (raw && raw.trim() !== '') {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error(
        'MEWS_PROPERTIES is not valid JSON. Expected [{"propertyName":"...","token":"..."}].'
      );
    }
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (
          item &&
          typeof item === 'object' &&
          typeof (item as MewsProperty).propertyName === 'string' &&
          typeof (item as MewsProperty).token === 'string'
        ) {
          const name = (item as MewsProperty).propertyName.trim();
          const token = (item as MewsProperty).token;
          if (name && token) registry.set(name, token);
        }
      }
    }
  }

  // Backward compatibility: single-property via the legacy env var.
  if (registry.size === 0 && process.env.MEWS_ACCESS_TOKEN) {
    registry.set('default', process.env.MEWS_ACCESS_TOKEN);
  }

  return registry;
}

/**
 * Resolve the AccessToken for a given property_name.
 * - If a name is provided, it must exist (otherwise a helpful error listing the
 *   available names is thrown).
 * - If no name is provided and exactly one property is configured, it is used.
 * - If no name is provided and several exist, an error asks for one.
 */
export function resolveAccessToken(
  registry: Map<string, string>,
  propertyName?: string
): { propertyName: string; accessToken: string } {
  const names = [...registry.keys()];

  if (registry.size === 0) {
    throw new Error(
      'No Mews properties are configured. Set MEWS_PROPERTIES with at least one { propertyName, token }.'
    );
  }

  if (!propertyName || propertyName.trim() === '') {
    if (registry.size === 1) {
      const only = names[0];
      return { propertyName: only, accessToken: registry.get(only)! };
    }
    throw new Error(
      `property_name is required. Available properties: [${names.join(', ')}].`
    );
  }

  const token = registry.get(propertyName);
  if (!token) {
    throw new Error(
      `Unknown property "${propertyName}". Available properties: [${names.join(', ')}].`
    );
  }
  return { propertyName, accessToken: token };
}
