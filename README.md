<p align="center">
  <picture>
    <img src="https://batteryincluded.ai/wp-content/uploads/2026/04/full-logo-compact-4c-header.webp" alt="BatteryIncluded" width="290">
  </picture>
</p>

# 🔋 BatteryIncluded TypeScript SDK

[![Github Actions][github-actions-src]][github-actions-href]
[![NPM version][npm-version-src]][npm-version-href]
[![NPM last update][npm-last-update-src]][npm-last-update-href]
[![License][license-src]][license-href]

An unofficial TypeScript SDK for [BatteryIncluded](https://batteryincluded.ai), the AI-infrastructure for E-Commerce search.
Provides type-safe access to the BatteryIncluded API for search, filters, recommendations and more.

## Installation

```bash
npm install batteryincluded
```

## Usage

1. Create a .env file in the root of your project with the following content:

```
BATTERYINCLUDED_COLLECTION=your-collection-name
BATTERYINCLUDED_API_KEY=your-api-key
```

2. Run the CLI to generate types based on your collection schema:

```bash
npx batteryincluded ./path/to/output/dir
```

3. Use the client with full type safety:

```typescript
import { createClient } from 'batteryincluded'

const client = createClient({
  collection: 'my-collection-name',
  apiKey: 'my-api-key',
})

const { data, error } = await client.GET('/browse', {
  params: {
    query: {
      page: 1,
      per_page: 20,
    }
  }
})

// Fully typed response data
console.log(data)
```

> Make sure the output directory is included in your TypeScript project's `tsconfig.json` under the `include` array to ensure the generated types are available for import.

## Available Endpoints

The SDK provides type-safe access to the following BatteryIncluded API endpoints:

- `/browse`: Search endpoint for retrieving documents.
- `/highlights`: Endpoint for retrieving query highlights.
- `/suggest`: Endpoint for getting search suggestions based on a text query.
- `/recommendations`: Endpoint for getting product recommendations based on a document ID.
- `/recommendations/cart`: Endpoint for getting product recommendations based on a cart ID.
- `/similar-search`: Endpoint for finding similar products based on a text query.
- `/presets`: Endpoint for retrieving available search presets.

## Type Generation

The SDK includes a CLI tool that generates TypeScript types based on the responses from your BatteryIncluded collection.
This is a workaround to provide type safety for the API responses, as BatteryIncluded does not currently provide an OpenAPI schema.

In order to generate the types for these endpoints, the CLI will attempt to discover the schema by making requests to the API. For the `/recommendations` endpoint, it requires a document ID to generate recommendations. If no document ID is provided via the `--recommendation-id` flag, the CLI will automatically fetch the first document from the `/browse` endpoint to use its ID for generating recommendation types.

The query used for the `/suggest` and `/similar-search` endpoints can be customized using the `--suggest-query` flag, which defaults to 'a' to ensure it returns results for discovery.

### Custom Probe Config

The CLI also supports loading custom probe configurations from a `batteryincluded.config.{js,json,mjs}` file in your project. This allows you to specify additional endpoints or customize the discovery process. If no custom config is provided, the CLI will use a default configuration that includes the necessary endpoints for generating types for search, suggestions, and recommendations.

```ts
// batteryincluded.config.mjs
import { defineCodegenConfig } from 'batteryincluded'

export default defineCodegenConfig({
  '/browse': {
    query: {
      page: 1,
      // Load more documents for better schema discovery
      per_page: 100,
    },
  },
})
```

For more information on the code generator and how to customize the probe configuration, see the [AutoDisco](https://github.com/freb97/autodisco) documentation.

## License

Published under the [MIT License](https://github.com/freb97/autodisco/tree/main/LICENSE).

[github-actions-src]: https://github.com/freb97/batteryincluded-ts/actions/workflows/test.yml/badge.svg
[github-actions-href]: https://github.com/freb97/batteryincluded-ts/actions

[npm-version-src]: https://img.shields.io/npm/v/batteryincluded-ts/latest.svg?style=flat&colorA=18181B&colorB=31C553
[npm-version-href]: https://npmjs.com/package/batteryincluded-ts

[npm-last-update-src]: https://img.shields.io/npm/last-update/batteryincluded-ts.svg?style=flat&colorA=18181B&colorB=31C553
[npm-last-update-href]: https://npmjs.com/package/batteryincluded-ts

[license-src]: https://img.shields.io/github/license/freb97/batteryincluded-ts.svg?style=flat&colorA=18181B&colorB=31C553
[license-href]: https://github.com/freb97/batteryincluded-ts/tree/main/LICENSE
