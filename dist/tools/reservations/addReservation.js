import { mewsRequest } from '../../utils/http.js';
export const addReservationTool = {
    name: 'addReservation',
    description: 'Adds a new reservation with the specified details',
    inputSchema: {
        type: 'object',
        properties: {
            CustomerId: {
                type: 'string',
                description: 'Customer ID for the reservation'
            },
            ServiceId: {
                type: 'string',
                description: 'Service ID'
            },
            RatePlanId: {
                type: 'string',
                description: 'Rate plan ID'
            },
            StartUtc: {
                type: 'string',
                description: 'Check-in date/time (ISO 8601)'
            },
            EndUtc: {
                type: 'string',
                description: 'Check-out date/time (ISO 8601)'
            },
            VoucherCode: {
                type: 'string',
                description: 'Discount voucher code'
            },
            BookingChannel: {
                type: 'string',
                description: 'Channel for booking'
            },
            Notes: {
                type: 'string',
                description: 'Reservation notes'
            },
            SpaceCategoryId: {
                type: 'string',
                description: 'Space category ID'
            },
            AdultCount: {
                type: 'number',
                description: 'Number of adults'
            },
            ChildCount: {
                type: 'number',
                description: 'Number of children'
            }
        },
        required: ['ServiceId', 'RatePlanId', 'StartUtc', 'EndUtc'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/reservations/add', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addReservation.js.map