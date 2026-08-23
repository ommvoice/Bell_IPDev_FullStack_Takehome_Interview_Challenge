import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

export const ALL_TYPES = 'All';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  type: string;
  onTypeChange: (type: string) => void;
  types: string[];
}

export function ProductFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  types,
}: ProductFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label="Search products"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        size="small"
        sx={{ flex: '1 1 240px' }}
        slotProps={{ htmlInput: { 'aria-label': 'Search products by name' } }}
      />
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="product-type-filter-label">Type</InputLabel>
        <Select
          native
          labelId="product-type-filter-label"
          label="Type"
          value={type}
          onChange={(event: SelectChangeEvent) => onTypeChange(event.target.value)}
          inputProps={{ 'aria-label': 'Filter products by type' }}
        >
          <option value={ALL_TYPES}>{ALL_TYPES}</option>
          {types.map((productType) => (
            <option key={productType} value={productType}>
              {productType}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
