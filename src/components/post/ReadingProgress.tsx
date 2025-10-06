import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useReadingProgress } from '../../hooks/useReadingProgress';

const ReadingProgress: React.FC = () => {
  const progress = useReadingProgress();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: 3,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '100%',
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main',
          },
        }}
      />
    </Box>
  );
};

export default ReadingProgress;