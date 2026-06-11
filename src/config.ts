import type { ProbeConfig } from 'autodisco'

/**
 * Defines the code generation configuration for the project.
 *
 * @param config A record mapping string keys to either a single ProbeConfig or an array of ProbeConfig objects.
 *
 * @returns The BatteryIncluded code generation configuration object.
 *
 * @example
 * ```ts
 * import { defineCodegenConfig } from 'batteryincluded'
 *
 * export default defineCodegenConfig({
 *   '/browse': {
 *     query: {
 *       page: 1,
 *       per_page: 20
 *     }
 *   },
 *   '/suggest': {
 *     query: {
 *       q: 'custom search term'
 *     }
 *   }
 * })
 * ```
 */
export function defineCodegenConfig(config: Record<string, ProbeConfig | ProbeConfig[]>): Record<string, ProbeConfig | ProbeConfig[]> {
  return config
}
