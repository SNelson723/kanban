
import { http, HttpResponse } from 'msw';

export const getAllBoards = http.get('https://localhost:44323/api/boards/list', () => {
  return HttpResponse.json({
    error: 0,
    success: true,
    boards: [
      {
        created: '1/1/2025',
        id: '1',
        name: 'board test 1'
      }
    ]
  });
});