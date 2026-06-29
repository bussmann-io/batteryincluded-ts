import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('recommendations endpoint', () => {
  it('returns scored recommendations for a valid id', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/recommendations', {
      params: { query: { id: 'prod-2001' } },
    })

    expect(error).toBeUndefined()
    expect(data?.length).toBeGreaterThan(0)
    expect(data?.every(item => item.score > 0 && item.document.id.length > 0)).toBe(true)
  })

  it('errors when the id is missing', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/recommendations', {
      params: { query: {} },
    })

    expect(data).toBeUndefined()
    expect(error).toBeDefined()
  })
})
