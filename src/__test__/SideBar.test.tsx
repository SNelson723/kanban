import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import SideBar from '../components/SideBar';
import { render, act, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
/* @ts-expect-error missing type */
import { server } from '../mocks/node';
import { http, HttpResponse, matchRequestUrl } from 'msw';
import { getByQueryId } from '../mocks/query';
import userEvent from '@testing-library/user-event';

interface Request {
  method: string;
  url: string;
}

const getRequestSpy = () => {
  const requestSpy = vi.fn();
  server.events.on('request:start', async ({ request }) => {
    if (request.method === 'POST' && matchRequestUrl(new URL(request.url), 'https://localhost:44323/api/boards/create')) {
      requestSpy();
    }
  });

  return requestSpy;
};

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
  server.events.removeAllListeners();
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
    // screen.debug();
  });

  it('should handle a network warning', async () => {

    server.use(
      http.get('https://localhost:44323/api/boards/list', () => {
        return HttpResponse.json({
          error: 1,
          success: true,
          msg: 'Network Warning'
        });
      }, { once: true })
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
      }, { once: true })
    )

    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

  });

  it('should handle adding a new board', async () => {
    const serverSpy = getRequestSpy();

    server.use(
      http.post('https://localhost:44323/api/boards/create', () => {
        return HttpResponse.json({
          error: 0,
          success: true
        });

      }, { once: true })
    )

    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    // testing the input
    const input = getByQueryId('new-board-name') as HTMLInputElement;
    await userEvent.type(input, 'test board');
    expect(input.value).toEqual('test board');

    // testing the creating of the board
    const button = getByQueryId('new-board-button');
    await act(async () => {
      await userEvent.click(button);
    });

    expect(serverSpy).toHaveBeenCalledTimes(1);
    await userEvent.clear(input);
  });

  it('should handle an empty board name', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    const button = getByQueryId('new-board-button');
    await userEvent.click(button);
  });

  it('should handle a network warning when creating a board', async () => {
    server.use(
      http.post('https://localhost:44323/api/boards/create', () => {
        return HttpResponse.json({
          error: 1,
          success: true,
          msg: 'Network Warning'
        });
      }, { once: true })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    const input = getByQueryId('new-board-name') as HTMLInputElement;
    await userEvent.type(input, 'test board');

    const button = getByQueryId('new-board-button');
    await userEvent.click(button);
  });

  it('should handle a network error when creating a board', async () => {
    server.use(
      http.post('https://localhost:44323/api/boards/create', () => {
        throw new Error("Network Error")
      }, { once: true })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    const input = getByQueryId('new-board-name') as HTMLInputElement;
    await userEvent.type(input, 'test board');

    const button = getByQueryId('new-board-button');
    await userEvent.click(button);
  });
});