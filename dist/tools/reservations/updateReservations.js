import { mewsRequest } from '../../utils/http.js';
export const updateReservationsTool = {
    name: 'updateReservations',
    description: 'Updates reservation properties',
    inputSchema: {
        type: 'object',
        properties: {
            ReservationUpdates: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        ReservationId: { type: 'string', description: 'Unique identifier of the reservation to update' },
                        StartUtc: { type: 'string', description: 'Check-in date/time (ISO 8601)' },
                        EndUtc: { type: 'string', description: 'Check-out date/time (ISO 8601)' },
                        Notes: { type: 'string', description: 'Reservation notes' },
                        State: { type: 'string', description: 'Reservation state' },
                        SpaceCategoryId: { type: 'string', description: 'Space category ID' },
                        AdultCount: { type: 'number', description: 'Number of adults' },
                        ChildCount: { type: 'number', description: 'Number of children' }
                    },
                    required: ['ReservationId']
                },
                description: 'Array of reservation update objects'
            }
        },
        required: ['ReservationUpdates'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/reservations/update', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=updateReservations.js.map