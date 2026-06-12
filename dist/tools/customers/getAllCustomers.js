import { mewsRequest } from '../../utils/http.js';
export const getAllCustomersTool = {
    name: 'getAllCustomers',
    description: 'Get customers with filters. Note: At least one filter must be provided (CustomerIds, Emails, FirstNames, LastNames, LoyaltyCodes, CompanyIds, CreatedUtc, UpdatedUtc, or DeletedUtc). If no filters are specified, defaults to ActivityStates: ["Active"] to return all active customers. IMPORTANT LIMITATIONS: Date range filters (CreatedUtc, UpdatedUtc, DeletedUtc) have a maximum interval of 3 months and 1 day. All array filters have specific maximum item limits (typically 1000, except CompanyIds which is limited to 1).',
    inputSchema: {
        type: 'object',
        properties: {
            ChainIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of the chains. Required when using Portfolio Access Tokens, ignored otherwise.',
                maxItems: 1000
            },
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'Interval in which Customer was created (max length 3 months)'
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Interval in which Customer was updated (max length 3 months)'
            },
            DeletedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of deletion date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of deletion date range (ISO 8601)' }
                },
                description: 'Interval in which Customer was deleted (max length 3 months)'
            },
            Extent: {
                type: 'object',
                properties: {
                    Customers: { type: 'boolean', description: 'Whether the response should contain information about customers' },
                    Addresses: { type: 'boolean', description: 'Whether the response should contain addresses of customers' },
                    Documents: { type: 'boolean', description: 'Whether the response should contain identity documents of customers (deprecated)' }
                },
                description: 'Extent of data to be returned'
            },
            ActivityStates: {
                type: 'array',
                items: { type: 'string' },
                description: 'Whether to return only active, only deleted or both records'
            },
            CustomerIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of Customers. Required if no other filter is provided.',
                maxItems: 1000
            },
            CompanyIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifier of the Company the customer is associated with',
                maxItems: 1
            },
            Emails: {
                type: 'array',
                items: { type: 'string' },
                description: 'Emails of the Customers',
                maxItems: 1000
            },
            FirstNames: {
                type: 'array',
                items: { type: 'string' },
                description: 'First names of the Customers',
                maxItems: 1000
            },
            LastNames: {
                type: 'array',
                items: { type: 'string' },
                description: 'Last names of the Customers',
                maxItems: 1000
            },
            LoyaltyCodes: {
                type: 'array',
                items: { type: 'string' },
                description: 'Loyalty codes of the Customers',
                maxItems: 1000
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of customers to return' },
                    Cursor: { type: 'string', description: 'Pagination cursor for next page' }
                },
                description: 'Limitation on the quantity of data returned'
            }
        }
    },
    async execute(config, args) {
        const inputArgs = args;
        // Check if at least one meaningful filter is provided (excluding ActivityStates)
        const hasFilter = Boolean(inputArgs.CustomerIds ||
            inputArgs.Emails ||
            inputArgs.FirstNames ||
            inputArgs.LastNames ||
            inputArgs.LoyaltyCodes ||
            inputArgs.CompanyIds ||
            inputArgs.CreatedUtc ||
            inputArgs.UpdatedUtc ||
            inputArgs.DeletedUtc);
        // Ensure required parameters have defaults
        const requestData = {
            Extent: {
                Customers: true,
                Addresses: false,
                Documents: false
            },
            Limitation: {
                Count: 100
            },
            ...inputArgs
        };
        // If no meaningful filters provided, add a default recent date range filter
        if (!hasFilter) {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 3); // 3 months ago
            requestData.CreatedUtc = {
                StartUtc: startDate.toISOString(),
                EndUtc: endDate.toISOString()
            };
        }
        const result = await mewsRequest(config, '/api/connector/v1/customers/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllCustomers.js.map