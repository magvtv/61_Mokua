import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Box } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useReadingProgress } from '../../hooks/useReadingProgress';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const progress = useReadingProgress();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          height: 56,
          width: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            background: `
              radial-gradient(closest-side, white 79%, transparent 80% 100%),
              conic-gradient(#1976d2 ${progress}%, #e0e0e0 0)
            `,
          }}
        />
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="medium"
          sx={{
            position: 'relative',
            boxShadow: 'none',
            zIndex: 1001,
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default BackToTop;