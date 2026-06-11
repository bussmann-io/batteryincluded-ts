import type { paths } from 'batteryincluded'

import createOpenAPIClient from 'openapi-fetch'

/**
 * Configuration interface for the BatteryIncluded client.
 */
export interface BatteryIncludedClientConfig {
  collection: string
  apiKey: string
}

/**
 * Builds the base URL for the API endpoint based on the provided collection name.
 *
 * @param collection Name of the collection.
 *
 * @returns The base URL for the API endpoint.
 */
export const buildBaseUrl = (collection: string) => `https://api.batteryincluded.io/api/v1/collections/${collection}/documents`

/**
 * Builds the headers for the API request.
 *
 * @param apiKey API key for authentication.
 *
 * @returns An object containing the headers for the API request.
 */
export const buildHeaders = (apiKey: string) => ({ 'X-BI-API-KEY': apiKey })

/**
 * Creates an OpenAPI client for interacting with the BatteryIncluded API.
 *
 * @param config Configuration object containing the collection name and API key.
 *
 * @returns A typed OpenAPI client instance for making API requests.
 */
export function createClient<customPaths extends object = paths>(config: BatteryIncludedClientConfig) {
  return createOpenAPIClient<customPaths>({
    baseUrl: buildBaseUrl(config.collection),
    headers: buildHeaders(config.apiKey),
  })
}
