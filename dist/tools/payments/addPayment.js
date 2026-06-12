import { mewsRequest } from '../../utils/http.js';
export const addPaymentTool = {
    name: 'addPayment',
    description: 'Adds a new payment to a customer\'s bill',
    inputSchema: {
        type: 'object',
        properties: {
            CustomerId: {
                type: 'string',
                description: 'Customer ID for the payment'
            },
            BillId: {
                type: 'string',
                description: 'Specific bill ID to apply payment to'
            },
            Amount: {
                type: 'object',
                properties: {
                    Currency: { type: 'string', description: 'Payment currency code' },
                    Value: { type: 'number', description: 'Payment amount value' }
                },
                required: ['Currency', 'Value'],
                description: 'Payment amount object'
            },
            PaymentMethodId: {
                type: 'string',
                description: 'Payment method identifier'
            },
            Notes: {
                type: 'string',
                description: 'Payment notes'
            },
            ConsumedUtc: {
                type: 'string',
                description: 'Payment consumption date/time (ISO 8601)'
            }
        },
        required: ['CustomerId', 'Amount', 'PaymentMethodId'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/payments/add', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addPayment.js.map