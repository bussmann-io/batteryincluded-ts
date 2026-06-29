import type { paths } from './types/openapi'

import { createClient } from '../../src/client'

/**
 * Creates a client pointed at the mocked `customer.example.com` collection.
 */
export function createTestClient() {
  return createClient<paths>({
    collection: 'customer.example.com',
    apiKey: 'test-api-key',
  })
}
