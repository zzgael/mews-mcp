import { mewsRequest } from '../../utils/http.js';
export const getAllCurrenciesTool = {
    name: 'getAllCurrencies',
    description: 'Returns all currencies supported by the API',
    inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/currencies/getAll', {});
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllCurrencies.js.map