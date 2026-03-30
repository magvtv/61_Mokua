import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
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
      sx={(theme) => ({
        borderTop: 1,
        borderColor: 'divider',
        py: 8,
        mt: 10,
        background: `linear-gradient(135deg, ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}10 0%, ${theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light}08 100%)`,
      })}
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
          <Box sx={{
            flex: 1,
            display: 'grid',
            gap: 4,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            alignItems: 'start'
          }}>
            {/* Explore Section */}
            <Box>
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
            <Box>
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

            {/* Newsletter Section removed (handled by NewsletterSignup component higher on page) */}

            {/* Legal Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
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
            {new Date().getFullYear()} © Rise Above. All rights reserved. Built with passion for literature. Crafted by <Link href="https://github.com/magvtv" target="_blank" rel="noopener noreferrer" underline="hover">PH Magutu</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;