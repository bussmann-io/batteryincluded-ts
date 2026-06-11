import type { Browse } from '.'

/**
 * Facet type representing the shape of a facet in the Browse response. It can be either a select facet or a range facet, depending on the type of the facet in the Browse response.
 *
 * @see SelectFacet
 * @see RangeFacet
 */
export type Facet = Browse['facet_counts'][number]

/**
 * Select filter facet from the Browse response with type 'select'.
 * It represents a facet that allows users to select from a list of options (e.g., manufacturer, categories).
 *
 * @example
 * const selectFacet: SelectFacet = {
 *   type: 'select',
 *   field_name: '_product_i18n.manufacturer',
 *   field_label: 'Brand',
 *   field_unit: '',
 *   counts: [
 *     {
 *       count: 123,
 *       value: 'Apple'
 *     },
 *     {
 *       count: 34,
 *       value: 'Samsung'
 *     }
 *   ],
 *   stats: {
 *     total_values: 373
 *   }
 * }
 */
export type SelectFacet = Extract<Facet, { type: 'select' }>

/**
 * Range filter facet from the Browse response with type 'range'.
 * It represents a facet that allows users to filter by a range of values (e.g., price).
 *
 * @example
 * const rangeFacet: RangeFacet = {
 *   type: 'range',
 *   field_name: '_product.price',
 *   field_label: 'Price',
 *   field_unit: '',
 *   stats: {
 *     max: 10,
 *     min: 110,
 *   }
 * }
 */
export type RangeFacet = Extract<Facet, { type: 'range' }>

/**
 * Filter type that represents the shape of filters used in API requests.
 * It is an object where the keys are strings (representing the filter fields) and the values can be either numbers (for range filters) or arrays of strings (for select filters).
 *
 * @example
 * const filter: Filter = {
 *  'f[_product.price][from]': 10,
 *  'f[_product.price][till]': 100,
 *  'f[_product_i18n.manufacturer][]': ['Apple', 'Samsung'],
 * }
 */
export interface Filter {
  [key: string]: number | string[]
}
