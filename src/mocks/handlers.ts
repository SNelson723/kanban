import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://localhost:44323/api/boards/list', () => {
    return HttpResponse.json({
      error: 0,
      success: true
    })
  })
];