import { mewsRequest } from '../../utils/http.js';
export const getConfigurationTool = {
    name: 'getConfiguration',
    description: 'Returns configuration of the enterprise and the client',
    inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/configuration/get', {});
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getConfiguration.js.map