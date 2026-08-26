import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  wishlistedIds: Set<number>;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

export function ProductList({ products, wishlistedIds, onAdd, onRemove }: ProductListProps) {
  if (products.length === 0) {
    return <Typography color="text.secondary">No products found.</Typography>;
  }

  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 2,
        p: 0,
        m: 0,
      }}
    >
      {products.map((product) => {
        const isWishlisted = wishlistedIds.has(product.id);
        return (
          <Box component="li" key={product.id}>
            <ProductCard
              product={product}
              isWishlisted={isWishlisted}
              onToggleWishlist={() => (isWishlisted ? onRemove(product.id) : onAdd(product.id))}
            />
          </Box>
        );
      })}
    </Box>
  );
}
