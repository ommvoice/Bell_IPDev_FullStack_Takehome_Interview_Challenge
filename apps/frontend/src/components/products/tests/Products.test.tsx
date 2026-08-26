import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from '../Products';
import { renderWithProviders } from '../../../test/test-utils';
import type { Product } from '../../../types/product';

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', type: 'Electronics', price: 79.99, image: 'a.jpg' },
  { id: 2, name: 'Clean Code', type: 'Books', price: 34.99, image: 'b.jpg' },
];

function mockFetch({ productsOk = true, wishlistOk = true } = {}) {
  globalThis.fetch = vi.fn((url: string) => {
    if (url.includes('/products')) {
      const search = new URL(url).searchParams.get('search');
      const filtered = search
        ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        : products;
      return Promise.resolve({
        ok: productsOk,
        status: productsOk ? 200 : 500,
        json: () => Promise.resolve(productsOk ? filtered : { message: 'Server error' }),
      });
    }
    if (url.includes('/wishlist')) {
      return Promise.resolve({
        ok: wishlistOk,
        status: wishlistOk ? 200 : 500,
        json: () => Promise.resolve(wishlistOk ? [] : { message: 'Server error' }),
      });
    }
    return Promise.reject(new Error(`Unhandled fetch: ${url}`));
  }) as unknown as typeof fetch;
}

describe('Products', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the fetched product list', async () => {
    mockFetch();
    renderWithProviders(<Products />);

    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    });
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('filters the visible products by type', async () => {
    const user = userEvent.setup();
    mockFetch();
    renderWithProviders(<Products />);

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText('Filter products by type'), 'Books');

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.queryByText('Wireless Headphones')).not.toBeInTheDocument();
  });

  it('shows an error alert and nothing else when the products request fails', async () => {
    mockFetch({ productsOk: false });
    renderWithProviders(<Products />);

    expect(await screen.findByText('Failed to load products. Please try again later.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Search products by name')).not.toBeInTheDocument();
  });
});
