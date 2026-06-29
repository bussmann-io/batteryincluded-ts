import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('suggest endpoint', () => {
  it('returns the suggestion kinds for a valid query', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/suggest', {
      params: { query: { q: 'sofa' } },
    })

    expect(error).toBeUndefined()
    expect(data?.map(entry => entry.kind)).toEqual([
      'document',
      'facet._product_i18n.categoryTree.name',
      'query-completion',
    ])
  })

  it('errors when the query is missing', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/suggest', {
      params: { query: {} },
    })

    expect(data).toBeUndefined()
    expect(error).toBeDefined()
  })
})
