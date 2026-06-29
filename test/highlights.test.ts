import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('highlights endpoint', () => {
  it('returns search and query suggestions', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/highlights', {})

    expect(error).toBeUndefined()
    expect(Array.isArray(data?.searches)).toBe(true)
    expect(data?.querySuggestions.length).toBeGreaterThan(0)
  })
})
