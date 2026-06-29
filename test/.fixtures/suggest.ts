import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/suggest', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q')?.trim()

    if (!query) {
      return HttpResponse.json({ message: 'Query parameter "q" is required.' }, { status: 400 })
    }

    return HttpResponse.json([
      {
        kind: 'document',
        found: 2,
        llm: false,
        hits: [
          {
            highlighted: {
              _common_i18n: { url: 'https://example.test/p/sample-lounge-sofa/1001' },
              _history: { salesCount: 42 },
              _product: {
                id: 'prod-1001',
                price: 899,
                productNumber: ['1001'],
              },
              _product_i18n: {
                categories: ['Home', 'Home > Sofas'],
                categoryTree: [{ name: 'Home' }, { name: 'Home > Sofas' }],
                description: 'A neutral sofa example used for schema-safe mock responses.',
                manufacturer: 'Acme Furnishings',
                name: 'Sample Lounge Sofa',
                properties: {
                  Farbgruppe: ['Neutral'],
                },
              },
              type: 'ProductDataType',
            },
          },
          {
            highlighted: {
              _common_i18n: { url: 'https://example.test/p/sample-reading-lamp/1002' },
              _history: { salesCount: 18 },
              _product: {
                id: 'prod-1002',
                price: 129,
                productNumber: ['1002'],
              },
              _product_i18n: {
                categories: ['Home', 'Home > Lighting'],
                categoryTree: [{ name: 'Home' }, { name: 'Home > Lighting' }],
                description: 'A neutral lamp example used for schema-safe mock responses.',
                manufacturer: 'Bright Goods',
                name: 'Sample Reading Lamp',
                properties: {
                  Farbgruppe: ['Warm White'],
                },
              },
              type: 'ProductDataType',
            },
          },
        ],
      },
      {
        kind: 'facet._product_i18n.categoryTree.name',
        found: 2,
        field_name: '_product_i18n.categoryTree.name',
        hits: [
          { count: 1, highlighted: 'Home > <mark>Sofas</mark>', value: 'Home > Sofas' },
          { count: 1, highlighted: 'Home > <mark>Lighting</mark>', value: 'Home > Lighting' },
        ],
      },
      {
        kind: 'query-completion',
        hits: [
          {
            value: `${query} chair`,
            highlighted: `<mark>${query}</mark> chair`,
            score: 0.81,
            source: 'query-log',
          },
          {
            value: `${query} lamp`,
            highlighted: `<mark>${query}</mark> lamp`,
            score: 0.79,
            source: 'query-log',
          },
        ],
      },
    ])
  }),
]
