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

const NOISE_KEYS = new Set<string>([
  'CreatorProfileId',
  'UpdaterProfileId',
  'ChainId',
  'QrCodeData',
  // Deprecated on reservations — ScheduledStartUtc/ScheduledEndUtc supersede them.
  'StartUtc',
  'EndUtc',
]);

const STRING_CAP = 2000;
const ARRAY_CAP = 100;

/** Per-tool whitelist applied to a specific response array before pruning. */
const WHITELIST: Record<string, { arrayKey: string; keep: string[] }> = {
  getAllReservations: {
    arrayKey: 'Reservations',
    keep: [
      'Id',
      'Number',
      'State',
      'Origin',
      'ScheduledStartUtc',
      'ScheduledEndUtc',
      'ActualStartUtc',
      'ActualEndUtc',
      'AccountId',
      'AccountType',
      'AssignedResourceId',
      'RequestedResourceCategoryId',
      'RateId',
      'GroupId',
      'PersonCounts',
      'Purpose',
      'CancellationReason',
    ],
  },
  getAllCustomers: {
    arrayKey: 'Customers',
    keep: [
      'Id',
      'Number',
      'FirstName',
      'LastName',
      'Email',
      'Phone',
      'NationalityCode',
      'PreferredLanguageCode',
      'LoyaltyCode',
      'CompanyId',
      'ActivityState',
      'Address',
      'Classifications',
      'Notes',
      'CreatedUtc',
      'UpdatedUtc',
    ],
  },
};

function isEmpty(v: unknown): boolean {
  return (
    v === null ||
    v === undefined ||
    v === '' ||
    (Array.isArray(v) && v.length === 0) ||
    (typeof v === 'object' &&
      !Array.isArray(v) &&
      Object.keys(v as Record<string, unknown>).length === 0)
  );
}

/** Recursively drop null/empty values + noise keys, cap arrays and strings. */
function prune(node: unknown): unknown {
  if (typeof node === 'string') {
    return node.length > STRING_CAP
      ? `${node.slice(0, STRING_CAP)}…[+${node.length - STRING_CAP} chars]`
      : node;
  }

  if (Array.isArray(node)) {
    const capped = node.length > ARRAY_CAP ? node.slice(0, ARRAY_CAP) : node;
    return capped.map(prune).filter((v) => !isEmpty(v));
  }

  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      if (NOISE_KEYS.has(key)) continue;
      const pruned = prune(value);
      if (!isEmpty(pruned)) out[key] = pruned;
    }
    return out;
  }

  return node;
}

/**
 * Project a parsed Mews response for a given tool.
 * @param toolName MCP tool name (e.g. 'getAllReservations')
 * @param raw      Parsed JSON response from the Mews API
 * @param full     When true, return the raw response untouched
 */
export function project(toolName: string, raw: unknown, full: boolean): unknown {
  if (full) return raw;

  let data: unknown = raw;
  const wl = WHITELIST[toolName];
  if (
    wl &&
    data &&
    typeof data === 'object' &&
    Array.isArray((data as Record<string, unknown>)[wl.arrayKey])
  ) {
    const source = data as Record<string, unknown>;
    const items = source[wl.arrayKey] as Array<Record<string, unknown>>;
    data = {
      ...source,
      [wl.arrayKey]: items.map((item) => {
        const kept: Record<string, unknown> = {};
        for (const key of wl.keep) {
          if (key in item) kept[key] = item[key];
        }
        return kept;
      }),
    };
  }

  return prune(data);
}
