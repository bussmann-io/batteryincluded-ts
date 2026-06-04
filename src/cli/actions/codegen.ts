import type { ProbeConfig } from 'autodisco'

import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import discover from 'autodisco'
import { loadConfig } from 'c12'
import defu from 'defu'

import { buildBaseUrl, buildHeaders, createClient } from '../../client'

interface BrowseClientPaths {
  '/browse': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': {
              hits: {
                document: {
                  id: string
                }
              }[]
            }
          }
        }
      }
    }
  }
}

interface CodegenArgs {
  outputDir: string
  collection?: string
  apiKey?: string
  recommendationId?: string
  suggestQuery?: string
}

/**
 * Builds the content of the augmentation file to merge generated types with the batteryincluded package types.
 *
 * @returns The content of the augmentation file as a string.
 */
function buildAugmentationFile() {
  return [
    'import type { paths as generatedPaths, components as generatedComponents } from \'./openapi/types\'',
    '',
    'declare module \'batteryincluded\' {',
    '  interface paths extends generatedPaths {}',
    '  interface components extends generatedComponents {}',
    '}',
    '',
    'export {}',
    '',
  ].join('\n')
}

/**
 * Runs the code generation process for a BatteryIncluded collection.
 *
 * @param args The arguments for the code generation process.
 */
export async function codegen(args: CodegenArgs) {
  if (!args.collection) {
    throw new Error('Collection name is required. Please specify it using the --collection flag or set the BATTERYINCLUDED_COLLECTION environment variable.')
  }

  if (!args.apiKey) {
    throw new Error('API key is required. Please specify it using the --api-key flag or set the BATTERYINCLUDED_API_KEY environment variable.')
  }

  const cwd = process.cwd()

  // Resolved config from batteryincluded rc file if it exists
  const { config: resolved } = await loadConfig<Record<string, ProbeConfig | ProbeConfig[]>>({
    name: 'batteryincluded',
    cwd,
    rcFile: 'batteryincluded-rc',
    globalRc: false,
    dotenv: false,
  })

  let config: Record<string, ProbeConfig | ProbeConfig[]> = resolved ?? {}

  const suggestQuery = args.suggestQuery ?? 'a'

  let recommendationId = args.recommendationId

  if (!recommendationId) {
    const client = createClient<BrowseClientPaths>({ collection: args.collection, apiKey: args.apiKey })

    recommendationId = await client.GET('/browse', { params: { query: { per_page: 1 } } }).then(({ data }) => data?.hits?.[0]?.document?.id)
  }

  if (!recommendationId) {
    throw new Error('No document found in the collection to use for generating recommendation types. Please specify a document ID using the --recommendation-id flag or ensure that the collection contains at least one document.')
  }

  // Default config with required parameters if no other config provided
  config = defu(config, {
    '/browse': {
      query: {
        page: 1,
        per_page: 10,
      },
    },

    '/highlights': {},

    '/suggest': {
      query: {
        q: suggestQuery,
      },
    },

    '/recommendations': {
      query: {
        id: recommendationId,
      },
    },

    '/similar-search': {
      query: {
        q: suggestQuery,
      },
    },

    '/presets': {},
  })

  // Run discovery to generate OpenAPI schema and types based on the provided config
  await discover({
    baseUrl: buildBaseUrl(args.collection),
    headers: buildHeaders(args.apiKey),

    outputDir: args.outputDir,

    generate: {
      markdown: false,
      openapi: {
        typescript: true,
      },
    },

    probes: {
      get: {
        ...config,
      },
    },
  })

  // Write augmentation file to merge generated types with the batteryincluded package types
  await writeFile(join(args.outputDir, 'index.d.ts'), buildAugmentationFile(), 'utf8')
}
