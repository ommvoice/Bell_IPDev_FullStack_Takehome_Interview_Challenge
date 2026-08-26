import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductList } from '../ProductList';
import type { Product } from '../../../types/product';

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', type: 'Electronics', price: 79.99, image: 'a.jpg' },
  { id: 2, name: 'Clean Code', type: 'Books', price: 34.99, image: 'b.jpg' },
];

describe('ProductList', () => {
  it('renders one card per product', () => {
    render(
      <ProductList
        products={products}
        wishlistedIds={new Set([2])}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Wishlist: Wireless Headphones/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove from Wishlist: Clean Code/ })).toBeInTheDocument();
  });

  it('shows an empty state message when there are no products', () => {
    render(<ProductList products={[]} wishlistedIds={new Set()} onAdd={vi.fn()} onRemove={vi.fn()} />);

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});
