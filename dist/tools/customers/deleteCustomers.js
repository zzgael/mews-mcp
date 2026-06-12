import { mewsRequest } from '../../utils/http.js';
export const deleteCustomersTool = {
    name: 'deleteCustomers',
    description: 'Deletes specified customers',
    inputSchema: {
        type: 'object',
        properties: {
            CustomerIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of customer IDs to delete',
                maxItems: 1000
            }
        },
        required: ['CustomerIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/customers/delete', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=deleteCustomers.js.map