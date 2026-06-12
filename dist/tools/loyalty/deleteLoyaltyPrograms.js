import { mewsRequest } from '../../utils/http.js';
export const deleteLoyaltyProgramsTool = {
    name: 'deleteLoyaltyPrograms',
    description: 'Deletes loyalty programs',
    inputSchema: {
        type: 'object',
        properties: {
            LoyaltyProgramIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Unique identifier of the loyalty programs to be deleted',
                maxItems: 1000
            }
        },
        required: ['LoyaltyProgramIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/loyaltyPrograms/delete', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=deleteLoyaltyPrograms.js.map