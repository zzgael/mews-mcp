import { mewsRequest } from '../../utils/http.js';
export const getRatePricingTool = {
    name: 'getRatePricing',
    description: 'Returns prices of rates during the specified period',
    inputSchema: {
        type: 'object',
        properties: {
            RateIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of rate IDs to get pricing for',
                maxItems: 1000
            },
            StartUtc: {
                type: 'string',
                description: 'Start date for pricing period (ISO 8601)'
            },
            EndUtc: {
                type: 'string',
                description: 'End date for pricing period (ISO 8601)'
            }
        },
        required: ['RateIds', 'StartUtc', 'EndUtc'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/rates/getPricing', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getRatePricing.js.map