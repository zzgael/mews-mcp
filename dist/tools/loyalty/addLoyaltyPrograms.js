import { mewsRequest } from '../../utils/http.js';
export const addLoyaltyProgramsTool = {
    name: 'addLoyaltyPrograms',
    description: 'Adds new loyalty programs to the system',
    inputSchema: {
        type: 'object',
        properties: {
            ChainId: {
                type: 'string',
                description: 'Unique identifier of the chain. Required when using Portfolio Access Tokens, ignored otherwise.'
            },
            LoyaltyPrograms: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        Name: { type: 'string', description: 'Name of the loyalty program' },
                        Description: { type: 'string', description: 'Description of the loyalty program' },
                        ExternalIdentifier: { type: 'string', description: 'External identifier of the loyalty program' },
                        IsActive: { type: 'boolean', description: 'Whether the loyalty program is active' }
                    },
                    required: ['Name'],
                    additionalProperties: false
                },
                description: 'Array of loyalty program objects to create',
                maxItems: 1000
            }
        },
        required: ['LoyaltyPrograms'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyPrograms/add', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addLoyaltyPrograms.js.map