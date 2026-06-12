import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  loadPropertyRegistry,
  resolveAccessToken,
} from '../dist/config/properties.js';

test('loadPropertyRegistry parses MEWS_PROPERTIES JSON into a registry', () => {
  process.env.MEWS_PROPERTIES = JSON.stringify([
    { propertyName: 'park hotel london', token: 'TKA' },
    { propertyName: 'nice resort', token: 'TKB' },
  ]);
  delete process.env.MEWS_ACCESS_TOKEN;

  const registry = loadPropertyRegistry();
  assert.equal(registry.size, 2);
  assert.equal(registry.get('park hotel london'), 'TKA');
  assert.equal(registry.get('nice resort'), 'TKB');
});

test('loadPropertyRegistry falls back to legacy single MEWS_ACCESS_TOKEN', () => {
  delete process.env.MEWS_PROPERTIES;
  process.env.MEWS_ACCESS_TOKEN = 'LEGACY';

  const registry = loadPropertyRegistry();
  assert.equal(registry.size, 1);
  assert.equal(registry.get('default'), 'LEGACY');
});

test('loadPropertyRegistry throws on invalid JSON', () => {
  process.env.MEWS_PROPERTIES = 'not-json';
  assert.throws(() => loadPropertyRegistry(), /not valid JSON/);
});

test('resolveAccessToken resolves a named property', () => {
  const registry = new Map([
    ['a', 'TA'],
    ['b', 'TB'],
  ]);
  assert.deepEqual(resolveAccessToken(registry, 'b'), {
    propertyName: 'b',
    accessToken: 'TB',
  });
});

test('resolveAccessToken defaults to the sole property when name omitted', () => {
  const registry = new Map([['only', 'T']]);
  assert.deepEqual(resolveAccessToken(registry), {
    propertyName: 'only',
    accessToken: 'T',
  });
});

test('resolveAccessToken requires a name when several properties exist', () => {
  const registry = new Map([
    ['a', 'TA'],
    ['b', 'TB'],
  ]);
  assert.throws(() => resolveAccessToken(registry), /property_name is required/);
});

test('resolveAccessToken lists available properties on unknown name', () => {
  const registry = new Map([['a', 'TA']]);
  assert.throws(() => resolveAccessToken(registry, 'ghost'), /Available properties: \[a\]/);
});
