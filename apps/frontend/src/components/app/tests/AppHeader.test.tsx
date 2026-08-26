import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { AppHeader } from '../AppHeader';
import { renderWithProviders } from '../../../test/test-utils';

describe('AppHeader', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays the store name', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ name: 'The Tech Library' }),
    }) as unknown as typeof fetch;

    renderWithProviders(<AppHeader />);

    await waitFor(() => {
      expect(screen.getByText('The Tech Library')).toBeInTheDocument();
    });
  });
});
