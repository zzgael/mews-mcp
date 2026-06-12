import { mewsRequest } from '../../utils/http.js';
export const addAddressesTool = {
    name: 'addAddresses',
    description: 'Add new addresses to accounts',
    inputSchema: {
        type: 'object',
        properties: {
            Addresses: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        AccountId: { type: 'string', description: 'Account ID to add address to' },
                        Line1: { type: 'string', description: 'First line of address' },
                        Line2: { type: 'string', description: 'Second line of address' },
                        City: { type: 'string', description: 'City' },
                        PostalCode: { type: 'string', description: 'Postal/ZIP code' },
                        CountryCode: { type: 'string', description: 'ISO country code' },
                        CountrySubdivisionCode: { type: 'string', description: 'State/province code' }
                    },
                    required: ['AccountId']
                }
            }
        },
        required: ['Addresses']
    },
    async execute(config, args) {
        const result = await mewsRequest(config, '/api/connector/v1/addresses/add', args);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=addAddresses.js.map