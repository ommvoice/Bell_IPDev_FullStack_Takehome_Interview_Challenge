import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWishlistActions, useWishlistQuery } from '../../hooks/useWishlist';
import { ProductCard } from '../products/ProductCard';

export function Wishlist() {
  const { data: wishlist, isError } = useWishlistQuery();
  const { error: actionError, remove } = useWishlistActions();

  if (isError) {
    return <Alert severity="error">Failed to load your wishlist. Please try again later.</Alert>;
  }

  return (
    <Box>
      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError.message}
        </Alert>
      )}
      {wishlist && wishlist.length === 0 ? (
        <Typography color="text.secondary">Your wishlist is empty.</Typography>
      ) : (
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
          {wishlist?.map((product) => (
            <Box component="li" key={product.id}>
              <ProductCard product={product} isWishlisted onToggleWishlist={remove} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
