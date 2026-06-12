import { mewsRequest } from '../../utils/http.js';
export const updateCustomersTool = {
    name: 'updateCustomers',
    description: 'Updates personal information of existing customers',
    inputSchema: {
        type: 'object',
        properties: {
            CustomerUpdates: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        CustomerId: { type: 'string', description: 'Unique identifier of the customer to update' },
                        FirstName: { type: 'string', description: 'Customer first name' },
                        LastName: { type: 'string', description: 'Customer last name' },
                        SecondLastName: { type: 'string', description: 'Customer second last name' },
                        Title: { type: 'string', description: 'Customer title (Mr, Ms, etc.)' },
                        Email: { type: 'string', description: 'Customer email address' },
                        Phone: { type: 'string', description: 'Customer phone number' },
                        BirthDate: { type: 'string', description: 'Customer birth date (ISO 8601)' },
                        BirthPlace: { type: 'string', description: 'Customer birth place' },
                        CitizenshipCountryCode: { type: 'string', description: 'ISO country code of citizenship' },
                        NationalityCountryCode: { type: 'string', description: 'ISO country code of nationality' },
                        GenderCode: { type: 'string', description: 'Gender code' },
                        LanguageCode: { type: 'string', description: 'Preferred language ISO code' },
                        LoyaltyCode: { type: 'string', description: 'Loyalty program code' },
                        Occupation: { type: 'string', description: 'Customer occupation' },
                        TaxIdentifier: { type: 'string', description: 'Tax identification number' }
                    },
                    required: ['CustomerId']
                },
                description: 'Array of customer update objects'
            }
        },
        required: ['CustomerUpdates'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/customers/update', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=updateCustomers.js.map