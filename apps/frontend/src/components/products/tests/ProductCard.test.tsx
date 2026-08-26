import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../../types/product';

const product: Product = {
  id: 1,
  name: 'Wireless Headphones',
  type: 'Electronics',
  price: 79.99,
  image: 'https://example.com/image.jpg',
};

describe('ProductCard', () => {
  it('shows "Add to Wishlist" and calls onToggleWishlist with the product id when not wishlisted', async () => {
    const user = userEvent.setup();
    const onToggleWishlist = vi.fn();

    render(<ProductCard product={product} isWishlisted={false} onToggleWishlist={onToggleWishlist} />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
    expect(screen.getByAltText('Wireless Headphones')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Add to Wishlist/ });
    await user.click(button);

    expect(onToggleWishlist).toHaveBeenCalledWith(1);
  });

  it('shows "Remove from Wishlist" when the product is already wishlisted', () => {
    render(<ProductCard product={product} isWishlisted onToggleWishlist={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Remove from Wishlist/ })).toBeInTheDocument();
  });
});
