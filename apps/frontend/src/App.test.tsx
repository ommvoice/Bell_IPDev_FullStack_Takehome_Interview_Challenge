import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithProviders } from './test/test-utils';

function mockFetchResponses() {
  globalThis.fetch = vi.fn((url: string) => {
    if (url.includes('/stores/name')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ name: 'The Tech Library' }),
      });
    }
    if (url.includes('/products')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      });
    }
    if (url.includes('/wishlist')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      });
    }
    return Promise.reject(new Error(`Unhandled fetch: ${url}`));
  }) as unknown as typeof fetch;
}

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockFetchResponses();
  });

  it('fetches and displays the store name in the app bar', async () => {
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getByText('The Tech Library')).toBeInTheDocument();
    });
  });

  it('switches between the Products and Wishlist views', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    expect(await screen.findByLabelText('Search products by name')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Wishlist' }));

    await waitFor(() => {
      expect(screen.queryByLabelText('Search products by name')).not.toBeInTheDocument();
    });
  });
});
