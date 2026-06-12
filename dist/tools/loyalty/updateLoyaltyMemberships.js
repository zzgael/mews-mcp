import { mewsRequest } from '../../utils/http.js';
export const updateLoyaltyMembershipsTool = {
    name: 'updateLoyaltyMemberships',
    description: 'Updates information about the specified loyalty memberships. Note this operation supports Portfolio Access Tokens.',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyMembershipUpdates: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        LoyaltyMembershipId: { type: 'string', description: 'Unique identifier of the loyalty membership' },
                        LoyaltyProgramId: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Unique identifier of the loyalty program' }
                            },
                            description: 'Unique identifier of the loyalty program (or null if the program should not be updated)'
                        },
                        State: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'State of the loyalty membership' }
                            },
                            description: 'State of the loyalty membership (or null if the state should not be updated)'
                        },
                        IsPrimary: {
                            type: 'object',
                            properties: {
                                Value: { type: 'boolean', description: 'Boolean value defining the primary loyalty membership' }
                            },
                            description: 'Boolean value defining the primary loyalty membership for the account (or null if the value should not be updated)'
                        },
                        Code: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Code of the loyalty membership' }
                            },
                            description: 'Code of the loyalty membership (or null if the code should not be updated)'
                        },
                        ProviderMembershipId: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', maxLength: 100, description: 'Loyalty membership identifier assigned by external provider' }
                            },
                            description: 'Loyalty membership identifier assigned by the external loyalty provider\'s system (or null if the value should not be updated)'
                        },
                        Points: {
                            type: 'object',
                            properties: {
                                Value: { type: 'number', description: 'The loyalty points the account has' }
                            },
                            description: 'The loyalty points the account has in the loyalty membership (or null if the points should not be updated)'
                        },
                        ExpirationDate: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Expiration date of the loyalty membership in UTC timezone in ISO 8601 format' }
                            },
                            description: 'Expiration date of the loyalty membership in UTC timezone in ISO 8601 format (or null if the date should not be updated)'
                        },
                        Url: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'URL of the loyalty membership' }
                            },
                            description: 'URL of the loyalty membership (or null if the URL should not be updated)'
                        },
                        LoyaltyTierId: {
                            type: 'object',
                            properties: {
                                Value: { type: 'string', description: 'Unique identifier of the loyalty tier' }
                            },
                            description: 'Unique identifier of the loyalty tier (or null if the tier should not be updated)'
                        }
                    },
                    required: ['LoyaltyMembershipId'],
                    additionalProperties: false
                },
                description: 'Loyalty memberships to be updated',
                maxItems: 1000
            }
        },
        required: ['LoyaltyMembershipUpdates'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyMemberships/update', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=updateLoyaltyMemberships.js.map