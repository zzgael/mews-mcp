import { mewsRequest } from '../../utils/http.js';
export const getAllPaymentsTool = {
    name: 'getAllPayments',
    description: 'Returns all payments based on filter parameters',
    inputSchema: {
        type: 'object',
        properties: {
            PaymentIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific payment IDs',
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
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'Date range filter for payment creation'
            },
            ConsumedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of consumption date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of consumption date range (ISO 8601)' }
                },
                description: 'Date range filter for payment consumption'
            },
            States: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by payment states'
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of payments to return' },
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
        const result = await mewsRequest(config, '/api/connector/v1/payments/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllPayments.js.map