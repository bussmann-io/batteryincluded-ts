import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.batteryincluded.io/api/v1/collections/customer.example.com/documents/presets', () => {
    return HttpResponse.json([
      {
        id: '123456',
        name: 'Preset Name',
      },
      {
        id: '123457',
        name: 'Preset 2 Name',
      },
    ])
  }),
]
