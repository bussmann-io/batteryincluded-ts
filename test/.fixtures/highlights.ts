import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/highlights', () => {
    return HttpResponse.json({
      searches: [],
      querySuggestions: ['Beste Sofas 2026', 'Sitzsack-Highlights', 'Platzsparende Kommoden und Sideboards'],
    })
  }),
]
