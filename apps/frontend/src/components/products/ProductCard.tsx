import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const actionLabel = isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ height: 160, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Chip label={product.type} size="small" sx={{ mb: 1 }} />
        <Typography variant="body1" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={isWishlisted ? 'outlined' : 'contained'}
          aria-label={`${actionLabel}: ${product.name}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
