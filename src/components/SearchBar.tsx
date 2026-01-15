import { useCallback, useMemo } from 'react';
import { TextField, Select, MenuItem, FormControl, debounce, InputAdornment } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { SearchBarProps } from '../interfaces/Country.interface';
import {  Search } from '@mui/icons-material';

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
            <div className="search-items" style={{ display: 'flex', margin: '1rem 0rem',gap: '1rem', alignItems: 'center' }}>
                <TextField
                    placeholder="Search by Name"
                      slotProps={{
                    input: {
                        startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                        ),
                    },
                    }}
                    variant="outlined"
                    onChange={handleSearchChange}
                    sx={{ borderRadius: '15px', flex: '0 0 70%',
                           '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                            },  
                     }}
                    aria-label="Search countries by name"
                />
                <FormControl sx={{ flex: '0 0 calc(30% - 1rem)' }}>
                    <Select
                        variant="outlined"
                        value={selectedRegion || 'all'}
                        displayEmpty
                        onChange={handleRegionChange}
                        defaultValue='All Regions'
                          MenuProps={{
                            PaperProps: {
                            sx: {
                                borderRadius: '15px',
                                mt: 1,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            },
                            },
                            MenuListProps: {
                            sx: {
                                padding: 0,
                            },
                            },
                            disableScrollLock: true,
                        }}
                        sx={{  borderRadius: '15px' , textAlign: 'left',}}
                        aria-label="Select region to filter countries"
                    >
                        <MenuItem value="all">All Regions</MenuItem>
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
