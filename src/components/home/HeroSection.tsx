import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services/contentService';
import CompactPostCard from './CompactPostCard';
import LoadingSpinner from '../common/LoadingSpinner';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: featuredPosts, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => contentService.getFeaturedPosts(3),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { icon: BookOpenIcon, value: '500+', label: 'Articles' },
    { icon: UserGroupIcon, value: '10K+', label: 'Readers' },
    { icon: ChartBarIcon, value: '95%', label: 'Satisfaction' },
  ];

  if (isLoading) {
    return <LoadingSpinner message="Loading featured content..." />;
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}03 100%)`,
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  Where Stories
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    {' '}Come Alive
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: 500,
                  }}
                >
                  Discover contemporary literature, poetry, and essays that challenge perspectives 
                  and celebrate the art of storytelling.
                </Typography>
              </motion.div>

              {/* Stats Section */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <IconComponent
                            style={{
                              color: theme.palette.primary.main,
                              width: 20,
                              height: 20
                            }}
                          />
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/category/fiction"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    Explore Fiction
                  </Button>
                  <Button
                    component={Link}
                    to="/submit"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    Submit Your Work
                  </Button>
                </Box>
              </motion.div>
            </Box>

            {/* Featured Post Preview */}
            {!isMobile && featuredPosts && featuredPosts.length > 0 && (
              <Box sx={{ width: { xs: '100%', md: '55%' } }}>
                <motion.div variants={itemVariants}>
                  <Box sx={{ position: 'relative' }}>
                    <Paper
                      elevation={8}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
                        border: 1,
                        borderColor: 'divider',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: '12px 12px 0 0',
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 600,
                          mb: 2,
                          color: 'primary.main',
                        }}
                      >
                        Featured Story
                      </Typography>
                      <CompactPostCard post={featuredPosts[0]} variant="large" />
                    </Paper>
                  </Box>
                </motion.div>
              </Box>
            )}
          </Box>
        </motion.div>
      </Container>

      {/* Enhanced Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.tertiary?.main}20)`,
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
          filter: 'blur(30px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.warning.main}10, ${theme.palette.info.main}10)`,
          filter: 'blur(20px)',
        }}
      />
    </Box>
  );
};

export default HeroSection;