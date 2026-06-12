import { mewsRequest } from '../../utils/http.js';
export const getAllTasksTool = {
    name: 'getAllTasks',
    description: 'Returns all tasks of the enterprise, filtered by identifiers or other filters. REQUIRED: At least one filter must be provided (TaskIds, DepartmentIds, ServiceOrderIds, CreatedUtc, ClosedUtc, or DeadlineUtc). LIMITATIONS: Date range filters (CreatedUtc, ClosedUtc, DeadlineUtc) have a maximum interval of 3 months and 1 day. Array filters (TaskIds, DepartmentIds, ServiceOrderIds) are limited to 1000 items each. The Limitation parameter with Count is mandatory for pagination.',
    inputSchema: {
        type: 'object',
        properties: {
            TaskIds: {
                type: 'array',
                items: { type: 'string' },
                maxItems: 1000,
                description: 'Filter by specific task IDs'
            },
            DepartmentIds: {
                type: 'array',
                items: { type: 'string' },
                maxItems: 1000,
                description: 'Filter by department IDs'
            },
            ServiceOrderIds: {
                type: 'array',
                items: { type: 'string' },
                maxItems: 1000,
                description: 'Filter by service order IDs (reservations or product service orders)'
            },
            CreatedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of creation date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of creation date range (ISO 8601)' }
                },
                description: 'Date range filter for task creation (max 3 months)'
            },
            ClosedUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of closure date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of closure date range (ISO 8601)' }
                },
                description: 'Date range filter for task closure (max 3 months)'
            },
            DeadlineUtc: {
                type: 'object',
                properties: {
                    StartUtc: { type: 'string', description: 'Start of deadline date range (ISO 8601)' },
                    EndUtc: { type: 'string', description: 'End of deadline date range (ISO 8601)' }
                },
                description: 'Date range filter for task deadlines (max 3 months)'
            },
            Limitation: {
                type: 'object',
                properties: {
                    Count: { type: 'number', description: 'Maximum number of tasks to return' },
                    Cursor: { type: 'string', description: 'Pagination cursor for next page' }
                },
                required: ['Count'],
                description: 'Pagination settings with cursor support'
            }
        },
        required: ['Limitation'],
        additionalProperties: false
    },
    async execute(config, args) {
        try {
            // Validate date ranges (max 3 months)
            const validateDateRange = (range, rangeName) => {
                if (!range || !range.StartUtc || !range.EndUtc)
                    return;
                const start = new Date(range.StartUtc);
                const end = new Date(range.EndUtc);
                const diffMonths = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30);
                if (diffMonths > 3) {
                    throw new Error(`${rangeName} date range cannot exceed 3 months`);
                }
            };
            validateDateRange(args.CreatedUtc, 'CreatedUtc');
            validateDateRange(args.ClosedUtc, 'ClosedUtc');
            validateDateRange(args.DeadlineUtc, 'DeadlineUtc');
            // Validate array limits
            if (args.TaskIds && args.TaskIds.length > 1000) {
                throw new Error('TaskIds cannot exceed 1000 items');
            }
            if (args.DepartmentIds && args.DepartmentIds.length > 1000) {
                throw new Error('DepartmentIds cannot exceed 1000 items');
            }
            if (args.ServiceOrderIds && args.ServiceOrderIds.length > 1000) {
                throw new Error('ServiceOrderIds cannot exceed 1000 items');
            }
            const response = await mewsRequest(config, '/api/connector/v1/tasks/getAll', args);
            const taskCount = response.Tasks?.length || 0;
            const hasMore = !!response.Cursor;
            return {
                content: [{
                        type: 'text',
                        text: `Retrieved ${taskCount} task${taskCount !== 1 ? 's' : ''}${hasMore ? ' (more available)' : ''}:\n\n` +
                            response.Tasks.map((task) => `📋 **${task.Name}** (${task.State})\n` +
                                `   ID: ${task.Id}\n` +
                                `   Created: ${new Date(task.CreatedUtc).toLocaleString()}\n` +
                                `   Department: ${task.DepartmentId || 'Not assigned'}\n` +
                                `   Service Order: ${task.ServiceOrderId || 'None'}\n` +
                                `   Deadline: ${task.DeadlineUtc ? new Date(task.DeadlineUtc).toLocaleString() : 'Not set'}\n` +
                                `   Description: ${task.Description || 'No description'}\n`).join('\n') +
                            (hasMore ? `\n📄 **Pagination:** Use cursor "${response.Cursor}" to get more results` : '')
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: 'text',
                        text: `Error retrieving tasks: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
                    }]
            };
        }
    }
};
//# sourceMappingURL=getAllTasks.js.map