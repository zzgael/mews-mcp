import { Tool, ToolResult } from '../base.js';
import type { MewsAuthConfig } from '../../types/auth.js';
import { mewsRequest } from '../../utils/http.js';

export const getAllReservationsTool: Tool = {
  name: 'getAllReservations',
  description: 'Get reservations with filters. Note: The time interval between StartUtc and EndUtc must not exceed 100 hours.',
  inputSchema: {
    type: 'object',
    properties: {
      ReservationIds: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'Specific reservation IDs to retrieve'
      },
      CustomerIds: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'Filter by customer IDs'
      },
      States: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'Filter by reservation states (Confirmed, Canceled, etc.)'
      },
      StartUtc: {
        type: 'string',
        description: 'Start date for search (ISO 8601)'
      },
      EndUtc: {
        type: 'string',
        description: 'End date for search (ISO 8601)'
      },
      Limitation: {
        type: 'object',
        properties: {
          Count: { type: 'number', description: 'Maximum number of reservations to return' },
          Cursor: { type: 'string', description: 'Pagination cursor for next page' }
        },
        description: 'Pagination settings'
      },
      Extent: {
        type: 'object',
        properties: {
          Reservations: { type: 'boolean', description: 'Include reservations' },
          ReservationGroups: { type: 'boolean', description: 'Include reservation groups' },
          Services: { type: 'boolean', description: 'Include services' },
          BusinessSegments: { type: 'boolean', description: 'Include business segments' },
          Customers: { type: 'boolean', description: 'Include linked customers (name/contact)' },
          Items: { type: 'boolean', description: 'Include accounting items' },
          Products: { type: 'boolean', description: 'Include products' },
          Rates: { type: 'boolean', description: 'Include rates' },
          Companies: { type: 'boolean', description: 'Include companies' },
          TravelAgencies: { type: 'boolean', description: 'Include travel agencies' }
        },
        description: 'Which related data to return. Defaults to { Reservations: true, Customers: true } ' +
          'when omitted. Do NOT rely on the Mews default extent: it implicitly requests the ' +
          'GDPR-sensitive customer sub-extents (CustomerAdresses, CustomerIdentityDocuments), which ' +
          'require a dedicated Mews grant and otherwise fail with 401 "No permissions to use such an extent".'
      }
    },
    required: ['StartUtc', 'EndUtc']
  },

  async execute(config: MewsAuthConfig, args: unknown): Promise<ToolResult> {
    const inputArgs = (args ?? {}) as Record<string, unknown>;

    // Send an explicit Extent. Without it, Mews applies a default extent that
    // implicitly pulls customer addresses + identity documents (GDPR-sensitive
    // sub-extents most integration tokens are NOT granted), returning a 401
    // "No permissions to use such an extent (CustomerAdresses,CustomerIdentityDocuments)".
    // The caller can override Extent via args.
    const requestData: Record<string, unknown> = {
      Extent: { Reservations: true, Customers: true },
      ...inputArgs
    };

    const result = await mewsRequest(config, '/api/connector/v1/reservations/getAll', requestData);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }
};