import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-urls';
import type { Product } from '../types/product';

export function useProducts(search?: string) {
  const { data, isError } = useQuery({
    queryKey: ['products', search],
    queryFn: () => apiRequest<Product[]>(API_ENDPOINTS.products(search)),
  });

  return { data, isError };
}
