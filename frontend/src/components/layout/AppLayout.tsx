import React, { useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useAppStore } from '../../stores/useAppStore';
import { lightTheme, darkTheme } from '../../theme';
import Header from './Header';
import Footer from './Footer';
import NotificationManager from '../common/NotificationManager';
import BackToTop from '../common/BackToTop';
import { useLocation } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDarkMode } = useAppStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const location = useLocation();

  // Ensure new route renders start at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const shouldShowBackToTop = location.pathname !== '/';

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
              }}
            >
              <Header />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: { xs: 8, md: 9 }, // Account for fixed header
                }}
              >
                {children}
              </Box>
              <Footer />
              <NotificationManager />
            {shouldShowBackToTop && <BackToTop />}
            </Box>
          </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default AppLayout;