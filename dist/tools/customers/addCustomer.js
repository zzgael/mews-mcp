import { mewsRequest } from '../../utils/http.js';
export const addCustomerTool = {
    name: 'addCustomer',
    description: 'Create a new customer',
    inputSchema: {
        type: 'object',
        properties: {
            FirstName: { type: 'string', description: 'Customer first name' },
            LastName: { type: 'string', description: 'Customer last name' },
            Email: { type: 'string', format: 'email', description: 'Customer email address' },
            Phone: { type: 'string', description: 'Customer phone number' },
            BirthDate: { type: 'string', description: 'Birth date (ISO 8601 format)' },
            BirthPlace: { type: 'string', description: 'Place of birth' },
            CitizenshipCountryCode: { type: 'string', description: 'ISO country code of citizenship' },
            GenderCode: { type: 'string', description: 'Gender code' },
            LanguageCode: { type: 'string', description: 'Preferred language ISO code' },
            NationalityCountryCode: { type: 'string', description: 'ISO country code of nationality' },
            Occupation: { type: 'string', description: 'Customer occupation' },
            Title: { type: 'string', description: 'Customer title (Mr, Ms, etc.)' },
            SecondLastName: { type: 'string', description: 'Second last name' },
            TaxIdentifier: { type: 'string', description: 'Tax identification number' },
            LoyaltyCode: { type: 'string', description: 'Loyalty program code' }
        }
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/customers/add', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addCustomer.js.map