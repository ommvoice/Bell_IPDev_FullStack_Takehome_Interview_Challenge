import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useStoreName } from '../../hooks/useStoreName';

export function AppHeader() {
  const { data } = useStoreName();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1">
          {data?.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
