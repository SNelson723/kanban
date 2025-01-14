import { render, act, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('App', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
    const titlebar = screen.getByTestId('title-text');
    expect(titlebar.textContent).toEqual('Title bar');
  });
});