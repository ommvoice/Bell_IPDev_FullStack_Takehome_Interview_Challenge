import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-urls';
import type { Product } from '../types/product';

const WISHLIST_QUERY_KEY = ['wishlist'];

export function useWishlistQuery() {
  const { data, isError } = useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: () => apiRequest<Product[]>(API_ENDPOINTS.wishlist),
  });

  return { data, isError };
}

export function useWishlistActions() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest<Product>(API_ENDPOINTS.wishlistItem(id), { method: 'POST' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest<void>(API_ENDPOINTS.wishlistItem(id), { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY }),
  });

  return {
    error: addMutation.error ?? removeMutation.error,
    add: (id: number) => addMutation.mutate(id),
    remove: (id: number) => removeMutation.mutate(id),
  };
}
