import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    useColorScheme,
} from '@mui/material';
import type { Country } from '../interfaces/Country.interface';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Props {
    open: boolean;
    onClose: () => void;
    country: Country | null;
}

export default function CountryDetailsDialog({
    open,
    onClose,
    country,
}: Readonly<Props>) {
    const { mode } = useColorScheme();
    // Render the dialog if the country is defined
    if (!country) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'background.paper',
                    },
                    elevation: 0,
                },
            }}
            data-testid={`country-dialog-${country.name.official}`}
            sx={{
                backdropFilter: "blur(10px)",
            }}
        >
            <DialogActions>
                <motion.div
                    whileHover={{ rotate: 90 }}
                    whileTap={{ rotate: 180}}
                    transition={{ duration: 0.3 }}
                >
                 <IconButton aria-label="close" data-testid="dialog-close-button" onClick={onClose}>
                    <Close />
                </IconButton>
                </motion.div>
            </DialogActions>
            <DialogContent>

        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
            boxShadow: '0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%)',
        }}>
             <motion.img 
                src={country.flags?.svg}
                width="100%"
                height="100%"
                alt={`Flag of ${country.name.common}`} 
                data-testid="dialog-flag"
                className="w-full h-full object-cover" 
                style={{
                    borderRadius: '15px',
                    boxShadow: '0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%)',
                }}
                />
        </div>
            </DialogContent>
            <DialogTitle data-testid="dialog-title" sx={{fontSize: '20px'}}>{country.name.official}</DialogTitle>
            <DialogContent
                sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'space-between',flexDirection:'column' }}
            >
                    <div style={{ width: '100%' , margin: '0.5rem 0rem',display:'flex', gap:'1rem', justifyContent:'space-between'}}>
                        <div style={{width: '100%' ,
                            backgroundColor: mode === 'dark' ? '#354153' : '#F9FAFC',
                            border:'1px solid', 
                            borderColor: mode === 'dark' ? '#4a5565' : '#E5E7EB',
                            borderRadius:'15px', 
                            padding:'1rem'}}>
                                <Typography variant="subtitle1" color="textSecondary">Capital: </Typography>
                                <Typography variant="h6">{country.capital && country.capital.length !=0 ? country.capital?.[0] : 'N/A'}</Typography>
                        </div>
                        <div style={{width: '100%' ,
                            backgroundColor: mode === 'dark' ? '#354153' : '#F9FAFC',
                            border:'1px solid', 
                            borderColor: mode === 'dark' ? '#4a5565' : '#E5E7EB',
                            borderRadius:'15px', 
                            padding:'1rem'}}>
                            <Typography variant="subtitle1" color="textSecondary">Population: </Typography>
                            <Typography variant="h6">{country.population}</Typography>
                        </div>
                    </div>
                   <div style={{ width: '100%' , margin: '0.5rem 0rem' ,display:'flex', gap:'1rem', justifyContent:'space-between'}}>
                        <div style={{width: '100%' , 
                           backgroundColor: mode === 'dark' ? '#354153' : '#F9FAFC',
                            border:'1px solid', 
                            borderColor: mode === 'dark' ? '#4a5565' : '#E5E7EB',
                            borderRadius:'15px', 
                            padding:'1rem'}}>
                            <Typography variant="subtitle1" color="textSecondary">Languages: </Typography>
                            <Typography variant="h6">{country.languages && Object.keys(country.languages).length != 0 ? Object.values(country.languages).join(', ') : 'N/A'}</Typography>
                        </div>
                        <div style={{width: '100%' , 
                            backgroundColor: mode === 'dark' ? '#354153' : '#F9FAFC',
                            border:'1px solid', 
                            borderColor: mode === 'dark' ? '#4a5565' : '#E5E7EB',
                            borderRadius:'15px', 
                            padding:'1rem'}}>
                            <Typography variant="subtitle1" color="textSecondary">Currencies: </Typography>
                            <Typography variant="h6"> {country.currencies && Object.keys(country.currencies).length != 0
                                ? Object.values(country.currencies)
                                    .map((currency) => currency.symbol)
                                    .join(', ')
                                : 'N/A'}</Typography>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    );
}
