import { mewsRequest } from '../../utils/http.js';
export const getAllLoyaltyMembershipsTool = {
    name: 'getAllLoyaltyMemberships',
    description: 'Returns all loyalty memberships of the enterprise, optionally filtered by specific loyalty membership identifiers, activity states, or other filter parameters. Note this operation uses Pagination and supports Portfolio Access Tokens.',
    inputSchema: {
        type: 'object',
        properties: {
            ChainIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of the chain. If not specified, the operation returns data for all chains within scope of the Access Token.',
                maxItems: 1000
            },
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'The time interval during which the membership was created (max length 3 months)'
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'The time interval during which the membership was last updated (max length 3 months)'
            },
            LoyaltyMembershipIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of Loyalty memberships.',
                maxItems: 1000
            },
            AccountIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of accounts (for example Customers or Companies) the membership is associated with.',
                maxItems: 1000
            },
            LoyaltyProgramIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifiers of Loyalty programs.',
                maxItems: 1000
            },
            MembershipStates: {
                type: 'array',
                items: { type: 'string' },
                description: 'States of the loyalty memberships.'
            },
            ActivityStates: {
                type: 'array',
                items: { type: 'string' },
                description: 'Whether to return only active, only deleted or both records.'
            },
            Codes: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of loyalty membership codes, such as identification numbers printed on loyalty cards visible to the customer.',
                maxItems: 1000
            },
            ProviderMembershipIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of unique loyalty membership identifiers assigned and managed by the external loyalty provider\'s system.',
                maxItems: 1000
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of loyalty memberships to return' },
                    Cursor: { type: 'string', description: 'Pagination cursor for next page' }
                },
                description: 'Limitation on the quantity of data returned'
            }
        },
        required: ['Limitation'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        // Ensure required parameters have defaults
        const requestData = {
            Limitation: {
                Count: 100
            },
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyMemberships/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllLoyaltyMemberships.js.map