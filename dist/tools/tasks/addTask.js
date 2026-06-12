import { mewsRequest } from '../../utils/http.js';
export const addTaskTool = {
    name: 'addTask',
    description: 'Adds a new task to the enterprise, optionally to a specified department',
    inputSchema: {
        type: 'object',
        properties: {
            Name: {
                type: 'string',
                description: 'Task name or title'
            },
            Description: {
                type: 'string',
                description: 'Detailed task description'
            },
            DepartmentId: {
                type: 'string',
                description: 'Department ID to assign the task to'
            },
            ServiceOrderId: {
                type: 'string',
                description: 'Service order ID (reservation or product service order) to associate with'
            },
            DeadlineUtc: {
                type: 'string',
                description: 'Task deadline (ISO 8601)'
            },
            Type: {
                type: 'string',
                description: 'Task type or category'
            },
            State: {
                type: 'string',
                description: 'Initial task state (defaults to Open)'
            }
        },
        required: ['Name']
    },
    async execute(config, args) {
        try {
            // Validate required fields
            if (!args.Name || args.Name.trim().length === 0) {
                throw new Error('Task name is required and cannot be empty');
            }
            // If no deadline is provided, set a default deadline 1 week in the future
            let deadlineUtc = args.DeadlineUtc;
            if (!deadlineUtc) {
                const oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
                deadlineUtc = oneWeekFromNow.toISOString();
            }
            // Validate deadline format if provided
            const deadline = new Date(deadlineUtc);
            // Check if the date is valid
            if (isNaN(deadline.getTime())) {
                throw new Error('Invalid DeadlineUtc format. Please use ISO 8601 format (e.g., "2025-01-10T18:00:00Z")');
            }
            // Ensure deadline is in the future (allowing for some timezone flexibility)
            const now = new Date();
            const fiveMinutesFromNow = new Date(now.getTime() + (5 * 60 * 1000));
            if (deadline < fiveMinutesFromNow) {
                // Automatically adjust to 1 hour from now
                const oneHourFromNow = new Date(now.getTime() + (60 * 60 * 1000));
                deadlineUtc = oneHourFromNow.toISOString();
            }
            // Prepare request payload, excluding undefined fields
            const requestPayload = {
                Name: args.Name,
                DeadlineUtc: deadlineUtc
            };
            if (args.Description)
                requestPayload.Description = args.Description;
            if (args.DepartmentId)
                requestPayload.DepartmentId = args.DepartmentId;
            if (args.ServiceOrderId)
                requestPayload.ServiceOrderId = args.ServiceOrderId;
            if (args.Type)
                requestPayload.Type = args.Type;
            if (args.State)
                requestPayload.State = args.State;
            const response = await mewsRequest(config, '/api/connector/v1/tasks/add', requestPayload);
            const task = response.Task;
            return {
                content: [{
                        type: 'text',
                        text: `✅ **Task Created Successfully**\n\n` +
                            `📋 **${task.Name}**\n` +
                            `   Task ID: ${task.Id}\n` +
                            `   State: ${task.State}\n` +
                            `   Created: ${new Date(task.CreatedUtc).toLocaleString()}\n` +
                            `   Department: ${task.DepartmentId || 'Not assigned'}\n` +
                            `   Service Order: ${task.ServiceOrderId || 'None'}\n` +
                            `   Type: ${task.Type || 'Not specified'}\n` +
                            `   Deadline: ${task.DeadlineUtc ? new Date(task.DeadlineUtc).toLocaleString() : 'Not set'}\n` +
                            `   Description: ${task.Description || 'No description'}\n\n` +
                            `The task has been created and is ready for assignment and tracking.`
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: 'text',
                        text: `Error creating task: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
                    }]
            };
        }
    }
};
//# sourceMappingURL=addTask.js.map