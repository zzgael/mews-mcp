import { mewsRequest } from '../../utils/http.js';
export const mergeCustomersTool = {
    name: 'mergeCustomers',
    description: 'Merges two customers together',
    inputSchema: {
        type: 'object',
        properties: {
            SourceCustomerId: {
                type: 'string',
                description: 'ID of customer to merge from'
            },
            TargetCustomerId: {
                type: 'string',
                description: 'ID of customer to merge into'
            }
        },
        required: ['SourceCustomerId', 'TargetCustomerId'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/customers/merge', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=mergeCustomers.js.map