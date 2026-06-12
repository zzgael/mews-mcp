import { mewsRequest } from '../../utils/http.js';
export const getAllServicesTool = {
    name: 'getAllServices',
    description: 'Returns all services offered by the enterprise',
    inputSchema: {
        type: 'object',
        properties: {
            ServiceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific service IDs',
                maxItems: 1000
            },
            ServiceTypes: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by service types'
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for service updates'
            }
        },
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/services/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllServices.js.map