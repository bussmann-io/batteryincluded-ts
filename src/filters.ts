import type { Filter } from './types'

function fieldToLabel(field: string, labelMap: Record<string, string>): string {
  return labelMap[field] ?? field
}

function labelToField(label: string, labelMap: Record<string, string>): string {
  const entry = Object.entries(labelMap).find(([, value]) => value === label)
  return entry ? entry[0] : label
}

export function queryToFilters(query: URLSearchParams, labelMap: Record<string, string> = {}): Filter[] {
  const filters: Filter[] = []

  try {
    const filtersJson = query.get('filters') as string | undefined

    if (filtersJson) {
      const filtersObj = JSON.parse(filtersJson) as Record<string, string[] | { min?: string, max?: string }>

      Object.entries(filtersObj).forEach(([field, values]) => {
        filters.push({ field: fieldToLabel(field, labelMap), values })
      })
    }
  }
  catch (error) {
    console.error('Failed to parse filters from query:', error)
  }

  return filters
}

export function filtersToQuery(filters: Filter[], labelMap: Record<string, string> = {}): URLSearchParams {
  const query = new URLSearchParams()

  const filtersObj: Record<string, string[] | { min?: string, max?: string }> = {}

  filters.forEach(({ field, values }) => {
    filtersObj[labelToField(field, labelMap)] = values
  })

  if (Object.keys(filtersObj).length > 0) {
    query.set('filters', JSON.stringify(filtersObj))
  }

  return query
}
