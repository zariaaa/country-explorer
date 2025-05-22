import { useCallback, useMemo } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, debounce } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { SearchBarProps } from '../interfaces/Country.interface';

const SearchBar = ({
    setSearchTerm,
    setSelectedRegion,
    regions,
    selectedRegion,
}: SearchBarProps) => {
    // Debounce search implementation to prevent too many re-renders
    const debouncedSetSearchTerm = useMemo(
        () => debounce((value: string) => setSearchTerm(value), 300),
        [setSearchTerm]
    );

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSetSearchTerm(event.target.value);
        },
        [debouncedSetSearchTerm]
    );

    const handleRegionChange = useCallback(
        (event: SelectChangeEvent) => {
            setSelectedRegion(event.target.value);
        },
        [setSelectedRegion]
    );

    return (
        <div className="searchbar">
            <div className="search-items">
                <TextField
                    fullWidth
                    label="Search by Name"
                    variant="outlined"
                    onChange={handleSearchChange}
                    sx={{ backgroundColor: 'white', margin: '0rem 1rem', borderRadius: '5px' }}
                    aria-label="Search countries by name"
                />
                <FormControl fullWidth>
                    <InputLabel id="region-select-label">Filter by Region</InputLabel>
                    <Select
                        labelId="region-select-label"
                        value={selectedRegion}
                        label="Filter by Region"
                        onChange={handleRegionChange}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        aria-label="Select region to filter countries"
                    >
                        <MenuItem value="">All Regions</MenuItem>
                        {regions.map((region) => (
                            <MenuItem key={region} value={region}>
                                {region}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default SearchBar;
