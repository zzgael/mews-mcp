import { mewsRequest } from '../../utils/http.js';
export const getAllLanguagesTool = {
    name: 'getAllLanguages',
    description: 'Returns all languages supported by the API',
    inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/languages/getAll', {});
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllLanguages.js.map