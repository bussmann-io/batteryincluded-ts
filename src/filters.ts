import type { Filter } from './types'

/**
 * Transforms a given filter object into URLSearchParams format.
 *
 * @param filter BatteryIncluded filter object.
 *
 * @returns URLSearchParams object containing the filter parameters.
 */
export function filterToSearchParams(filter: Filter): URLSearchParams {
  const searchParams = new URLSearchParams()

  for (const key in filter) {
    const value = filter[key]
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v))
    }
    else if (value) {
      searchParams.append(key, value.toString())
    }
  }

  return searchParams
}

/**
 * Transforms given URLSearchParams into a filter object.
 *
 * @param searchParams URLSearchParams object containing the filter parameters.
 *
 * @returns BatteryIncluded filter object.
 */
export function searchParamsToFilter(searchParams: URLSearchParams): Filter {
  const filter: Filter = {}

  for (const [key, value] of searchParams.entries()) {
    if (key.endsWith('[]')) {
      if (!filter[key]) {
        filter[key] = []
      }

      (filter[key] as string[]).push(value)
    }
    else {
      filter[key] = Number(value)
    }
  }

  return filter
}
