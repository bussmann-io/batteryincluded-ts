// OpenAPI paths and components to be augmented by the generated types
export interface paths {}
export interface components {}

/**
 * Suggest query response type, representing the shape of the response returned by the API when performing a suggest query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/ewmh1cc/suggest
 */
export type Suggest = components['schemas']['GetApiV1CollectionsDocumentsSuggest']

/**
 * Browse query response type, representing the shape of the response returned by the API when performing a browse query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/ywu49zw/browse
 */
export type Browse = components['schemas']['GetApiV1CollectionsDocumentsBrowse']

/**
 * Highlights query response type, representing the shape of the response returned by the API when performing a highlights query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/qdv63bc/highlights
 */
export type Highlights = components['schemas']['GetApiV1CollectionsDocumentsHighlights']

/**
 * Recommendations query response type, representing the shape of the response returned by the API when performing a recommendations query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/21t4zy8/recommendations
 */
export type Recommendations = components['schemas']['GetApiV1CollectionsDocumentsRecommendations']

/**
 * Similar search query response type, representing the shape of the response returned by the API when performing a similar search query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/mjujfc7/similar-search
 */
export type SimilarSearch = components['schemas']['GetApiV1CollectionsDocumentsSimilarSearch']

/**
 * Presets query response type, representing the shape of the response returned by the API when performing a presets query.
 *
 * @see https://www.postman.com/batteryincluded/core/request/dkv351x/presets
 */
export type Presets = components['schemas']['GetApiV1CollectionsDocumentsPresets']

export * from './filters'
