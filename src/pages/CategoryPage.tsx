import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Pagination,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';
import PostCard from '../components/post/PostCard';
import CompactPostCard from '../components/home/CompactPostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const postsPerPage = 10; // Balanced number for grid layout

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
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  
  // Get the featured post (first post) and remaining posts
  const featuredPost = postsData?.posts[0];
  const remainingPosts = postsData?.posts.slice(1);

  return (
    <>
      <Helmet>
        <title>{`${category.name} - Mokua Youth Platform`}</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} - Mokua Youth Platform`} />
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

        <Box sx={{ mb: 4 }}>
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
            sx={{ maxWidth: 800, lineHeight: 1.6 }}
          >
            {category.description}
          </Typography>
          {postsData && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {postsData.total} {postsData.total === 1 ? 'story' : 'stories'}
            </Typography>
          )}
        </Box>

        {postsData && postsData.posts.length > 0 ? (
          <>
            {/* Featured Article Section */}
            {featuredPost && (
              <Box sx={{ mb: 5 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
                    <Box>
                      <PostCard post={featuredPost} featured />
                    </Box>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 2, 
                          fontWeight: 600,
                          borderBottom: '2px solid',
                          borderColor: category.color,
                          pb: 1,
                          display: 'inline-block'
                        }}
                      >
                        Top Story
                      </Typography>
                      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        {featuredPost.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {featuredPost.excerpt}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate(`/post/${featuredPost.slug}`)}
                        sx={{ mt: 2 }}
                      >
                        Read Full Story
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            )}

            <Divider sx={{ mb: 4 }} />

            {/* Latest News Section */}
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                borderBottom: '2px solid',
                borderColor: category.color,
                pb: 1,
                display: 'inline-block'
              }}
            >
              Latest {category.name}
            </Typography>

            {/* News Grid */}
            <Grid container spacing={3} sx={{ mb: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
              {/* Featured posts with larger cards */}
              {remainingPosts?.slice(0, 4).map((post) => (
                <Box key={post.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 2' }, mb: 3 }}>
                  <CompactPostCard post={post} variant="medium" showExcerpt={true} />
                </Box>
              ))}
              
              {/* Smaller cards in a more compact layout */}
              {remainingPosts?.slice(4).map((post) => (
                <Box key={post.id} sx={{ gridColumn: 'span 1', mb: 3 }}>
                  <CompactPostCard post={post} variant="small" showExcerpt={false} />
                </Box>
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
                  sx={{ mb: 4 }}
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No stories found in this category yet.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CategoryPage;