import { mewsRequest } from '../../utils/http.js';
export const exportAccountingItemsTool = {
    name: 'exportAccountingItems',
    description: 'Exports accounting items (charges, payments, etc.) in the specified format and period',
    inputSchema: {
        type: 'object',
        properties: {
            StartUtc: {
                type: 'string',
                description: 'Start date for export (ISO 8601)'
            },
            EndUtc: {
                type: 'string',
                description: 'End date for export (ISO 8601)'
            },
            Format: {
                type: 'string',
                description: 'Export format (CSV, JSON, etc.)',
                enum: ['Csv', 'Json', 'Excel']
            },
            AccountingItemIds: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific accounting item IDs to export',
                maxItems: 1000
            },
            Currency: {
                type: 'string',
                description: 'Currency code for export amounts'
            },
            TimeZone: {
                type: 'string',
                description: 'Time zone for date formatting'
            }
        },
        required: ['StartUtc', 'EndUtc', 'Format'],
        additionalProperties: false
    },
    async execute(config, args) {
        const inputArgs = args;
        const requestData = {
            ...inputArgs
        };
        const result = await mewsRequest(config, '/api/connector/v1/exports/accountingItems', requestData);
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
};
//# sourceMappingURL=exportAccountingItems.js.map