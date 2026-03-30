import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Pagination,
  Button,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';
import PostCard from '../components/post/PostCard';
import CompactPostCard from '../components/home/CompactPostCard';
import SideStoryCard from '../components/post/SideStoryCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

type LayoutVariant = 'left-dominant' | 'right-dominant' | 'stacked';

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

  const posts = postsData?.posts ?? [];
  const featuredPost = posts[0];
  const sidePost = posts[1];
  const bottomRightPost = posts[2];
  const consumedPosts = bottomRightPost ? 3 : sidePost ? 2 : featuredPost ? 1 : 0;
  const remainingPosts = posts.slice(consumedPosts);

  const layoutVariant = useMemo<LayoutVariant>(() => {
    if (!slug) return 'left-dominant';
    const variants: LayoutVariant[] = ['left-dominant', 'right-dominant', 'stacked'];
    const index = slug
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % variants.length;
    return variants[index];
  }, [slug]);

  const effectiveVariant: LayoutVariant = sidePost ? layoutVariant : 'left-dominant';

  const gridSettings = useMemo(() => {
    if (!featuredPost) {
      return {};
    }

    if (!sidePost) {
      return {
        display: 'grid',
        gap: { xs: 3, md: 4 },
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"featured"',
      };
    }

    const hasThird = Boolean(bottomRightPost);
    const xsAreas = hasThird ? '"featured" "sideTop" "sideBottom"' : '"featured" "sideTop"';
    const base = {
      display: 'grid',
      gap: { xs: 3, md: 4 },
      alignItems: { md: 'stretch' as const },
    };

    if (effectiveVariant === 'right-dominant') {
      return {
        ...base,
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 2fr)' },
        gridTemplateRows: {
          xs: hasThird ? 'repeat(3, auto)' : 'repeat(2, auto)',
          md: hasThird ? 'auto auto' : 'auto',
        },
        gridTemplateAreas: {
          xs: xsAreas,
          md: hasThird
            ? '"sideTop featured" "sideBottom featured"'
            : '"sideTop featured"',
        },
      };
    }

    if (effectiveVariant === 'stacked' && hasThird) {
      return {
        ...base,
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
        gridTemplateRows: { xs: 'repeat(3, auto)', md: 'auto auto' },
        gridTemplateAreas: {
          xs: xsAreas,
          md: '"featured featured" "sideTop sideBottom"',
        },
      };
    }

    // default left-dominant
    return {
      ...base,
      gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 2fr) minmax(0, 1.1fr)' },
      gridTemplateRows: {
        xs: hasThird ? 'repeat(3, auto)' : 'repeat(2, auto)',
        md: hasThird ? 'auto auto' : 'auto',
      },
      gridTemplateAreas: {
        xs: xsAreas,
        md: hasThird
          ? '"featured sideTop" "featured sideBottom"'
          : '"featured sideTop"',
      },
    };
  }, [featuredPost, sidePost, bottomRightPost, effectiveVariant]);

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
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: { xs: 1.5, md: 2 },
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
                <Box sx={gridSettings}>
                  <Box sx={{ gridArea: 'featured', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <PostCard post={featuredPost} featured />
                  </Box>

                  {sidePost && (
                    <Box sx={{ gridArea: 'sideTop', display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <SideStoryCard post={sidePost} accentColor={category.color} />
                    </Box>
                  )}

                  {bottomRightPost && (
                    <Box
                      sx={{
                        gridArea: 'sideBottom',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <CompactPostCard post={bottomRightPost} variant="small" showExcerpt={false} />
                    </Box>
                  )}
                </Box>
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