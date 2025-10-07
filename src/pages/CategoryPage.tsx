import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Pagination,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';
import PostCard from '../components/post/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Add mapping for new categories
const CATEGORY_TITLES: Record<string, string> = {
  'think-pieces': 'Think-pieces',
  'short-stories': 'Short stories',
  'poetry': 'Poetry',
  'real-life': 'Real Life',
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  const { data: category } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => contentService.getCategory(slug!),
    enabled: !!slug,
  });

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['categoryPosts', slug, page],
    queryFn: () => contentService.getPosts(
      { page, limit: postsPerPage },
      { category: slug }
    ),
    enabled: !!slug,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading category..." />;
  }

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Category Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The category you're looking for doesn't exist.
        </Typography>
        <Button onClick={() => navigate('/')} variant="contained">
          Return Home
        </Button>
      </Container>
    );
  }

  const totalPages = postsData ? Math.ceil(postsData.total / postsPerPage) : 0;

  return (
    <>
      <Helmet>
        <title>{`${category.name} - Mokua Literary Blog`}</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} - Mokua Literary Blog`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Back to Home
        </Button>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
              color: category.color,
            }}
          >
            {category.name}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, lineHeight: 1.6 }}
          >
            {category.description}
          </Typography>
          {postsData && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {postsData.total} {postsData.total === 1 ? 'article' : 'articles'}
            </Typography>
          )}
        </Box>

        {postsData && postsData.posts.length > 0 ? (
          <>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {postsData.posts.map((post) => (
                <Grid item xs={12} sm={6} lg={4} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>

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
              No articles found in this category yet.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CategoryPage;