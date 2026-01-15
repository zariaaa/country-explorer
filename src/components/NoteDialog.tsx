import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Button,
} from '@mui/material';
import type { Country } from '../interfaces/Country.interface';
import { useEffect, useState } from 'react';
import { Close, Save } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Props {
    open: boolean;
    onClose: () => void;
    country: Country | null;
    favourites: { [key: string]: string };
    updateNote: (countryName: string, note: string) => void;
}

export default function NoteDialog({
    open,
    onClose,
    country,
    favourites,
    updateNote,
}: Readonly<Props>) {
    const note =
        country && favourites[country.name.official] ? favourites[country.name.official] : '';

    const [localNote, setLocalNote] = useState(note);

    useEffect(() => {
        setLocalNote(note);
    }, [note, country?.name.official]);

    const handleSave = () => {
        if (country) {
            updateNote(country.name.official, localNote);
            onClose();
        }
    };

    if (!country) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            data-testid={`note-dialog-${country.name.official}`}
        >
            <DialogActions sx={{ justifyContent: 'space-between', px: 3, pt: 2 }}>
                <DialogTitle sx={{ p: 0, flex: 1 }}>
                    Add Note for {country.name.official}
                </DialogTitle>
                 <motion.div
                    whileHover={{ rotate: 90 }}
                    whileTap={{ rotate: 180}}
                    transition={{ duration: 0.3 }}
                >
                    <IconButton aria-label="close" data-testid="note-dialog-close-button" onClick={onClose}>
                        <Close />
                    </IconButton>
                </motion.div>
            </DialogActions>
            <DialogContent sx={{ px: 3, pb: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={localNote}
                    onChange={(e) => setLocalNote(e.target.value)}
                    placeholder="Add your note here..."
                    margin="normal"
                    inputProps={{
                        'data-testid': 'note-input',
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        borderColor: '#CBCBCB', 
                        color: 'text.primary',
                        width: '100%',
                        padding: '1rem 0rem',
                        fontSize: '17px',
                        fontWeight: 'normal',
                        textTransform: 'none',
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        padding: '1rem 0rem',
                        fontSize: '17px',
                        fontWeight: 'normal',
                        width: '100%',
                        backgroundColor: '#145DFC',
                    }}
                    data-testid="save-note-button"
                    startIcon={<Save />}
                >
                    Save Note
                </Button>
            </DialogActions>
        </Dialog>
    );
}
