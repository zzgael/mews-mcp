import { mewsRequest } from '../../utils/http.js';
export const addVouchersTool = {
    name: 'addVouchers',
    description: 'Adds new vouchers (discount codes, gift certificates) to the system',
    inputSchema: {
        type: 'object',
        properties: {
            Vouchers: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        Name: { type: 'string', description: 'Voucher name' },
                        Code: { type: 'string', description: 'Voucher code' },
                        Value: {
                            type: 'object',
                            properties: {
                                Currency: { type: 'string', description: 'Voucher currency' },
                                Amount: { type: 'number', description: 'Voucher amount' }
                            },
                            description: 'Voucher value'
                        },
                        ValidityStartUtc: { type: 'string', description: 'Voucher validity start (ISO 8601)' },
                        ValidityEndUtc: { type: 'string', description: 'Voucher validity end (ISO 8601)' },
                        UsageLimit: { type: 'number', description: 'Maximum number of uses' },
                        Type: { type: 'string', description: 'Voucher type' },
                        AccountingCategoryId: { type: 'string', description: 'Accounting category for voucher' }
                    },
                    required: ['Name', 'Code']
                },
                description: 'Array of voucher objects to create'
            }
        },
        required: ['Vouchers'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/vouchers/add', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addVouchers.js.map