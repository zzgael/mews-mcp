import { mewsRequest } from '../../utils/http.js';
export const getAllAccountingItemsTool = {
    name: 'getAllAccountingItems',
    description: 'Returns all accounting items (charges, payments, etc.) based on filter parameters. REQUIRED: At least one of the following filters must be specified: AccountingItemIds, RebatedItemIds, ClosedUtc, ConsumedUtc, or UpdatedUtc.',
    inputSchema: {
        type: 'object',
        properties: {
            AccountingItemIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific item IDs (one of the required filters)',
                maxItems: 1000
            },
            RebatedItemIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by rebated item IDs (one of the required filters)',
                maxItems: 1000
            },
            CustomerIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by customer IDs',
                maxItems: 1000
            },
            BillIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by bill IDs',
                maxItems: 1000
            },
            AccountingCategoryIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by accounting category IDs',
                maxItems: 1000
            },
            ConsumedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of consumption date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of consumption date range (ISO 8601)' }
                },
                description: 'Date range filter for item consumption (one of the required filters)'
            },
            ClosedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of closed date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of closed date range (ISO 8601)' }
                },
                description: 'Date range filter for when items were closed (one of the required filters)'
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for when items were last updated (one of the required filters)'
            },
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'Date range filter for item creation'
            },
            States: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by item states'
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of items to return' },
                    Cursor: { type: 'string', description: 'Pagination cursor for next page' }
                },
                description: 'Pagination settings'
            }
        },
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            Limitation: {
                Count: 100
            },
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/accountingItems/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllAccountingItems.js.map