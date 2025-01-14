import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import SideBar from '../components/SideBar';
import { render, act, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
/* @ts-expect-error missing type */
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';



// hooking the server into the tests
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('SideBar', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    const testBoard = screen.getByTestId('board-1');
    expect(testBoard.textContent).toEqual('board test 1');
    screen.debug();
  });

  it('should handle a network warning', async () => {

    server.use(
      http.get('https://localhost:44323/api/boards/list', () => {
        return HttpResponse.json({
          error: 1,
          success: true,
          msg: 'Network Warning'
        });
      })
    );
    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

  });

  // handle network error
  it('should handle a network error', async () => {
    server.use(
      http.get('https://localhost:44323/api/boards/list', () => {
        throw new Error('network error');
      })
    )
    
    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

  });
});