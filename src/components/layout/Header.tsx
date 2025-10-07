import React, { useState, useRef } from 'react';
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
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode,
  LightMode,
  MenuBook,
  Close,
  ExpandMore,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { motion } from 'framer-motion';
import { isFeatureEnabled } from '../../utils/featureFlags';

// Literature categories data
const literatureCategories = [
  {
    label: 'Youth Affairs',
    path: '/category/youth-affairs',
    subcategories: [
      { label: 'Mental Health', path: '/category/youth-affairs/mental-health' },
      { label: 'Drug Abuse', path: '/category/youth-affairs/drug-abuse' },
      { label: 'Education Challenges', path: '/category/youth-affairs/education' },
      { label: 'Employment', path: '/category/youth-affairs/employment' },
      { label: 'Social Media', path: '/category/youth-affairs/social-media' },
    ]
  },
  {
    label: 'County News',
    path: '/category/county-news',
    subcategories: [
      { label: 'Nairobi', path: '/category/county-news/nairobi' },
      { label: 'Mombasa', path: '/category/county-news/mombasa' },
      { label: 'Kisumu', path: '/category/county-news/kisumu' },
      { label: 'Nakuru', path: '/category/county-news/nakuru' },
      { label: 'Eldoret', path: '/category/county-news/eldoret' },
    ]
  },
  {
    label: 'Health & Wellness',
    path: '/category/health-wellness',
    subcategories: [
      { label: 'Sexual Health', path: '/category/health-wellness/sexual-health' },
      { label: 'HIV/AIDS', path: '/category/health-wellness/hiv-aids' },
      { label: 'Mental Health', path: '/category/health-wellness/mental-health' },
      { label: 'Substance Abuse', path: '/category/health-wellness/substance-abuse' },
      { label: 'Nutrition', path: '/category/health-wellness/nutrition' },
    ]
  },
  {
    label: 'Education & Tech',
    path: '/category/education-tech',
    subcategories: [
      { label: 'Digital Learning', path: '/category/education-tech/digital-learning' },
      { label: 'Online Education', path: '/category/education-tech/online-education' },
      { label: 'Tech Innovation', path: '/category/education-tech/tech-innovation' },
      { label: 'Career Development', path: '/category/education-tech/career-development' },
      { label: 'Digital Skills', path: '/category/education-tech/digital-skills' },
    ]
  },
];

// Desktop Categories Dropdown Component
const DesktopCategoriesDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
    }, 150);
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  const handleSubcategoryClick = (path: string) => {
    navigate(path);
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: 'relative' }}
    >
      <Button
        color="inherit"
        endIcon={<KeyboardArrowDown />}
        sx={{ 
          color: 'text.primary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        Topics
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          onMouseEnter: () => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          },
          onMouseLeave: handleMouseLeave,
          style: { padding: 0 }
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: 3,
            borderRadius: 2,
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {literatureCategories.map((category) => (
          <MenuItem
            key={category.path}
            onClick={() => handleCategoryClick(category.path)}
            onMouseEnter={() => setHoveredCategory(category.label)}
            onMouseLeave={() => setHoveredCategory(null)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
              px: 2,
              '&:hover': { bgcolor: 'action.hover' },
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              {category.label}
            </Box>
            <KeyboardArrowDown sx={{ fontSize: 16, ml: 1 }} />
            
            {/* Submenu */}
            {hoveredCategory === category.label && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '100%',
                  top: 0,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  borderRadius: 2,
                  minWidth: 200,
                  zIndex: 1300,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <MenuItem
                    key={subcategory.path}
                    onClick={() => handleSubcategoryClick(subcategory.path)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    {subcategory.label}
                  </MenuItem>
                ))}
              </Box>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

// Mobile Categories Accordion Component
const MobileCategoriesAccordion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const navigate = useNavigate();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSubcategoryClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {literatureCategories.map((category) => (
        <Accordion
          key={category.path}
          expanded={expanded === category.path}
          onChange={handleChange(category.path)}
          sx={{
            '&:before': { display: 'none' },
            boxShadow: 'none',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            onClick={() => handleCategoryClick(category.path)}
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              cursor: 'pointer',
            }}
          >
            <Typography>{category.label}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0, pb: 1 }}>
            <List dense sx={{ py: 0 }}>
              {category.subcategories.map((subcategory) => (
                <ListItem
                  key={subcategory.path}
                  onClick={() => handleSubcategoryClick(subcategory.path)}
                  sx={{
                    py: 0.5,
                    '&:hover': { bgcolor: 'action.hover' },
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText 
                    primary={subcategory.label}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

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
    { label: 'Authors', path: '/authors' },
  ];

  // Filter navigation items based on feature flags
  const filteredNavigationItems = navigationItems.filter(() => {
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
              Mokua Literary
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                {filteredNavigationItems.map((item) => (
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
                
                {/* Desktop Categories Dropdown */}
                <DesktopCategoriesDropdown />
                
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
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {filteredNavigationItems.map((item) => (
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
            
            {/* Mobile Categories Accordion */}
            <ListItem sx={{ display: 'block', p: 0 }}>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Literature Categories
                </Typography>
                <MobileCategoriesAccordion onClose={() => setMobileMenuOpen(false)} />
              </Box>
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