import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wishlist } from '../Wishlist';
import { renderWithProviders } from '../../../test/test-utils';
import type { Product } from '../../../types/product';

const wishlistItems: Product[] = [
  { id: 2, name: 'Clean Code', type: 'Books', price: 34.99, image: 'b.jpg' },
];

function mockFetch({ wishlistOk = true, deleteOk = true } = {}) {
  globalThis.fetch = vi.fn((url: string, init?: RequestInit) => {
    if (url.includes('/wishlist') && init?.method === 'DELETE') {
      return Promise.resolve({
        ok: deleteOk,
        status: deleteOk ? 204 : 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });
    }
    if (url.includes('/wishlist')) {
      return Promise.resolve({
        ok: wishlistOk,
        status: wishlistOk ? 200 : 500,
        json: () => Promise.resolve(wishlistOk ? wishlistItems : { message: 'Server error' }),
      });
    }
    return Promise.reject(new Error(`Unhandled fetch: ${url}`));
  }) as unknown as typeof fetch;
}

describe('Wishlist', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders wishlisted products with a "Remove from Wishlist" action', async () => {
    mockFetch();
    renderWithProviders(<Wishlist />);

    await waitFor(() => {
      expect(screen.getByText('Clean Code')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Remove from Wishlist/ })).toBeInTheDocument();
  });

  it('removes an item when "Remove from Wishlist" is clicked', async () => {
    const user = userEvent.setup();
    mockFetch();
    renderWithProviders(<Wishlist />);

    const removeButton = await screen.findByRole('button', { name: /Remove from Wishlist/ });
    await user.click(removeButton);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/wishlist/2'),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  it('shows an empty state message when the wishlist has no items', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    }) as unknown as typeof fetch;

    renderWithProviders(<Wishlist />);

    expect(await screen.findByText('Your wishlist is empty.')).toBeInTheDocument();
  });

  it('shows an error alert when the wishlist request fails', async () => {
    mockFetch({ wishlistOk: false });
    renderWithProviders(<Wishlist />);

    expect(
      await screen.findByText('Failed to load your wishlist. Please try again later.'),
    ).toBeInTheDocument();
  });
});
