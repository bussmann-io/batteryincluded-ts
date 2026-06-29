import { describe, expect, it } from 'vitest'

import { createTestClient } from './.fixtures/client'

describe('browse endpoint', () => {
  it('returns documents and facets', async () => {
    const client = createTestClient()
    const { data, error } = await client.GET('/browse', {})

    expect(error).toBeUndefined()
    expect(data?.found).toBe(data?.hits.length)
    expect(data?.hits.every(hit => hit.document.id.length > 0)).toBe(true)
    expect(data?.facet_counts.map(facet => facet.field_name)).toContain('_product_i18n.manufacturer')
  })

  it('echoes pagination parameters back in the request params', async () => {
    const client = createTestClient()
    const { data } = await client.GET('/browse', {
      params: { query: { q: 'sofa', page: 2, per_page: 5 } },
    })

    expect(data?.page).toBe(2)
    expect(data?.request_params.per_page).toBe(5)
    expect(data?.request_params.q).toBe('sofa')
  })
})
