import { mewsRequest } from '../../utils/http.js';
export const addLoyaltyTiersTool = {
    name: 'addLoyaltyTiers',
    description: 'Adds new loyalty tiers to the system',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyTiers: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        LoyaltyProgramId: { type: 'string', description: 'Unique identifier of the loyalty program' },
                        Name: { type: 'string', description: 'Name of the loyalty tier' },
                        Description: { type: 'string', description: 'Description of the loyalty tier' },
                        Level: { type: 'number', description: 'Level of the loyalty tier (lower numbers = lower tiers)' },
                        MinimumPointsRequired: { type: 'number', description: 'Minimum points required to reach this tier' },
                        BenefitDescription: { type: 'string', description: 'Description of the benefits for this tier' },
                        IsActive: { type: 'boolean', description: 'Whether the loyalty tier is active' }
                    },
                    required: ['LoyaltyProgramId', 'Name'],
                    additionalProperties: false
                },
                description: 'Array of loyalty tier objects to create',
                maxItems: 1000
            }
        },
        required: ['LoyaltyTiers'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyTiers/add', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addLoyaltyTiers.js.map