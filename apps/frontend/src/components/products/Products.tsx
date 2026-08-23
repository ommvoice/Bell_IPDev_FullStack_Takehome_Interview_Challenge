import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useProducts } from '../../hooks/useProducts';
import { useWishlistActions, useWishlistQuery } from '../../hooks/useWishlist';
import { useDebounced } from '../../hooks/useDebounced';
import { ProductFilters, ALL_TYPES } from './ProductFilters';
import { ProductList } from './ProductList';

export function Products() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState(ALL_TYPES);
  const debouncedSearch = useDebounced(search);

  const { data: products, isError: isProductsError } = useProducts(debouncedSearch);
  const { data: wishlist, isError: isWishlistError } = useWishlistQuery();
  const { error: actionError, add, remove } = useWishlistActions();

  const types = useMemo(
    () => Array.from(new Set(products?.map((product) => product.type) ?? [])),
    [products],
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (type === ALL_TYPES) return products;
    return products.filter((product) => product.type === type);
  }, [products, type]);

  const wishlistedIds = useMemo(
    () => new Set(wishlist?.map((product) => product.id) ?? []),
    [wishlist],
  );

  if (isProductsError || isWishlistError) {
    return <Alert severity="error">Failed to load products. Please try again later.</Alert>;
  }

  return (
    <Box>
      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError.message}
        </Alert>
      )}
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        types={types}
      />
      <ProductList
        products={filteredProducts}
        wishlistedIds={wishlistedIds}
        onAdd={add}
        onRemove={remove}
      />
    </Box>
  );
}
