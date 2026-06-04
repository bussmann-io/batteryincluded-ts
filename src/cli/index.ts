#!/usr/bin/env node
import process from 'node:process'
import { defineCommand, runMain } from 'citty'
import { config as loadEnv } from 'dotenv'

import { codegen } from './actions/codegen'

const { parsed } = loadEnv({ quiet: true })
const env = parsed ?? process.env

const COLLECTION = Object.entries(env).find(([key]) => key.endsWith('BATTERYINCLUDED_COLLECTION'))?.[1]
const API_KEY = Object.entries(env).find(([key]) => key.endsWith('BATTERYINCLUDED_API_KEY'))?.[1]

const command = defineCommand({
  meta: {
    name: 'codegen',
    description: 'Generate OpenAPI Schema and TypeScript types for a BatteryIncluded collection.',
  },

  args: {
    outputDir: {
      type: 'positional',
      description: 'Location of the output directory.',
      default: env.BATTERYINCLUDED_CODEGEN_OUTDIR ?? 'batteryincluded/types',
      required: false,
    },

    collection: {
      type: 'string',
      description: 'The BatteryIncluded collection to use.',
      default: COLLECTION,
      required: false,
    },

    apiKey: {
      type: 'string',
      description: 'The BatteryIncluded API key to use for authentication.',
      default: API_KEY,
      required: false,
    },

    recommendationId: {
      type: 'string',
      description: 'The ID of the document to scan for generating recommendation types.',
      required: false,
    },

    suggestQuery: {
      type: 'string',
      description: 'The query for the suggestions to scan for generating suggestion types.',
      required: false,
    },
  },

  run: async ({ args }) => await codegen(args),
})

runMain(command)
