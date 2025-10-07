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
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import { motion } from 'framer-motion';
import { isFeatureEnabled } from '../../utils/featureFlags';
import CalendarWidget from '../home/CalendarWidget';
import Popover from '@mui/material/Popover';

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

// DesktopCategoriesDropdown removed (unused)

// Mobile Categories Accordion Component
const MobileCategoriesAccordion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const navigate = useNavigate();

  const handleChange = (panel: string) => (_e: React.SyntheticEvent, isExpanded: boolean) => {
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
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<null | HTMLElement>(null);
  const isCalendarOpen = Boolean(calendarAnchorEl);

  const handleOpenCalendar = (e: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(e.currentTarget);
  };
  const handleCloseCalendar = () => setCalendarAnchorEl(null);
  
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
    { label: 'Think-pieces', path: '/category/think-pieces' },
    { label: 'Short stories', path: '/category/short-stories' },
    { label: 'Poetry', path: '/category/poetry' },
    { label: 'Real Life', path: '/category/real-life' },
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
              Rise Above
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