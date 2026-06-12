// Account tools
import { getAllAddressesTool } from './accounts/getAllAddresses.js';
import { addAddressesTool } from './accounts/addAddresses.js';
// Customer tools
import { getAllCustomersTool } from './customers/getAllCustomers.js';
import { addCustomerTool } from './customers/addCustomer.js';
import { updateCustomersTool } from './customers/updateCustomers.js';
import { deleteCustomersTool } from './customers/deleteCustomers.js';
import { mergeCustomersTool } from './customers/mergeCustomers.js';
// Company tools
import { getAllCompaniesTool } from './companies/getAllCompanies.js';
import { addCompanyTool } from './companies/addCompany.js';
import { updateCompaniesTool } from './companies/updateCompanies.js';
import { deleteCompaniesTool } from './companies/deleteCompanies.js';
// Reservation tools
import { getAllReservationsTool } from './reservations/getAllReservations.js';
import { addReservationTool } from './reservations/addReservation.js';
import { updateReservationsTool } from './reservations/updateReservations.js';
import { cancelReservationsTool } from './reservations/cancelReservations.js';
// Configuration tools
import { getConfigurationTool } from './configuration/getConfiguration.js';
import { getAllCountriesTool } from './configuration/getAllCountries.js';
import { getAllCurrenciesTool } from './configuration/getAllCurrencies.js';
import { getAllTaxEnvironmentsTool } from './configuration/getAllTaxEnvironments.js';
import { getAllTaxationsTool } from './configuration/getAllTaxations.js';
import { getAllLanguagesTool } from './configuration/getAllLanguages.js';
import { getLanguageTextsTool } from './configuration/getLanguageTexts.js';
// Finance tools
import { getAllBillsTool } from './finance/getAllBills.js';
import { getAllAccountingItemsTool } from './finance/getAllAccountingItems.js';
import { addAccountingItemsTool } from './finance/addAccountingItems.js';
// Payment tools
import { addPaymentTool } from './payments/addPayment.js';
import { chargeCreditCardTool } from './payments/chargeCreditCard.js';
import { getAllPaymentsTool } from './payments/getAllPayments.js';
// Services tools
import { getAllServicesTool } from './services/getAllServices.js';
import { getAllSpacesTool } from './services/getAllSpaces.js';
import { getAllSpaceCategoriesTool } from './services/getAllSpaceCategories.js';
// Account Notes tools
import { getAllAccountNotesTool } from './accountNotes/getAllAccountNotes.js';
import { addAccountNotesTool } from './accountNotes/addAccountNotes.js';
// Rates tools
import { getAllRatesTool } from './rates/getAllRates.js';
import { getRatePricingTool } from './rates/getRatePricing.js';
// Export tools
import { exportAccountingItemsTool } from './exports/exportAccountingItems.js';
import { exportReservationsTool } from './exports/exportReservations.js';
// Availability tools
import { getAllAvailabilityBlocksTool } from './availability/getAllAvailabilityBlocks.js';
// Voucher tools
import { addVouchersTool } from './vouchers/addVouchers.js';
// Task tools
import { getAllTasksTool } from './tasks/getAllTasks.js';
import { addTaskTool } from './tasks/addTask.js';
// Loyalty tools
import { getAllLoyaltyMembershipsTool } from './loyalty/getAllLoyaltyMemberships.js';
import { addLoyaltyMembershipsTool } from './loyalty/addLoyaltyMemberships.js';
import { updateLoyaltyMembershipsTool } from './loyalty/updateLoyaltyMemberships.js';
import { deleteLoyaltyMembershipsTool } from './loyalty/deleteLoyaltyMemberships.js';
import { getAllLoyaltyProgramsTool } from './loyalty/getAllLoyaltyPrograms.js';
import { addLoyaltyProgramsTool } from './loyalty/addLoyaltyPrograms.js';
import { updateLoyaltyProgramsTool } from './loyalty/updateLoyaltyPrograms.js';
import { deleteLoyaltyProgramsTool } from './loyalty/deleteLoyaltyPrograms.js';
import { getAllLoyaltyTiersTool } from './loyalty/getAllLoyaltyTiers.js';
import { addLoyaltyTiersTool } from './loyalty/addLoyaltyTiers.js';
import { updateLoyaltyTiersTool } from './loyalty/updateLoyaltyTiers.js';
import { deleteLoyaltyTiersTool } from './loyalty/deleteLoyaltyTiers.js';
import { resolveAccessToken } from '../config/properties.js';
import { project } from '../utils/project.js';
/**
 * Tools grouped by user-facing category. The category keys match the
 * `enabledServices` checkbox-group values exposed by GPT Workbench and the
 * MEWS_ENABLED_SERVICES env var: only the checked categories are exposed.
 */
export const TOOLS_BY_CATEGORY = {
    reservations: [
        getAllReservationsTool,
        addReservationTool,
        updateReservationsTool,
        cancelReservationsTool,
        exportReservationsTool,
    ],
    customers: [
        getAllCustomersTool,
        addCustomerTool,
        updateCustomersTool,
        deleteCustomersTool,
        mergeCustomersTool,
        getAllAddressesTool,
        addAddressesTool,
        getAllAccountNotesTool,
        addAccountNotesTool,
    ],
    companies: [
        getAllCompaniesTool,
        addCompanyTool,
        updateCompaniesTool,
        deleteCompaniesTool,
    ],
    finance: [
        getAllBillsTool,
        getAllAccountingItemsTool,
        addAccountingItemsTool,
        exportAccountingItemsTool,
    ],
    payments: [addPaymentTool, chargeCreditCardTool, getAllPaymentsTool],
    rates: [getAllRatesTool, getRatePricingTool],
    services: [getAllServicesTool, getAllSpacesTool, getAllSpaceCategoriesTool],
    availability: [getAllAvailabilityBlocksTool],
    configuration: [
        getConfigurationTool,
        getAllCountriesTool,
        getAllCurrenciesTool,
        getAllTaxEnvironmentsTool,
        getAllTaxationsTool,
        getAllLanguagesTool,
        getLanguageTextsTool,
    ],
    loyalty: [
        getAllLoyaltyMembershipsTool,
        addLoyaltyMembershipsTool,
        updateLoyaltyMembershipsTool,
        deleteLoyaltyMembershipsTool,
        getAllLoyaltyProgramsTool,
        addLoyaltyProgramsTool,
        updateLoyaltyProgramsTool,
        deleteLoyaltyProgramsTool,
        getAllLoyaltyTiersTool,
        addLoyaltyTiersTool,
        updateLoyaltyTiersTool,
        deleteLoyaltyTiersTool,
    ],
    vouchers: [addVouchersTool],
    tasks: [getAllTasksTool, addTaskTool],
};
// Registry of all available tools (flattened from the category map).
export const allTools = Object.values(TOOLS_BY_CATEGORY).flat();
// Tool lookup map for fast access during execution
export const toolMap = new Map(allTools.map(tool => [tool.name, tool]));
// tool name -> category, derived from the grouping above.
const toolCategory = new Map(Object.entries(TOOLS_BY_CATEGORY).flatMap(([category, tools]) => tools.map(tool => [tool.name, category])));
/** A tool mutates Mews data when its name starts with a write verb. */
export function isMutatingTool(name) {
    return /^(add|update|delete|cancel|charge|merge)/.test(name);
}
/** Read tools (getAll*) get a default page size when the caller omits one. */
const DEFAULT_LIMITATION_COUNT = 20;
/** Parse MEWS_ENABLED_SERVICES (CSV). Empty/unset means "all categories". */
function enabledCategories() {
    const raw = process.env.MEWS_ENABLED_SERVICES;
    if (!raw || raw.trim() === '')
        return null;
    const set = new Set(raw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean));
    return set.size > 0 ? set : null;
}
function readOnlyEnabled() {
    return String(process.env.MEWS_READ_ONLY).toLowerCase() === 'true';
}
/** Tools exposed for the current env (category filter + read-only filter). */
function activeTools() {
    const categories = enabledCategories();
    const readOnly = readOnlyEnabled();
    return allTools.filter(tool => {
        const category = toolCategory.get(tool.name);
        if (categories && (!category || !categories.has(category)))
            return false;
        if (readOnly && isMutatingTool(tool.name))
            return false;
        return true;
    });
}
/**
 * Inject the multi-property `property_name` and the `full` (raw response)
 * controls into every tool's input schema — added centrally so we don't edit
 * all ~55 tool files.
 */
function withMcpMeta(tool) {
    const base = tool.inputSchema;
    return {
        name: tool.name,
        description: tool.description,
        inputSchema: {
            ...base,
            properties: {
                property_name: {
                    type: 'string',
                    description: 'The Mews property (enterprise) to target. Must be exactly one of the configured property names.',
                },
                ...base.properties,
                full: {
                    type: 'boolean',
                    description: 'When true, return every raw field instead of the token-efficient projection. Costly — use only when a projected field you need is missing.',
                },
            },
            required: Array.from(new Set([...(base.required ?? []), 'property_name'])),
        },
    };
}
// Get tool definitions for MCP server registration
export function getToolDefinitions() {
    return activeTools().map(withMcpMeta);
}
/**
 * Execute a tool by name.
 * - resolves the per-property AccessToken from `property_name`,
 * - strips the `property_name`/`full` control args before hitting the Mews API,
 * - injects a default Limitation.Count on getAll* calls,
 * - projects the response for token efficiency (unless `full`).
 */
export async function executeTool(name, base, registry, args) {
    const tool = toolMap.get(name);
    if (!tool) {
        return {
            content: [{ type: 'text', text: `Error: Unknown tool: ${name}` }],
        };
    }
    if (readOnlyEnabled() && isMutatingTool(name)) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: tool "${name}" is disabled (read-only safe mode is on).`,
                },
            ],
        };
    }
    try {
        const input = args && typeof args === 'object'
            ? { ...args }
            : {};
        const propertyName = typeof input.property_name === 'string' ? input.property_name : undefined;
        const full = input.full === true;
        delete input.property_name;
        delete input.full;
        const { accessToken } = resolveAccessToken(registry, propertyName);
        const config = {
            clientToken: base.clientToken,
            accessToken,
            client: base.client,
            baseUrl: base.baseUrl,
        };
        // Default page size for list endpoints when the caller didn't set one.
        if (name.startsWith('getAll') && input.Limitation === undefined) {
            input.Limitation = { Count: DEFAULT_LIMITATION_COUNT };
        }
        const result = await tool.execute(config, input);
        // Project the response (tools return { content: [{ type:'text', text }] }).
        const text = result?.content?.[0]?.text;
        if (typeof text === 'string') {
            try {
                const parsed = JSON.parse(text);
                const projected = project(name, parsed, full);
                return {
                    content: [{ type: 'text', text: JSON.stringify(projected, null, 2) }],
                };
            }
            catch {
                // Non-JSON response — return as-is.
            }
        }
        return result;
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
                },
            ],
        };
    }
}
//# sourceMappingURL=index.js.map