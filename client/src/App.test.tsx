import React from 'react';
import { render, screen } from '@testing-library/react';

import BoardHeader from './components/pages/boardPage/BoardHeader';

test('Render Board header title', () => {
  render(<BoardHeader />);
  const titleElement = screen.getByText(/my task board/i);
  expect(titleElement).toBeInTheDocument();

  const buttonsEl = screen.getAllByRole(/button/i);
  buttonsEl.forEach((el) => {
    let button: HTMLElement | undefined = undefined;
    const item = el as HTMLButtonElement;
    if (item.type === 'button') {
      button = item;
    }
    expect(button).toBeInTheDocument();
  });
});
