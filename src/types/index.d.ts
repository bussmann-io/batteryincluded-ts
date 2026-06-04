export interface paths {}
export interface components {}

export type Suggest = components['schemas']['GetApiV1CollectionsDocumentsSuggest']
export type Browse = components['schemas']['GetApiV1CollectionsDocumentsBrowse']
export type Highlights = components['schemas']['GetApiV1CollectionsDocumentsHighlights']
export type Recommendations = components['schemas']['GetApiV1CollectionsDocumentsRecommendations']

export type SelectFacet = Extract<Browse['facet_counts'][number], { type: 'select' }>
export type RangeFacet = Extract<Browse['facet_counts'][number], { type: 'range' }>

export interface Filter {
  field: string
  values: string[] | {
    min?: string
    max?: string
  }
}
