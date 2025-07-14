import React from 'react';
import { Snackbar, Alert, Slide, Box } from '@mui/material';
import { useAppStore } from '../../stores/useAppStore';

const NotificationManager: React.FC = () => {
  const { notifications, removeNotification } = useAppStore();

  return (
    <Box sx={{ position: 'fixed', top: 80, right: 16, zIndex: 2000 }}>
      {notifications.map((notification, index) => (
        <Slide
          key={notification.id}
          direction="left"
          in={true}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Box sx={{ mb: 1 }}>
            <Alert
              severity={notification.type}
              onClose={() => removeNotification(notification.id)}
              sx={{ minWidth: 300 }}
            >
              {notification.message}
            </Alert>
          </Box>
        </Slide>
      ))}
    </Box>
  );
};

export default NotificationManager;