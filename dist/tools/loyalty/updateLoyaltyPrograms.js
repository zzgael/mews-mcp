import { mewsRequest } from '../../utils/http.js';
export const updateLoyaltyProgramsTool = {
    name: 'updateLoyaltyPrograms',
    description: 'Updates information about the specified loyalty programs',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyProgramUpdates: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        LoyaltyProgramId: { type: 'string', description: 'Unique identifier of the loyalty program' },
                        Name: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Name of the loyalty program' }
                            },
                            description: 'Name of the loyalty program (or null if the name should not be updated)'
                        },
                        Description: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Description of the loyalty program' }
                            },
                            description: 'Description of the loyalty program (or null if the description should not be updated)'
                        },
                        ExternalIdentifier: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'External identifier of the loyalty program' }
                            },
                            description: 'External identifier of the loyalty program (or null if the identifier should not be updated)'
                        },
                        IsActive: {
                            type: 'object',
                            properties: {
                                Value: { type: 'boolean', description: 'Whether the loyalty program is active' }
                            },
                            description: 'Whether the loyalty program is active (or null if the status should not be updated)'
                        }
                    },
                    required: ['LoyaltyProgramId'],
                    additionalProperties: false
                },
                description: 'Loyalty programs to be updated',
                maxItems: 1000
            }
        },
        required: ['LoyaltyProgramUpdates'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyPrograms/update', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=updateLoyaltyPrograms.js.map