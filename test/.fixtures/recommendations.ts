import { http, HttpResponse } from 'msw'

const recommendations = [
  {
    id: 'rec-1',
    type: 'product',
    score: 0.95,
    document: {
      _ai: { score: 0.95 },
      _common: {
        imageUrl: 'https://cdn.example.test/images/prod-2001.jpg',
        releaseDate: '2026-02-12T08:00:00.000+00:00',
      },
      _product: {
        id: 'prod-2001',
        price: 249,
        productNumber: ['2001'],
        shippingFree: false,
        stock: 32,
        streamIds: ['stream-a', 'stream-reco'],
      },
      _product_i18n: {
        categoryTree: [{ name: 'Home' }, { name: 'Home > Office' }, { name: 'Home > Office > Chairs' }],
        description: 'Compact schema-faithful recommendation example for office seating.',
        manufacturer: 'Acme Furnishings',
        name: 'Ergonomic Office Chair',
        properties: {
          Farbton: ['Graphite'],
          Stoff: ['Leder', 'Polyester'],
        },
      },
      id: 'prod-2001',
    },
  },
  {
    id: 'rec-2',
    type: 'product',
    score: 0.89,
    document: {
      _ai: { score: 0.89 },
      _common: {
        imageUrl: 'https://cdn.example.test/images/prod-2002.jpg',
        releaseDate: '2026-03-01T08:00:00.000+00:00',
      },
      _product: {
        id: 'prod-2002',
        price: 119,
        productNumber: ['2002'],
        shippingFree: true,
        stock: 54,
        streamIds: ['stream-b', 'stream-reco'],
      },
      _product_i18n: {
        categoryTree: [{ name: 'Home' }, { name: 'Home > Office' }, { name: 'Home > Office > Lighting' }],
        description: 'Compact schema-faithful recommendation example for task lighting.',
        manufacturer: 'Bright Goods',
        name: 'Standing Desk Lamp',
        properties: {
          Farbton: ['Matte Black'],
        },
      },
      id: 'prod-2002',
    },
  },
]

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/recommendations', ({ request }) => {
    const id = new URL(request.url).searchParams.get('id')?.trim()

    if (!id) {
      return HttpResponse.json({ message: 'Query parameter "id" is required.' }, { status: 400 })
    }

    return HttpResponse.json(recommendations)
  }),
]
