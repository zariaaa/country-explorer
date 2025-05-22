import { useState, useMemo, Suspense, lazy } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    IconButton,
    Pagination,
    CircularProgress,
    Typography,
    Box,
    Tooltip,
} from '@mui/material';
import type { Country } from '../interfaces/Country.interface';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useFavourites } from '../utils/useFavourites';

const CountryDetailsDialog = lazy(() => import('./CountryDetails'));

interface CountriesListProps {
    listOfData: Country[];
    loading: boolean;
}

const CountriesList = ({ listOfData, loading }: CountriesListProps) => {
    const [page, setPage] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const itemsPerPage = 20;
    const { favourites, toggleFavourite, updateNote } = useFavourites();

    const sorted = useMemo(() => {
        return [...listOfData].sort((a, b) => a.name.official.localeCompare(b.name.official));
    }, [listOfData]);

    const pageCount = Math.ceil(sorted.length / itemsPerPage);

    const paginated = useMemo(() => {
        return sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [sorted, page]);

    const handleOpenDialog = (country: Country) => {
        setSelectedCountry(country);
    };

    const handleCloseDialog = () => {
        setSelectedCountry(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (listOfData.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography>No countries found</Typography>
            </Box>
        );
    }

    return (
        <>
            <div className="main-container" data-testid="countries-container">
                {paginated.map((country) => {
                    const uniqueId = country.name.official;
                    const isFavorited = uniqueId in favourites;

                    return (
                        <Card
                            key={uniqueId}
                            sx={{ maxWidth: 345, margin: '1rem', width: '220px' }}
                            role="article"
                            aria-label={`Country: ${country.name.official}`}
                            data-testid={`country-card-${uniqueId}`}
                        >
                            <CardHeader
                                title={country.name.official}
                                subheader={country.region}
                                sx={{
                                    '& .MuiCardHeader-title': {
                                        fontSize: '18px',
                                        minHeight: '50px',
                                    },
                                }}
                            />
                            <CardMedia
                                component="img"
                                height="100"
                                image={country.flags.png}
                                alt={country.flags.alt || `Flag of ${country.name.official}`}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleOpenDialog(country)}
                                data-testid={`country-flag-${uniqueId}`}
                            />
                            <CardActions
                                disableSpacing
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    onClick={() => toggleFavourite(uniqueId)}
                                    aria-label={
                                        isFavorited ? 'Remove from favorites' : 'Add to favorites'
                                    }
                                    data-testid={`favorite-button-${uniqueId}`}
                                    sx={{
                                        transition: 'all 0.2s ease-in-out',
                                        color: '#1976d2',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            backgroundColor: '#333',
                                            color: '#fff',
                                        },
                                        minWidth: 'auto',
                                    }}
                                >
                                    {isFavorited ? (
                                        <StarIcon
                                            color="primary"
                                            data-testid={`star-filled-${uniqueId}`}
                                        />
                                    ) : (
                                        <StarBorderIcon data-testid={`star-outline-${uniqueId}`} />
                                    )}
                                </IconButton>
                                {isFavorited && (
                                    <Tooltip
                                        title={
                                            <Typography
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 500,
                                                    color: '#ed6c02',
                                                }}
                                            >
                                                Add a Note
                                            </Typography>
                                        }
                                        placement="top"
                                        arrow
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    border: '1px solid #ed6c02',
                                                    backgroundColor: '#333',
                                                    '& .MuiTooltip-arrow': {
                                                        color: '#333',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => handleOpenDialog(country)}
                                            color="warning"
                                            size="small"
                                            data-testid={`note-button-${uniqueId}`}
                                            sx={{
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    backgroundColor: '#333',
                                                },
                                                minWidth: 'auto',
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </CardActions>
                        </Card>
                    );
                })}
            </div>

            <Pagination
                count={pageCount}
                page={page}
                onChange={(_, val) => setPage(val)}
                data-testid="countries-pagination"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 2,
                    color: '#fff',
                    fontWeight: 'bold',
                    '& .MuiPaginationItem-root': {
                        color: 'black',
                        borderColor: 'black',
                        backgroundColor: 'white',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: '#ed6c02',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#ed6c02',
                        color: 'white',
                    },
                }}
            />

            <Suspense fallback={null}>
                {selectedCountry && (
                    <CountryDetailsDialog
                        open={!!selectedCountry}
                        country={selectedCountry}
                        onClose={handleCloseDialog}
                        favourites={favourites}
                        updateNote={updateNote}
                    />
                )}
            </Suspense>
        </>
    );
};

export default CountriesList;
