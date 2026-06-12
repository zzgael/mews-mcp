import { mewsRequest } from '../../utils/http.js';
export const cancelReservationsTool = {
    name: 'cancelReservations',
    description: 'Cancels specified reservations',
    inputSchema: {
        type: 'object',
        properties: {
            ReservationIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of reservation IDs to cancel',
                maxItems: 1000
            },
            CancellationReason: {
                type: 'string',
                description: 'Reason for cancellation'
            },
            Notes: {
                type: 'string',
                description: 'Cancellation notes'
            },
            ChargeCancellationFee: {
                type: 'boolean',
                description: 'Whether to charge cancellation fee'
            }
        },
        required: ['ReservationIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/reservations/cancel', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=cancelReservations.js.map