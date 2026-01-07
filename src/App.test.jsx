import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App test suite', () => {
  it('contains a `main` html element', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
