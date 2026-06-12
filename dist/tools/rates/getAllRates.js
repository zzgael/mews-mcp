import { mewsRequest } from '../../utils/http.js';
export const getAllRatesTool = {
    name: 'getAllRates',
    description: 'Returns all rates (pricing) of the enterprise',
    inputSchema: {
        type: 'object',
        properties: {
            RateIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific rate IDs',
                maxItems: 1000
            },
            ServiceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by service IDs',
                maxItems: 1000
            },
            RateGroupIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by rate group IDs',
                maxItems: 1000
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for rate updates'
            }
        },
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/rates/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllRates.js.map