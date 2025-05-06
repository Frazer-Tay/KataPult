// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // Note: This default test might fail or need updating
  // depending on the exact content of your App component header.
  // It's looking for text related to the default CRA app header.
  // You can update this test or remove it if you aren't focused on testing yet.
  render(<App />);
  // Example: Check if the header text exists
  // const headerElement = screen.getByText(/KataPult Bahasa Prep/i);
  // expect(headerElement).toBeInTheDocument();
});