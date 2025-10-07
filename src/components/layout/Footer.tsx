import React from 'react';
import {
  Box,
  Container,
  Typography,
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

const Footer: React.FC = () => {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-start' }}>
          {/* Brand Section */}
          <Box sx={{ width: { xs: '100%', md: '40%' } }}>
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, maxWidth: 300 }}>
              We live and die by the stories we tell
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          {/* Navigation Sections */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1 }}>
            {/* Explore Section */}
            <Box sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Explore
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Home
                </Link>
                <Link component={RouterLink} to="/category/think-pieces" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Think-pieces
                </Link>
                <Link component={RouterLink} to="/category/short-stories" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Short stories
                </Link>
                <Link component={RouterLink} to="/category/poetry" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Poetry
                </Link>
                <Link component={RouterLink} to="/category/real-life" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Real Life
                </Link>
              </Box>
            </Box>

            {/* Community Section */}
            <Box sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Community
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link component={RouterLink} to="/authors" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Authors
                </Link>
                <Link component={RouterLink} to="/submit" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Submit Work
                </Link>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  About
                </Link>
                <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Contact
                </Link>
              </Box>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Stay in the loop
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Subscribe for updates on new posts, events, and featured stories.
              </Typography>
              <Box component="form" action="/api/subscribe" method="post"
                sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 360 }}
              >
                <TextField name="name" size="small" placeholder="Your name" required />
                <TextField name="email" size="small" placeholder="Your email address" type="email" required />
                <Button type="submit" variant="contained">Subscribe</Button>
              </Box>
            </Box>

            {/* Legal Section */}
            <Box sx={{ minWidth: { xs: '100%', sm: '200px' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link component={RouterLink} to="/privacy" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Privacy Policy
                </Link>
                <Link component={RouterLink} to="/terms" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Terms of Service
                </Link>
                <Link component={RouterLink} to="/cookies" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Cookie Policy
                </Link>
                <Link component={RouterLink} to="/accessibility" color="inherit" underline="hover" sx={{ fontSize: '0.9rem' }}>
                  Accessibility
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright Section */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 4,
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