import { describe, it, expect } from 'vitest';
import SideBar from '../components/SideBar';
import { render, act, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('SideBar', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <SideBar />
        </Provider>
      )
    });

    const errorCode = screen.getByTestId('error-code');
    expect(errorCode.textContent).toEqual('error: 0');
  });
});