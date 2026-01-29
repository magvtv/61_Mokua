import React, { useRef, useState } from 'react';
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
  ListItemButton,
  useScrollTrigger,
  Slide,
  InputAdornment,
  TextField,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode,
  LightMode,
  MenuBook,
  Close,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { motion } from 'framer-motion';
import { isFeatureEnabled } from '../../utils/featureFlags';
import CalendarWidget from '../home/CalendarWidget';
import Popover from '@mui/material/Popover';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const {
    isDarkMode,
    toggleTheme,
    isMobileMenuOpen,
    setMobileMenuOpen,
    setSearchQuery,
    isSearchOpen, 
    setSearchOpen,
  } = useAppStore();

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<null | HTMLElement>(null);
  const isCalendarOpen = Boolean(calendarAnchorEl);
  const [articlesAnchorEl, setArticlesAnchorEl] = useState<null | HTMLElement>(null);
  const isArticlesMenuOpen = Boolean(articlesAnchorEl);
  const articlesHoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobileArticlesOpen, setMobileArticlesOpen] = useState(false);

  const handleOpenCalendar = (e: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(e.currentTarget);
  };
  const handleCloseCalendar = () => setCalendarAnchorEl(null);
  const cancelArticlesMenuClose = () => {
    if (articlesHoverTimeout.current) {
      clearTimeout(articlesHoverTimeout.current);
      articlesHoverTimeout.current = null;
    }
  };
  const scheduleArticlesMenuClose = () => {
    cancelArticlesMenuClose();
    articlesHoverTimeout.current = setTimeout(() => {
      setArticlesAnchorEl(null);
      articlesHoverTimeout.current = null;
    }, 150);
  };
  const handleArticlesMenuClose = () => {
    cancelArticlesMenuClose();
    setArticlesAnchorEl(null);
  };
  const handleArticleNavigate = (path: string) => {
    navigate(path);
    handleArticlesMenuClose();
  };
  
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

  const articleCategories = [
    { label: 'Think Pieces', path: '/category/think-pieces' },
    { label: 'Short Stories', path: '/category/short-stories' },
    { label: 'Poems', path: '/category/poetry' },
    { label: 'Real Life', path: '/category/real-life' },
  ];

  // Filter navigation items based on feature flags
  const filteredArticleCategories = articleCategories.filter(() => {
    // Show all navigation items for now, but you can add conditions here
    return true;
  });

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
                <Box
                  onMouseEnter={(event) => {
                    cancelArticlesMenuClose();
                    setArticlesAnchorEl(event.currentTarget as HTMLElement);
                  }}
                  onMouseLeave={scheduleArticlesMenuClose}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Button
                    color="inherit"
                    onClick={(event) => {
                      cancelArticlesMenuClose();
                      setArticlesAnchorEl(event.currentTarget);
                    }}
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Articles
                  </Button>
                  <Popover
                    open={isArticlesMenuOpen}
                    anchorEl={articlesAnchorEl}
                    onClose={handleArticlesMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    disableRestoreFocus
                    PaperProps={{
                      sx: { p: 1, mt: 1 },
                      onMouseEnter: cancelArticlesMenuClose,
                      onMouseLeave: scheduleArticlesMenuClose,
                    }}
                  >
                    <List dense sx={{ py: 0 }}>
                      {filteredArticleCategories.map((item) => (
                        <ListItemButton
                          key={item.path}
                          onClick={() => handleArticleNavigate(item.path)}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Popover>
                </Box>

                {/* Calendar dropdown */}
                <Button
                  color="inherit"
                  onClick={handleOpenCalendar}
                  sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
                >
                  Calendar
                </Button>
                <Popover
                  open={isCalendarOpen}
                  anchorEl={calendarAnchorEl}
                  onClose={handleCloseCalendar}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{ sx: { p: 2, borderRadius: 2 } }}
                >
                  <Box sx={{ width: 280 }}>
                    <CalendarWidget initialDate={new Date()} onDateClick={() => {
                      handleCloseCalendar();
                      // Optional: navigate to filtered view by date in future
                    }} />
                  </Box>
                </Popover>
                
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
              {isFeatureEnabled('ENABLE_SEARCH') && (
                <IconButton
                  onClick={() => setSearchOpen(!isSearchOpen)}
                  color="inherit"
                  sx={{ color: 'text.primary' }}
                >
                  <SearchIcon />
                </IconButton>
              )}
              
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
          {isSearchOpen && isFeatureEnabled('ENABLE_SEARCH') && (
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
        <Box sx={{ width: 'min(350px, 100vw)', pt: 2 }}>
          <List>
            <ListItem sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Articles
              </Typography>
            </ListItem>
            <ListItem
              component={Link}
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                color: 'text.primary',
                textDecoration: 'none',
              }}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setMobileArticlesOpen((prev) => !prev)}
                sx={{
                  px: 2,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemText primary="Article Categories" />
                {isMobileArticlesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isMobileArticlesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {filteredArticleCategories.map((item) => (
                  <ListItemButton
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    sx={{
                      pl: 4,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Calendar quick action */}
            <ListItem
              onClick={() => setMobileMenuOpen(false)}
              sx={{ '&:hover': { bgcolor: 'action.hover' }, cursor: 'pointer' }}
            >
              <ListItemText primary="Calendar" onClick={() => setSearchOpen(false)} />
            </ListItem>
            
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