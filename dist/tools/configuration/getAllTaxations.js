import { mewsRequest } from '../../utils/http.js';
export const getAllTaxationsTool = {
    name: 'getAllTaxations',
    description: 'Returns all taxations supported in tax environments',
    inputSchema: {
        type: 'object',
        properties: {
            TaxEnvironmentIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by tax environment IDs'
            }
        },
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/taxations/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllTaxations.js.map