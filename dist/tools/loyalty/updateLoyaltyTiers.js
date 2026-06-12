import { mewsRequest } from '../../utils/http.js';
export const updateLoyaltyTiersTool = {
    name: 'updateLoyaltyTiers',
    description: 'Updates information about the specified loyalty tiers',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyTierUpdates: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        LoyaltyTierId: { type: 'string', description: 'Unique identifier of the loyalty tier' },
                        Name: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Name of the loyalty tier' }
                            },
                            description: 'Name of the loyalty tier (or null if the name should not be updated)'
                        },
                        Description: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Description of the loyalty tier' }
                            },
                            description: 'Description of the loyalty tier (or null if the description should not be updated)'
                        },
                        Level: {
                            type: 'object',
                            properties: {
                                Value: { type: 'number', description: 'Level of the loyalty tier' }
                            },
                            description: 'Level of the loyalty tier (or null if the level should not be updated)'
                        },
                        MinimumPointsRequired: {
                            type: 'object',
                            properties: {
                                Value: { type: 'number', description: 'Minimum points required to reach this tier' }
                            },
                            description: 'Minimum points required to reach this tier (or null if the points should not be updated)'
                        },
                        BenefitDescription: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Description of the benefits for this tier' }
                            },
                            description: 'Description of the benefits for this tier (or null if the description should not be updated)'
                        },
                        IsActive: {
                            type: 'object',
                            properties: {
                                Value: { type: 'boolean', description: 'Whether the loyalty tier is active' }
                            },
                            description: 'Whether the loyalty tier is active (or null if the status should not be updated)'
                        }
                    },
                    required: ['LoyaltyTierId'],
                    additionalProperties: false
                },
                description: 'Loyalty tiers to be updated',
                maxItems: 1000
            }
        },
        required: ['LoyaltyTierUpdates'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyTiers/update', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=updateLoyaltyTiers.js.map