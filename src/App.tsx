import { useMemo, useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import CountriesList from './components/CountriesList';
import ErrorBanner from './components/ErrorBanner';
import { useCountries } from './utils/useCountries';
import './App.css';

const App = () => {
    const { countries, error, loading, refetch } = useCountries();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const uniqueRegions = useMemo(
        () => Array.from(new Set(countries.map((c) => c.region))),
        [countries]
    );

    const filteredCountries = useMemo(() => {
        return countries
            .filter((c) => c.name.official.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter((c) => (selectedRegion ? c.region === selectedRegion : true))
            .sort((a, b) => a.name.official.localeCompare(b.name.official));
    }, [countries, searchTerm, selectedRegion]);

    if (loading) {
        return (
            <Box
                height="100vh"
                width="100vw"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#333"
                position="fixed"
                top={0}
                left={0}
                zIndex={9999}
            >
                <CircularProgress size={200} color="primary" />
                <Typography variant="h4" color="white" marginLeft="1rem">
                    Loading data...
                </Typography>
            </Box>
        );
    }
    return (
        <Container fixed>
            {error && <ErrorBanner error={error.toString()} onRetry={refetch} />}
            <SearchBar
                setSearchTerm={setSearchTerm}
                setSelectedRegion={setSelectedRegion}
                regions={uniqueRegions}
                selectedRegion={selectedRegion}
            />
            <CountriesList listOfData={filteredCountries} loading={loading} />
        </Container>
    );
};

export default App;
