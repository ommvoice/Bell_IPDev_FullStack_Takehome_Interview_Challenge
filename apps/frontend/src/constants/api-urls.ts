export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  storeName: '/stores/name',
  products: (search?: string) =>
    search ? `/products?search=${encodeURIComponent(search)}` : '/products',
  wishlist: '/wishlist',
  wishlistItem: (id: number) => `/wishlist/${id}`,
} as const;
