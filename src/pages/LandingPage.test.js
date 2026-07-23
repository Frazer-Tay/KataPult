import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ currentUser: null, userData: null })
}));

jest.mock('../hooks/useLearningProgress', () => ({
  __esModule: true,
  default: () => ({ continueEntry: null, entries: [] })
}));

describe('LandingPage', () => {
  it('shows the value proposition and lets visitors try the product', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /master bahasa indonesia/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start learning/i })).toHaveAttribute('href', '/login');

    fireEvent.click(screen.getByRole('button', { name: 'tekun' }));
    expect(screen.getByText(/tekun is correct/i)).toBeInTheDocument();
  });
});
