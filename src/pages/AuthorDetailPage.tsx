import React from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Twitter, Instagram, LinkedIn, Language, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { contentService } from '../services/contentService';
import CompactPostCard from '../components/home/CompactPostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: author, isLoading: authorLoading } = useQuery({
    queryKey: ['author', slug],
    queryFn: () => contentService.getAuthor(slug!),
    enabled: !!slug,
  });

  const { data: authorPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['authorPosts', slug],
    queryFn: () => contentService.getPostsByAuthor(slug!),
    enabled: !!slug,
  });

  if (authorLoading) {
    return <LoadingSpinner message="Loading voice profile..." />;
  }

  if (!author) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Voice Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The voice you're looking for doesn't exist.
        </Typography>
        <Button onClick={() => navigate('/authors')} variant="contained">
          View All Voices
        </Button>
      </Container>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter />;
      case 'instagram': return <Instagram />;
      case 'linkedin': return <LinkedIn />;
      case 'website': return <Language />;
      default: return <Language />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${author.name} - Voice Profile | Mokua Youth Platform`}</title>
        <meta name="description" content={author.bio} />
        <meta property="og:title" content={`${author.name} - Voice Profile`} />
        <meta property="og:description" content={author.bio} />
        <meta property="og:type" content="profile" />
        {author.avatar && <meta property="og:image" content={author.avatar} />}
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/authors')}
          sx={{ mb: 4 }}
        >
          Back to Voices
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={author.avatar}
                    alt={author.name}
                    sx={{
                      width: { xs: 150, md: 200 },
                      height: { xs: 150, md: 200 },
                      mx: 'auto',
                      mb: 2,
                      boxShadow: 4,
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={9}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {author.name}
                </Typography>
                
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {author.bio}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {author.postsCount} {author.postsCount === 1 ? 'story' : 'stories'}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {author.socialLinks.map((link) => (
                      <IconButton
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        size="small"
                      >
                        {getSocialIcon(link.platform)}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 6 }} />

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Stories by {author.name}
          </Typography>
        </Box>

        {postsLoading ? (
          <LoadingSpinner message="Loading stories..." />
        ) : authorPosts && authorPosts.length > 0 ? (
          <Grid container spacing={4}>
            {authorPosts.map((post, index) => (
              <Grid item xs={12} sm={6} lg={4} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CompactPostCard post={post} variant="medium" showExcerpt />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No stories published yet.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default AuthorDetailPage;