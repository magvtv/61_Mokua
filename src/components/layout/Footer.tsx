import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  MenuBook,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useAppStore();

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email.trim() || !name.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          name,
          source: 'footer'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }
      
      addNotification({
        type: 'success',
        message: 'Thank you for subscribing to our newsletter!',
      });
      
      setEmail('');
      setName('');
    } catch (error) {
      addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid component="div" item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton sx={{ color: 'primary.main', p: 0, mr: 1 }}>
                <MenuBook fontSize="large" />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                }}
              >
                Rise Above
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We live and die by the stories we tell
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary">
                <Facebook />
              </IconButton>
              <IconButton size="small" color="primary">
                <Twitter />
              </IconButton>
              <IconButton size="small" color="primary">
                <Instagram />
              </IconButton>
              <IconButton size="small" color="primary">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/category/fiction" color="inherit" underline="hover">
                Fiction
              </Link>
              <Link component={RouterLink} to="/category/poetry" color="inherit" underline="hover">
                Poetry
              </Link>
              <Link component={RouterLink} to="/category/essays" color="inherit" underline="hover">
                Essays
              </Link>
              <Link component={RouterLink} to="/category/reviews" color="inherit" underline="hover">
                Reviews
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Community
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/authors" color="inherit" underline="hover">
                Authors
              </Link>
              <Link component={RouterLink} to="/submit" color="inherit" underline="hover">
                Submit Work
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                Contact
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                About
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest literary insights and featured content.
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                size="small"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                size="small"
                placeholder="Your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !email.trim() || !name.trim()}
                sx={{ mb: 2 }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 3,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Mokua Literary Blog. All rights reserved. Built with passion for literature.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;