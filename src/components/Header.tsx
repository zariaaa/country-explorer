import { Bedtime, Architecture, LightMode } from '@mui/icons-material';
import { Container, IconButton, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

export const Header = () => {
    const { mode, setMode } = useColorScheme();

    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="header" style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            textAlign: 'center',
            backgroundColor: mode === 'light' ? '#E5E7EB' : '#1D2738',
            color: 'white',
            boxShadow:'0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            transition: 'background-color 0.3s ease',
            zIndex: 1000,
        }}>
           <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>

            <div className='logo'>
                <Architecture style={{ fontSize: '2rem' , color: mode === 'light' ? 'blue' : '#90CAF9'}} />
                <Typography sx={{color: mode === 'light' ? 'black' : 'white'}}>Countries of the World</Typography>
            </div>
               <div className='modeSwitcher'>
               <motion.div
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9, rotate: -15 }}
               >
               <IconButton
                    aria-label="toggle mode"
                    onClick={toggleTheme}
                    sx={{ color: mode === 'light' ? 'black' : 'white' }}
               >
                    {mode === 'light' ? <Bedtime /> : <LightMode />}
                </IconButton>
                </motion.div>
            </div>
             </Container>
        </header>
    );
};