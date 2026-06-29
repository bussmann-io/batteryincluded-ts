import { http, HttpResponse } from 'msw'

interface BrowseDocument {
  _ai: { score: number }
  _common: { imageUrl: string, releaseDate: string }
  _product: {
    id: string
    price: number
    productNumber: string[]
    shippingFree: boolean
    stock: number
    streamIds: string[]
  }
  _product_i18n: {
    categoryTree: { name: string }[]
    description: string
    manufacturer: string
    name: string
    properties: {
      Farbton: string[]
      Stoff: string[]
    }
  }
  id: string
}

function createDocument(input: {
  id: string
  name: string
  manufacturer: string
  price: number
  productNumber: string
  category: string
  seoPath: string
  score: number
}): BrowseDocument {
  return {
    _ai: { score: input.score },
    _common: {
      imageUrl: `https://cdn.example.test/images/${input.id}.jpg`,
      releaseDate: '2026-01-15T12:00:00.000+00:00',
    },
    _product: {
      id: input.id,
      price: input.price,
      productNumber: [input.productNumber],
      shippingFree: false,
      stock: 24,
      streamIds: ['stream-a', 'stream-b'],
    },
    _product_i18n: {
      categoryTree: [{ name: 'Home' }, { name: `Home > ${input.category}` }],
      description: `${input.name} with practical everyday features and neutral styling.`,
      manufacturer: input.manufacturer,
      name: input.name,
      properties: {
        Farbton: ['Neutral'],
        Stoff: ['Leder', 'Polyester'],
      },
    },
    id: input.id,
  }
}

const documents = [
  createDocument({
    id: 'prod-1001',
    name: 'Sample Lounge Sofa',
    manufacturer: 'Acme Furnishings',
    price: 899,
    productNumber: '1001',
    category: 'Sofas',
    seoPath: 'p/sample-lounge-sofa/1001',
    score: 0.98,
  }),
  createDocument({
    id: 'prod-1002',
    name: 'Sample Reading Lamp',
    manufacturer: 'Bright Goods',
    price: 129,
    productNumber: '1002',
    category: 'Lighting',
    seoPath: 'p/sample-reading-lamp/1002',
    score: 0.91,
  }),
]

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/browse', ({ request }) => {
    const searchParams = new URL(request.url).searchParams
    const page = Number(searchParams.get('page') ?? 1)
    const perPage = Number(searchParams.get('per_page') ?? 10)
    const q = searchParams.get('q') ?? '*'

    return HttpResponse.json({
      facet_counts: [
        {
          counts: [
            { count: 2, value: 'ProductDataType' },
          ],
          field_name: 'type',
          stats: { total_values: 1 },
          type: 'ignore',
          field_label: '',
          field_unit: '',
        },
        {
          counts: [
            { count: 1, value: 'Acme Furnishings' },
            { count: 1, value: 'Bright Goods' },
          ],
          field_name: '_product_i18n.manufacturer',
          stats: { total_values: 2 },
          type: 'select',
          field_label: 'Manufacturer',
          field_unit: '',
        },
      ],
      found: documents.length,
      found_docs: documents.length,
      out_of: documents.length,
      page,
      request_params: {
        collection_name: 'generic-demo',
        first_q: q,
        per_page: perPage,
        q,
      },
      search_time_ms: 8,
      hits: documents.map(document => ({
        found: 1,
        document,
        highlight: {},
        grouped: [{ document, highlight: {} }],
        vector: false,
      })),
      extensions: [],
    })
  }),
]
