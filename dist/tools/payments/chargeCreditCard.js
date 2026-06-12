import { mewsRequest } from '../../utils/http.js';
export const chargeCreditCardTool = {
    name: 'chargeCreditCard',
    description: 'Charges a credit card and adds the resulting payment to a customer bill',
    inputSchema: {
        type: 'object',
        properties: {
            CustomerId: {
                type: 'string',
                description: 'Customer ID for the charge'
            },
            Amount: {
                type: 'object',
                properties: {
                    Currency: { type: 'string', description: 'Charge currency code' },
                    Value: { type: 'number', description: 'Charge amount value' }
                },
                required: ['Currency', 'Value'],
                description: 'Charge amount object'
            },
            CreditCardData: {
                type: 'object',
                properties: {
                    Number: { type: 'string', description: 'Credit card number' },
                    Expiry: { type: 'string', description: 'Expiry date (MM/YY)' },
                    Name: { type: 'string', description: 'Cardholder name' },
                    SecurityCode: { type: 'string', description: 'CVV/CVC code' }
                },
                required: ['Number', 'Expiry', 'Name'],
                description: 'Credit card information'
            },
            BillId: {
                type: 'string',
                description: 'Specific bill ID to apply charge to'
            },
            Notes: {
                type: 'string',
                description: 'Charge notes'
            }
        },
        required: ['CustomerId', 'Amount', 'CreditCardData'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/payments/chargeCreditCard', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=chargeCreditCard.js.map