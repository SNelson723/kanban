import { render, act, screen } from '@testing-library/react';
import TitleBar from '../components/Titlebar';
import { describe, it, expect } from 'vitest';

describe('Titlebar', () => {
  it('should render', async () => {
    await act(async () => {
      render(<TitleBar />)
    });

    const titleText = screen.getByTestId('title-text');
    expect(titleText.textContent).toEqual('Title bar');
  });
});