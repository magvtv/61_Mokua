import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.7,
      fontSize: '1rem',
    },
    body2: {
      lineHeight: 1.6,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D8A',
      light: '#5FADBA',
      dark: '#1F5560',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF8F00',
      light: '#FFB74D',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#FF6B6B',
      light: '#FF9999',
      dark: '#E53E3E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF8E1',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4FD1C7',
      light: '#81E6E0',
      dark: '#38A2A8',
      contrastText: '#1A202C',
    },
    secondary: {
      main: '#FFB74D',
      light: '#FFD54F',
      dark: '#FF8F00',
      contrastText: '#1A202C',
    },
    tertiary: {
      main: '#FF8A80',
      light: '#FFAB91',
      dark: '#FF5722',
      contrastText: '#1A202C',
    },
    background: {
      default: '#1A202C',
      paper: '#2D3748',
    },
    text: {
      primary: '#F7FAFC',
      secondary: '#E2E8F0',
    },
  },
});