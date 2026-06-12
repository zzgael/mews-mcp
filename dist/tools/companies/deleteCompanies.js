import { mewsRequest } from '../../utils/http.js';
export const deleteCompaniesTool = {
    name: 'deleteCompanies',
    description: 'Deletes specified companies',
    inputSchema: {
        type: 'object',
        properties: {
            CompanyIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of company IDs to delete',
                maxItems: 1000
            }
        },
        required: ['CompanyIds'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/companies/delete', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=deleteCompanies.js.map