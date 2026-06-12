import { mewsRequest } from '../../utils/http.js';
export const getAllAddressesTool = {
    name: 'getAllAddresses',
    description: 'Get all addresses associated with specified accounts',
    inputSchema: {
        type: 'object',
        properties: {
            AccountIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of account IDs to get addresses for'
            }
        },
        required: ['AccountIds']
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/addresses/getAll', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllAddresses.js.map