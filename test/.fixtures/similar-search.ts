import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/similar-search', ({ request }) => {
    const query = new URL(request.url).searchParams.get('q')?.trim()

    if (!query) {
      return HttpResponse.json({ message: 'Query parameter "q" is required.' }, { status: 400 })
    }

    return HttpResponse.json([
      {
        q: query,
        count: 123,
        hits: 456,
        highlighted: 'Highlighted text',
      },
    ])
  }),
]
