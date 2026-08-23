import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/api-client';
import { API_ENDPOINTS } from '../constants/api-urls';
import type { Store } from '../types/store';

export function useStoreName() {
  const { data, isError } = useQuery({
    queryKey: ['store-name'],
    queryFn: () => apiRequest<Store>(API_ENDPOINTS.storeName),
  });

  return { data, isError };
}
