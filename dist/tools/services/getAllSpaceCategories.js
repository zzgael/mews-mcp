import { mewsRequest } from '../../utils/http.js';
export const getAllSpaceCategoriesTool = {
    name: 'getAllSpaceCategories',
    description: 'Returns all space categories of a service',
    inputSchema: {
        type: 'object',
        properties: {
            ServiceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by service IDs',
                maxItems: 1000
            },
            SpaceCategoryIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific category IDs',
                maxItems: 1000
            },
            UpdatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of update date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of update date range (ISO 8601)' }
                },
                description: 'Date range filter for category updates'
            }
        },
        required: ['ServiceIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/spaceCategories/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllSpaceCategories.js.map