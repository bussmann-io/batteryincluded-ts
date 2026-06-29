import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('similar-search endpoint', () => {
  it('echoes the query for a valid request', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/similar-search', {
      params: { query: { q: 'sofa' } },
    })

    expect(error).toBeUndefined()
    expect(data?.[0]?.q).toBe('sofa')
    expect(data?.[0]?.hits).toBeGreaterThan(0)
  })

  it('errors when the query is missing', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/similar-search', {
      params: { query: {} },
    })

    expect(data).toBeUndefined()
    expect(error).toBeDefined()
  })
})
