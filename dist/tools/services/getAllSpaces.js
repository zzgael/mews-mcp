import { mewsRequest } from '../../utils/http.js';
export const getAllSpacesTool = {
    name: 'getAllSpaces',
    description: 'Returns all spaces of the enterprise, or only those specified',
    inputSchema: {
        type: 'object',
        properties: {
            SpaceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific space IDs',
                maxItems: 1000
            },
            ServiceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by service IDs',
                maxItems: 1000
            },
            SpaceCategoryIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by space category IDs',
                maxItems: 1000
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for space updates'
            }
        },
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/spaces/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllSpaces.js.map