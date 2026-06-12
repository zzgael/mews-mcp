import { mewsRequest } from '../../utils/http.js';
export const getAllReservationsTool = {
    name: 'getAllReservations',
    description: 'Get reservations with filters. Note: The time interval between StartUtc and EndUtc must not exceed 100 hours.',
    inputSchema: {
        type: 'object',
        properties: {
            ReservationIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific reservation IDs to retrieve'
            },
            CustomerIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by customer IDs'
            },
            States: {
                type: 'array',
                items: { type: 'string' },
                description: 'Filter by reservation states (Confirmed, Canceled, etc.)'
            },
            StartUtc: {
                type: 'string',
                description: 'Start date for search (ISO 8601)'
            },
            EndUtc: {
                type: 'string',
                description: 'End date for search (ISO 8601)'
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of reservations to return' },
                    Cursor: { type: 'string', description: 'Pagination cursor for next page' }
                },
                description: 'Pagination settings'
            }
        },
        required: ['StartUtc', 'EndUtc']
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/reservations/getAll', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=getAllReservations.js.map