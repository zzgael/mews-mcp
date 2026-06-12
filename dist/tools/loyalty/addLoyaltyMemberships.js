import { mewsRequest } from '../../utils/http.js';
export const addLoyaltyMembershipsTool = {
    name: 'addLoyaltyMemberships',
    description: 'Adds new loyalty memberships to the system',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyMemberships: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        AccountId: { type: 'string', description: 'Unique identifier of the account (Customer or Company)' },
                        LoyaltyProgramId: { type: 'string', description: 'Unique identifier of the loyalty program' },
                        State: { type: 'string', description: 'State of the loyalty membership' },
                        IsPrimary: { type: 'boolean', description: 'Whether this is the primary loyalty membership for the account' },
                        Code: { type: 'string', description: 'Code of the loyalty membership' },
                        ProviderMembershipId: { type: 'string', description: 'Loyalty membership identifier assigned by external provider', maxLength: 100 },
                        Points: { type: 'number', description: 'The loyalty points the account has in this membership' },
                        ExpirationDate: { type: 'string', description: 'Expiration date of the loyalty membership in UTC timezone in ISO 8601 format' },
                        Url: { type: 'string', description: 'URL of the loyalty membership' },
                        LoyaltyTierId: { type: 'string', description: 'Unique identifier of the loyalty tier' }
                    },
                    required: ['AccountId', 'LoyaltyProgramId'],
                    additionalProperties: false
                },
                description: 'Array of loyalty membership objects to create',
                maxItems: 1000
            }
        },
        required: ['LoyaltyMemberships'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyMemberships/add', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addLoyaltyMemberships.js.map