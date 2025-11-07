import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
// import Grid from '@mui/material/Grid';

import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services/contentService';
import CompactPostCard from './CompactPostCard';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedPosts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: featuredPosts, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => contentService.getFeaturedPosts(6),
  });

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!featuredPosts) return [];
    if (!selectedCategory) return featuredPosts;
    return featuredPosts.filter(post => post.category.slug === selectedCategory);
  }, [featuredPosts, selectedCategory]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    if (!featuredPosts) return [];
    const uniqueCategories = new Map();
    featuredPosts.forEach(post => {
      if (!uniqueCategories.has(post.category.slug)) {
        uniqueCategories.set(post.category.slug, {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          color: post.category.color,
          count: featuredPosts.filter(p => p.category.slug === post.category.slug).length,
        });
      }
    });
    return Array.from(uniqueCategories.values());
  }, [featuredPosts]);

  if (isLoading) {
    return <LoadingSpinner message="Loading featured posts..." />;
  }

  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
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
            to="/"
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{ borderRadius: 2 }}
          >
            View All
          </Button>
        </Box>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Posts Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, minmax(0, 1fr))',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))',
            },
            gap: { xs: 3, md: 3.5 },
          }}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <CompactPostCard post={post} variant="medium" />
            </motion.div>
          ))}
        </Box>

        {/* No results message */}
        {filteredPosts.length === 0 && selectedCategory && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No posts found in this category
            </Typography>
            <Button
              onClick={() => setSelectedCategory(null)}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              View All Categories
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedPosts;