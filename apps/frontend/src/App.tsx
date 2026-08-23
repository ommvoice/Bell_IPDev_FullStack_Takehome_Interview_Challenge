import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AppHeader } from './components/app/AppHeader';
import { NavTabs, type View } from './components/app/NavTabs';
import { Products } from './components/products/Products';
import { Wishlist } from './components/wishlist/Wishlist';

function App() {
  const [view, setView] = useState<View>('products');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <NavTabs view={view} onChange={setView} />

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {view === 'products' ? <Products /> : <Wishlist />}
      </Container>
    </Box>
  );
}

export default App;
