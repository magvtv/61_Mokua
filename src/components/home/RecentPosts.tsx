import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Pagination,
  Tabs,
  Tab,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services/contentService';
import CompactPostCard from './CompactPostCard';
import LoadingSpinner from '../common/LoadingSpinner';

const RecentPosts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const postsPerPage = 9; // Increased to show more posts

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: contentService.getCategories,
  });

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', page, categoryFilter],
    queryFn: () => contentService.getPosts(
      { page, limit: postsPerPage },
      categoryFilter !== 'all' ? { category: categoryFilter } : undefined
    ),
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setCategoryFilter(newValue);
    setPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading recent posts..." />;
  }

  const totalPages = postsData ? Math.ceil(postsData.total / postsPerPage) : 0;

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            mb: 1,
            textAlign: 'center',
          }}
        >
          Latest Articles
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', mb: 6 }}
        >
          Stay updated with our newest literary content and insights
        </Typography>

        {categories && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
            <Tabs
              value={categoryFilter}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 500,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="All" value="all" />
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.slug}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {postsData && postsData.posts.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}>
              {postsData.posts.map((post) => (
                <Box sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }} key={post.id}>
                  <CompactPostCard post={post} variant="small" />
                </Box>
              ))}
            </Box>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts found in this category
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RecentPosts;