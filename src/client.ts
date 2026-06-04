import type { paths } from 'batteryincluded'

import createOpenAPIClient from 'openapi-fetch'

export const buildBaseUrl = (collection: string) => `https://api.batteryincluded.io/api/v1/collections/${collection}/documents`

export const buildHeaders = (apiKey: string) => ({ 'X-BI-API-KEY': apiKey })

export function createClient<customPaths extends object = paths>(config: { collection: string, apiKey: string }) {
  return createOpenAPIClient<customPaths>({
    baseUrl: buildBaseUrl(config.collection),
    headers: buildHeaders(config.apiKey),
  })
}
