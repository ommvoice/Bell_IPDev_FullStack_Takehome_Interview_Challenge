import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export type View = 'products' | 'wishlist';

interface NavTabsProps {
  view: View;
  onChange: (view: View) => void;
}

export function NavTabs({ view, onChange }: NavTabsProps) {
  return (
    <Tabs
      value={view}
      onChange={(_, newView: View) => onChange(newView)}
      aria-label="Product navigation"
    >
      <Tab value="products" label="Products" id="nav-tab-products" />
      <Tab value="wishlist" label="Wishlist" id="nav-tab-wishlist" />
    </Tabs>
  );
}
