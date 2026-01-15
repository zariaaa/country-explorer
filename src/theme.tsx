import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
   typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h6: {
      fontSize: '1rem',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#BE8B39',
          light: '#FFE872',
        },
        secondary: {
          main: '#FEFBE8',
          dark: '#e5e7eb',
        },
        info: {
          main: '#0071BC',
          dark: '#004c6fff',
        },
        divider: '#c2c7ce',
        background: {
          default: '#F9FAFC',
          paper: '#ffffff',
        },
        text: {
          primary: '#000000',
          secondary: '#6E7585',
          disabled: '#F9FAFC',
        },
      },
    },
    dark: { 
      palette: {
        primary: {
          main: '#BE8B39',
          light: '#FFE872',
          dark: '#8c6c2e',
        },
        secondary: {
          main: '#FEFBE8',
          light: '#4a5565',
          dark: '#4a5565', // #e5e7eb
        },
        info: {
          main: '#0071BC',
          dark: '#979797ff',
        },
        background: {
          default: '#141d2d',
          paper: '#1e2939',
        },
        divider: '#c2c7ce',
        text: {
          primary: '#ffffff',
          secondary: '#B0B0B0',
          disabled: '#354153',
        },
      },
    },
  },
});
