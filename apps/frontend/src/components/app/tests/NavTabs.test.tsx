import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavTabs } from '../NavTabs';

describe('NavTabs', () => {
  it('calls onChange with "wishlist" when the Wishlist tab is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<NavTabs view="products" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: 'Wishlist' }));

    expect(onChange).toHaveBeenCalledWith('wishlist');
  });

  it('marks the current view\'s tab as selected', () => {
    render(<NavTabs view="wishlist" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'Wishlist' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Products' })).toHaveAttribute('aria-selected', 'false');
  });
});
