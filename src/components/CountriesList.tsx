import { useState, useMemo, Suspense, lazy } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    Pagination,
    CircularProgress,
    Typography,
    Box,
    Grid,
    Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import type { Country } from '../interfaces/Country.interface';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useFavourites } from '../utils/useFavourites';
import { NoteOutlined } from '@mui/icons-material';

const CountryDetailsDialog = lazy(() => import('./CountryDetails'));
const NoteDialog = lazy(() => import('./NoteDialog'));

interface CountriesListProps {
    listOfData: Country[];
    loading: boolean;
}

const CountriesList = ({ listOfData, loading }: CountriesListProps) => {
    const [page, setPage] = useState(1);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [noteCountry, setNoteCountry] = useState<Country | null>(null);
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

    const handleOpenNoteDialog = (country: Country) => {
        setNoteCountry(country);
    };

    const handleCloseNoteDialog = () => {
        setNoteCountry(null);
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
            <Grid container spacing={2} sx={{ width: '100%', minHeight: '100vh',margin: 0 }} data-testid="countries-container">
                {paginated.map((country) => {
                    const uniqueId = country.name.official;
                    const isFavorited = uniqueId in favourites;

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={uniqueId}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column' ,
                                borderRadius: '15px',
                                boxShadow: '0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%)',
                            }}
                            role="article"
                            aria-label={`Country: ${country.name.official}`}
                            data-testid={`country-card-${uniqueId}`}
                        >
                            <motion.div   
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    width="auto"
                                    image={country.flags.svg}
                                    alt={country.flags.alt || `Flag of ${country.name.official}`}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleOpenDialog(country)}
                                    data-testid={`country-flag-${uniqueId}`}
                                />
                            </motion.div>
                            <CardHeader
                                title={country.name.official}
                                subheader={country.region}
                                sx={{
                                    padding: '1rem',
                                    '& .MuiCardHeader-title': {
                                        fontSize: '16px',
                                        textAlign: 'left',
                                        fontWeight: '500',
                                    },
                                    '& .MuiCardHeader-subheader': {
                                        fontSize: '0.875rem',
                                        textAlign: 'left',
                                        color: '#6E7585',
                                    },
                                }}
                            />
                            <CardActions
                                disableSpacing
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                <Button
                                onClick={() => toggleFavourite(uniqueId)}
                                variant="outlined"
                                data-testid={`favorite-button-${uniqueId}`}
                                sx={{
                                        borderRadius: '15px',
                                        backgroundColor: `${isFavorited ? 'primary.light' : 'text.disabled' }`,
                                        border: `1px solid`,
                                        borderColor: `${isFavorited ? 'secondary.light': 'secondary.dark' }`,
                                        color: `${isFavorited ? '#BE8B39' : 'text.primary' }`,
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#FEFBE8',
                                            border: '1px solid #FFE872',
                                            color: '#BE8B39',
                                        },
                                        minWidth: 'auto',
                                    }}
                                startIcon={
                                            isFavorited ?
                                            <StarIcon data-testid={`star-filled-${uniqueId}`}/> :
                                            <StarBorderIcon data-testid={`star-outline-${uniqueId}`} />}>
                                    Favorite
                                </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                <Button
                                        onClick={() => handleOpenNoteDialog(country)}
                                        variant="outlined"
                                        data-testid={`note-button-${uniqueId}`}
                                            sx={{
                                            borderRadius: '15px',
                                            backgroundColor: `'text.disabled'`,
                                            border: `1px solid`,
                                            borderColor: `${isFavorited ? 'secondary.light': 'secondary.dark' }`,
                                            color: `text.primary`,
                                            textTransform: 'none',
                                            fontWeight: 'normal',
                                            '&:hover': {
                                                backgroundColor: '#E3F2FD',
                                                border: '1px solid #90CAF9',
                                                color: '#1976D2',
                                            },
                                            minWidth: 'auto',
                                            }}
                                startIcon={<NoteOutlined data-testid={`note-icon-${uniqueId}`} />}>
                                     {favourites[uniqueId] ? 'Edit Note' : 'Add a Note'}
                                </Button>
                                </motion.div>
                            </CardActions>
                        </Card>
                        </motion.div>
                        </Grid>
                    );
                })}
            </Grid>

            <Pagination
                count={pageCount}
                page={page}
                onChange={(_, val) => setPage(val)}
                data-testid="countries-pagination"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '2rem 0',
                    color: '#fff',
                    fontWeight: 'bold',
                    '& .MuiPaginationItem-root': {
                        color: 'black',
                        borderColor: 'black',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'info.main',
                            opacity: 0.6,
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'info.main',
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
                    />
                )}
                {noteCountry && (
                    <NoteDialog
                        open={!!noteCountry}
                        country={noteCountry}
                        onClose={handleCloseNoteDialog}
                        favourites={favourites}
                        updateNote={updateNote}
                    />
                )}
            </Suspense>
        </>
    );
};

export default CountriesList;
