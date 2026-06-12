import { mewsRequest } from '../../utils/http.js';
export const getAllAvailabilityBlocksTool = {
    name: 'getAllAvailabilityBlocks',
    description: 'Returns all availability blocks (reservations blocked by rate, space category, or space) based on filter parameters. Note: At least one filter must be provided (CreatedUtc, UpdatedUtc, CollidingUtc, AvailabilityBlockIds, or ExternalIdentifiers). The time interval must not exceed 100 hours.',
    inputSchema: {
        type: 'object',
        properties: {
            AvailabilityBlockIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by specific availability block IDs',
                maxItems: 1000
            },
            ServiceIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by service IDs',
                maxItems: 1000
            },
            StartUtc: {
                type: 'string',
                description: 'Start date for search (ISO 8601)'
            },
            EndUtc: {
                type: 'string',
                description: 'End date for search (ISO 8601)'
            },
            CollidingUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of collision range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of collision range (ISO 8601)' }
                },
                description: 'Find blocks that collide with this time range'
            }
        },
        required: ['StartUtc', 'EndUtc'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/availabilityBlocks/getAll', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllAvailabilityBlocks.js.map