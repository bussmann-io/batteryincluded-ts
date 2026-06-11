# BatteryIncluded

## Filter Types

RequestFilter (example, range, min and max):
```ts
const filter = {
  'f[_product.price][from]': 10,
  'f[_product.price][till]': 100,
}
```

RequestFilter (example, range, min only):
```ts
const filter = {
  'f[_product.price][till]': 100,
}
```

RequestFilter (example, select):
```ts
const filter = {
  'f[_product_i18n.manufacturer][]': ['Apple', 'Samsung']
}
```

RequestFilter (example, select and range):
```ts
const filter = {
  'f[_product.price][from]': 10,
  'f[_product.price][till]': 100,
  'f[_product_i18n.manufacturer][]': ['Apple', 'Samsung'],
  // ...
}
```

RequestFilter (type):
```ts
interface RequestFilter {
  [key: string]: number | string[]
}
```

Filter (example, range):
```ts
const filter = {
  field: '_product.price',
  type: 'range',
  value: {
    min: 10,
    max: 100
  }
}
```

Filter (example, select):
```ts
const filter = {
  field: '_product_i18n.manufacturer',
  type: 'select',
  values: ['Apple', 'Samsung']
}
```

Filter (type):
```ts
type Filter = {
  field: string
  type: 'range'
  value: {
    min?: number
    max?: number
  }
} | {
  field: string
  type: 'select'
  values: string[]
}
```

SerializedFilterQuery (example):
```ts
'{"price":{"min":10,"max":100},"manufacturer":["Apple","Samsung"]}'
```

SerializedFilterQuery (type):
```ts
type SerializedFilterQuery = string
```

FilterQuery (example):
```ts
const filterQuery = {
  price: {
    min: 10,
    max: 100
  },
  manufacturer: ['Apple', 'Samsung']
}
```

FilterQuery (type):
```ts
type FilterQuery = Record<string, string[] | { min?: number, max?: number }>
```

## Filter Flow

query --
       |-> filters -> display filters to user
facets -

From the facets, the filters are displayed to the user, when a user selects a filter, the selection is transformed into the query format and added to the URL.
User selects filters -> query

From the query, the filters are extracted and transformed into the format expected by the request.
query -> filters -> request

## Convenience

We probably need to find an intermediary format for the filters that is more convenient to work with in the code, and then have functions to transform between the formats.

```ts
interface FilterConversionOptions {
  labelMap?: Record<string, string>
}

function toRequestFilter(filters: Filter[], options?: FilterConversionOptions): RequestFilter
function toRequestFilter(filterQuery: FilterQuery, options?: FilterConversionOptions): RequestFilter
function toRequestFilter(serializedFilterQuery: string, options?: FilterConversionOptions): FilterQuery

function toFilterQuery(requestFilter: RequestFilter, options?: FilterConversionOptions): FilterQuery
function toFilterQuery(serializedFilterQuery: string, options?: FilterConversionOptions): FilterQuery
function toFilterQuery(filters: Filter[], options?: FilterConversionOptions): FilterQuery

function toSerializedFilterQuery(requestFilter: RequestFilter, options?: FilterConversionOptions): string
function toSerializedFilterQuery(filterQuery: FilterQuery, options?: FilterConversionOptions): string
function toSerializedFilterQuery(filters: Filter[], options?: FilterConversionOptions): string

function toFilters(requestFilter: RequestFilter, options?: FilterConversionOptions): Filter[]
function toFilters(filterQuery: FilterQuery, options?: FilterConversionOptions): Filter[]
function toFilters(serializedFilterQuery: string, options?: FilterConversionOptions): Filter[]
```
