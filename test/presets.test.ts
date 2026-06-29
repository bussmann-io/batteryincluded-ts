import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('presets endpoint', () => {
  it('returns presets with an id and name', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/presets', {})

    expect(error).toBeUndefined()
    expect(data?.length).toBeGreaterThan(0)
    expect(data?.every(preset => preset.id.length > 0 && preset.name.length > 0)).toBe(true)
  })
})
