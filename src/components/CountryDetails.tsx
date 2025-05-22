import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CardMedia,
    TextField,
} from '@mui/material';
import type { Country } from '../interfaces/Country.interface';
import { useEffect, useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    country: Country | null;
    favourites: { [key: string]: string };
    updateNote: (countryName: string, note: string) => void;
}

export default function CountryDetailsDialog({
    open,
    onClose,
    country,
    favourites,
    updateNote,
}: Props) {
    const note =
        country && favourites[country.name.official] ? favourites[country.name.official] : '';

    const [localNote, setLocalNote] = useState(note);

    useEffect(() => {
        setLocalNote(note);
    }, [note, country?.name.official]);

    // Render the dialog if the country is defined
    if (!country) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            data-testid={`country-dialog-${country.name.official}`}
        >
            <DialogActions>
                <Button onClick={onClose} data-testid="dialog-close-button">
                    Close
                </Button>
            </DialogActions>
            <DialogTitle data-testid="dialog-title">{country.name.official}</DialogTitle>
            <DialogContent
                sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'space-between' }}
            >
                <div style={{ width: '90%' }}>
                    <Typography>Capital: {country.capital?.[0]}</Typography>
                    <Typography>Population: {country.population}</Typography>
                    <Typography>
                        Languages:{' '}
                        {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                    </Typography>
                    <Typography>
                        Currencies:{' '}
                        {country.currencies
                            ? Object.values(country.currencies)
                                  .map((currency) => currency.symbol)
                                  .join(', ')
                            : 'N/A'}
                    </Typography>
                </div>
                <CardMedia
                    component="img"
                    width="100px"
                    height="100px"
                    image={country.flags?.png}
                    alt="Country flag"
                    data-testid="dialog-flag"
                />
            </DialogContent>
            <DialogContent>
                {favourites[country.name.official] !== undefined && (
                    <TextField
                        fullWidth
                        multiline
                        value={localNote}
                        onChange={(e) => setLocalNote(e.target.value)}
                        onBlur={() => updateNote(country.name.official, localNote)}
                        margin="normal"
                        inputProps={{
                            'data-testid': 'note-input',
                        }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
