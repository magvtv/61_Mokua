import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  InputAdornment,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode,
  LightMode,
  MenuBook,
  Close,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const {
    isDarkMode,
    toggleTheme,
    isMobileMenuOpen,
    setMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setSearchOpen,
  } = useAppStore();

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
      setSearchOpen(false);
      setLocalSearchQuery('');
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Fiction', path: '/category/fiction' },
    { label: 'Poetry', path: '/category/poetry' },
    { label: 'Essays', path: '/category/essays' },
    { label: 'Reviews', path: '/category/reviews' },
    { label: 'Authors', path: '/authors' },
  ];

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          elevation={trigger ? 4 : 0}
          sx={{
            bgcolor: trigger ? 'background.paper' : 'transparent',
            backdropFilter: trigger ? 'blur(10px)' : 'none',
            transition: theme.transitions.create(['background-color', 'backdrop-filter']),
          }}
        >
          <Toolbar>
            <IconButton
              component={Link}
              to="/"
              edge="start"
              sx={{ mr: 2, color: 'primary.main' }}
            >
              <MenuBook fontSize="large" />
            </IconButton>
            
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'text.primary',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
              }}
            >
              Rise Above
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  component={Link}
                  to="/contact"
                  color="inherit"
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  Contact
                </Button>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setSearchOpen(!isSearchOpen)}
                color="inherit"
                sx={{ color: 'text.primary' }}
              >
                <SearchIcon />
              </IconButton>
              
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{ color: 'text.primary' }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>

              {isMobile && (
                <IconButton
                  edge="end"
                  onClick={() => setMobileMenuOpen(true)}
                  color="inherit"
                  sx={{ color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
          
          {/* Search Bar */}
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <form onSubmit={handleSearch}>
                  <TextField
                    fullWidth
                    placeholder="Search articles, authors, topics..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setSearchOpen(false)}>
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                </form>
              </Box>
            </motion.div>
          )}
        </AppBar>
      </Slide>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{ 
                  '&:hover': { bgcolor: 'action.hover' },
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem
              component={Link}
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              sx={{ 
                '&:hover': { bgcolor: 'action.hover' },
                color: 'text.primary',
                textDecoration: 'none'
              }}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;