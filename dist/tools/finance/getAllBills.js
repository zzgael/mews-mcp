import { mewsRequest } from '../../utils/http.js';
export const getAllBillsTool = {
    name: 'getAllBills',
    description: 'Returns all bills by filter parameters, used for retrieving billing information',
    inputSchema: {
        type: 'object',
        properties: {
            BillIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific bill IDs',
                maxItems: 1000
            },
            CustomerIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by customer IDs',
                maxItems: 1000
            },
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'Date range filter for bill creation'
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for bill updates'
            },
            States: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by bill states'
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of bills to return' },
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
        const result = await mewsRequest(config, '/api/connector/v1/bills/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllBills.js.map