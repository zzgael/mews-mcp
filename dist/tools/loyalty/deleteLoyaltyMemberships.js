import { mewsRequest } from '../../utils/http.js';
export const deleteLoyaltyMembershipsTool = {
    name: 'deleteLoyaltyMemberships',
    description: 'Deletes loyalty memberships',
    inputSchema: {
        type: 'object',
        properties: {
            LoyaltyMembershipIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifier of the loyalty memberships to be deleted',
                maxItems: 1000
            }
        },
        required: ['LoyaltyMembershipIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyMemberships/delete', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=deleteLoyaltyMemberships.js.map