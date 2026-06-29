import { describe, it } from 'vitest'
import { codegen } from '../src/cli/actions/codegen'

describe('codegen', () => {
  it('generates OpenAPI types correctly', async () => {
    await codegen({
      outputDir: 'test/.artifacts',
      collection: 'customer.example.com',
      apiKey: 'test-api-key',
      suggestQuery: 'a',
    })
  })
})
