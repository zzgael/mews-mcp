import { mewsRequest } from '../../utils/http.js';
export const getLanguageTextsTool = {
    name: 'getLanguageTexts',
    description: 'Returns translations of texts in the specified languages',
    inputSchema: {
        type: 'object',
        properties: {
            LanguageCodes: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of language codes to get translations for'
            },
            Scope: {
                type: 'string',
                description: 'Scope of texts to retrieve'
            }
        },
        required: ['LanguageCodes'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/languages/getTexts', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getLanguageTexts.js.map