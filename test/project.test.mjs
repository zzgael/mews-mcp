import { test } from 'node:test';
import assert from 'node:assert/strict';

import { project } from '../dist/utils/project.js';

const RAW_RESERVATIONS = {
  Reservations: [
    {
      Id: 'r1',
      Number: '78263',
      State: 'Confirmed',
      CreatorProfileId: 'noise-1',
      UpdaterProfileId: 'noise-2',
      BookerId: null,
      VoucherId: null,
      QrCodeData: '{"big":"redundant json blob"}',
      StartUtc: '2026-06-11T16:00:00Z',
      EndUtc: '2026-06-13T16:00:00Z',
      ScheduledStartUtc: '2026-06-11T16:00:00Z',
      ScheduledEndUtc: '2026-06-13T16:00:00Z',
      AccountId: 'acc1',
      PersonCounts: [{ AgeCategoryId: 'age1', Count: 2 }],
    },
  ],
  Cursor: 'r1',
};

test('project drops noise keys, nulls and deprecated fields for reservations', () => {
  const out = project('getAllReservations', RAW_RESERVATIONS, false);
  const r = out.Reservations[0];

  assert.equal(r.Id, 'r1');
  assert.equal(r.State, 'Confirmed');
  assert.equal(r.ScheduledStartUtc, '2026-06-11T16:00:00Z');
  // noise / deprecated / null stripped
  assert.ok(!('CreatorProfileId' in r));
  assert.ok(!('UpdaterProfileId' in r));
  assert.ok(!('QrCodeData' in r));
  assert.ok(!('StartUtc' in r));
  assert.ok(!('EndUtc' in r));
  assert.ok(!('BookerId' in r));
});

test('project with full=true returns the raw response untouched', () => {
  const out = project('getAllReservations', RAW_RESERVATIONS, true);
  assert.deepEqual(out, RAW_RESERVATIONS);
  assert.equal(out.Reservations[0].QrCodeData, '{"big":"redundant json blob"}');
});

test('project whitelists customers and drops null document fields', () => {
  const raw = {
    Customers: [
      {
        Id: 'c1',
        FirstName: 'Cert',
        LastName: 'Run1',
        Email: 'cert@example.dev',
        ChainId: 'noise',
        Passport: null,
        IdentityCard: null,
        ItalianFiscalCode: null,
        CreatorProfileId: 'noise',
      },
    ],
    Cursor: 'c1',
  };
  const out = project('getAllCustomers', raw, false);
  const c = out.Customers[0];
  assert.equal(c.FirstName, 'Cert');
  assert.equal(c.Email, 'cert@example.dev');
  assert.ok(!('ChainId' in c));
  assert.ok(!('Passport' in c));
  assert.ok(!('ItalianFiscalCode' in c));
  assert.ok(!('CreatorProfileId' in c));
});

test('project applies generic prune (strip nulls) to unwhitelisted tools', () => {
  const raw = { Countries: [{ Code: 'FR', Name: 'France', EmptyField: null }] };
  const out = project('getAllCountries', raw, false);
  assert.equal(out.Countries[0].Code, 'FR');
  assert.ok(!('EmptyField' in out.Countries[0]));
});
