import { mewsRequest } from '../../utils/http.js';
export const deleteLoyaltyTiersTool = {
    name: 'deleteLoyaltyTiers',
    description: 'Deletes loyalty tiers',
    inputSchema: {
        type: 'object',
        properties: {
            LoyaltyTierIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifier of the loyalty tiers to be deleted',
                maxItems: 1000
            }
        },
        required: ['LoyaltyTierIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyTiers/delete', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=deleteLoyaltyTiers.js.map