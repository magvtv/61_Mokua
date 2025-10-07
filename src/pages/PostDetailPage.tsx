import React from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Button,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Skeleton } from '@mui/material';
import {
  Share,
  Facebook,
  Twitter,
  LinkedIn,
  ArrowBack,
} from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';
import { formatDate } from '../utils';
// LoadingSpinner no longer used after skeletons
import PostCard from '../components/post/PostCard';
import BackToTop from '../components/common/BackToTop';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Extract headers from content for table of contents
  const extractHeaders = (content: string) => {
    const headers: {id: string; text: string; level: number}[] = [];
    const paragraphs = content?.split('\n\n') || [];
    
    paragraphs.forEach((paragraph, idx) => {
      if (paragraph.startsWith('# ')) {
        headers.push({id: `section-${idx}`, text: paragraph.replace('# ', ''), level: 1});
      } else if (paragraph.startsWith('## ')) {
        headers.push({id: `section-${idx}`, text: paragraph.replace('## ', ''), level: 2});
      }
    });
    
    return headers;
  };

  // Scroll to section when clicking on TOC item
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => contentService.getPost(slug!),
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['relatedPosts', post?.id],
    queryFn: () => contentService.getRelatedPosts(post!.id),
    enabled: !!post?.id,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width="60%" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 2, mb: 4 }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Article Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The article you're looking for doesn't exist or has been moved.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Return Home
        </Button>
      </Container>
    );
  }

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    } else {
      navigator.share?.({ title: post.title, text: post.excerpt, url });
    }
  };

  return (
    <>
      <BackToTop />
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} | Mokua Literary Blog`}</title>
        <meta
          name="description"
          content={post.seo?.metaDescription || post.excerpt}
        />
        <meta
          name="keywords"
          content={post.seo?.keywords?.join(', ') || post.tags.join(', ')}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}
        <meta property="article:author" content={post.author.name} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:section" content={post.category.name} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4 }}
        >
          Back to Articles
        </Button>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: isDesktop ? '2fr 1fr' : '1fr' }, gap: 4 }}>
          {/* Main content */}
          <Box>
            <Box sx={{ mb: 4 }}>
          <Chip
            label={post.category.name}
            sx={{
              bgcolor: post.category.color,
              color: 'white',
              mb: 3,
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            {post.excerpt}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography
                  component={Link}
                  to={`/author/${post.author.slug}`}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(post.publishedAt)} • {post.readingTime} min read
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={() => handleShare('twitter')} size="small">
                <Twitter />
              </IconButton>
              <IconButton onClick={() => handleShare('facebook')} size="small">
                <Facebook />
              </IconButton>
              <IconButton onClick={() => handleShare('linkedin')} size="small">
                <LinkedIn />
              </IconButton>
              <IconButton onClick={() => handleShare()} size="small">
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {post.featuredImage && (
          <Box
            sx={{
              mb: 6,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
              maxWidth: 960,
              mx: 'auto'
            }}
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '360px',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          </Box>
        )}

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            fontSize: '1.125rem',
            '& p': { mb: 3 },
            '& h2': {
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: '1.5rem',
              mt: 4,
              mb: 2,
              scrollMarginTop: '80px',
            },
            '& h3': {
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500,
              fontSize: '1.25rem',
              mt: 3,
              mb: 1.5,
              scrollMarginTop: '80px',
            },
            mb: 6,
          }}
        >
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return (
                <Typography 
                  key={index} 
                  variant="h2" 
                  id={`section-${index}`}
                  sx={{ scrollMarginTop: '80px' }}
                >
                  {paragraph.replace('# ', '')}
                </Typography>
              );
            } else if (paragraph.startsWith('## ')) {
              return (
                <Typography 
                  key={index} 
                  variant="h3" 
                  id={`section-${index}`}
                  sx={{ scrollMarginTop: '80px' }}
                >
                  {paragraph.replace('## ', '')}
                </Typography>
              );
            } else {
              return (
                <Typography key={index} paragraph>
                  {paragraph}
                </Typography>
              );
            }
          })}
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                size="small"
                component={Link}
                to={`/search?q=${encodeURIComponent(tag)}`}
                clickable
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Author credentials block */}
        <Box sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 6
        }}>
          <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 56, height: 56 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              component={Link}
              to={`/author/${post.author.slug}`}
              variant="subtitle1"
              sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, '&:hover': { color: 'primary.main' } }}
            >
              {post.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {post.author.bio}
            </Typography>
          </Box>
        </Box>

        {relatedPosts && relatedPosts.length > 0 && (
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 4,
              }}
            >
              Related Articles
            </Typography>
            <Box 
              sx={{ 
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, minWidth: 'max-content' }}>
                {relatedPosts.map((relatedPost) => (
                  <Box key={relatedPost.id} sx={{ minWidth: '300px', maxWidth: '350px' }}>
                    <PostCard post={relatedPost} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

          {/* close main column */}
          </Box>

          {/* Table of Contents - Only visible on desktop */}
          {isDesktop && post && extractHeaders(post.content).length > 0 && (
            <Box>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  position: 'sticky', 
                  top: 24, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  maxHeight: 'calc(100vh - 48px)',
                  overflow: 'auto',
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Table of Contents
                </Typography>
                <List dense>
                  {extractHeaders(post.content).map((header) => (
                <ListItemButton
                  key={header.id}
                  sx={{ pl: header.level === 1 ? 1 : 3, py: 0.5 }}
                  onClick={() => scrollToSection(header.id)}
                >
                  <ListItemText
                    primary={header.text}
                    primaryTypographyProps={{
                      variant: header.level === 1 ? 'subtitle1' : 'body2',
                      fontWeight: header.level === 1 ? 500 : 400,
                    }}
                  />
                </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default PostDetailPage;