import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services/contentService';
import PostCard from '../post/PostCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedPosts: React.FC = () => {
  const { data: featuredPosts, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => contentService.getFeaturedPosts(3),
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading featured posts..." />;
  }

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 1,
              }}
            >
              Featured Stories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Handpicked articles that showcase the best of contemporary literature
            </Typography>
          </Box>
          
          <Button
            component={Link}
            to="/category/fiction"
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{ borderRadius: 2 }}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={4}>
          {featuredPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedPosts;