import { mewsRequest } from '../../utils/http.js';
export const getAllTaxEnvironmentsTool = {
    name: 'getAllTaxEnvironments',
    description: 'Returns all tax environments supported by the API',
    inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/taxEnvironments/getAll', {});
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllTaxEnvironments.js.map