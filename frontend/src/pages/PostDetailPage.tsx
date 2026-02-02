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
import OverlayPostCard from '../components/home/OverlayPostCard';
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
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
        <Skeleton variant="text" height={56} sx={{ mb: 2, width: { xs: '90%', sm: '60%' } }} />
        <Skeleton variant="text" width="100%" height={28} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={{ xs: 220, sm: 280, md: 360 }} sx={{ borderRadius: 2, mb: 4, width: '100%' }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 2 }, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
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

      <Container
        maxWidth="lg"
        disableGutters={false}
        sx={{
          px: { xs: 2, sm: 2, md: 3 },
          py: { xs: 3, md: 4 },
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: { xs: 2, md: 4 },
            fontSize: { xs: '0.875rem', md: '1rem' },
            px: { xs: 0 },
            minHeight: 40,
          }}
        >
          Back to Articles
        </Button>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: { xs: 3, md: 4 } }}>
          {/* Main content */}
          <Box sx={{ minWidth: 0, maxWidth: '100%' }}>
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
              fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.75rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              lineHeight: 1.25,
              mb: { xs: 2, md: 3 },
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.125rem' },
              mb: { xs: 3, md: 4 },
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {post.excerpt}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: { xs: 1.5, sm: 2 },
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 }, flexShrink: 0 }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component={Link}
                  to={`/author/${post.author.slug}`}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'text.primary',
                    fontSize: { xs: '0.9375rem', sm: '1rem' },
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                  {formatDate(post.publishedAt)} • {post.readingTime} min read
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={() => handleShare('twitter')} size="small" sx={{ p: { xs: 0.75, sm: 1 } }}>
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleShare('facebook')} size="small" sx={{ p: { xs: 0.75, sm: 1 } }}>
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleShare('linkedin')} size="small" sx={{ p: { xs: 0.75, sm: 1 } }}>
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleShare()} size="small" sx={{ p: { xs: 0.75, sm: 1 } }}>
                <Share fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {post.featuredImage && (
          <Box
            sx={{
              mb: { xs: 4, md: 6 },
              borderRadius: { xs: 1.5, md: 2 },
              overflow: 'hidden',
              boxShadow: 2,
              width: '100%',
              maxWidth: 960,
              mx: 'auto',
              height: { xs: 220, sm: 280, md: 360 },
            }}
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
            />
          </Box>
        )}

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.85,
            fontSize: { xs: '1rem', sm: '1.05rem', md: '1.125rem' },
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            '& p': { mb: 3, wordBreak: 'break-word', overflowWrap: 'break-word' },
            '& h2': {
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.5rem' },
              mt: { xs: 3, md: 4 },
              mb: { xs: 1.5, md: 2 },
              scrollMarginTop: '80px',
              wordBreak: 'break-word',
            },
            '& h3': {
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500,
              fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.25rem' },
              mt: { xs: 2.5, md: 3 },
              mb: { xs: 1.25, md: 1.5 },
              scrollMarginTop: '80px',
              wordBreak: 'break-word',
            },
            mb: { xs: 5, md: 6 },
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
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          p: { xs: 1.5, sm: 2 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 6,
        }}>
          <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }, flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component={Link}
              to={`/author/${post.author.slug}`}
              variant="subtitle1"
              sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700, fontSize: { xs: '0.9375rem', sm: '1rem' }, '&:hover': { color: 'primary.main' } }}
            >
              {post.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
                display: 'flex',
                gap: { xs: 2, md: 3 },
                overflowX: 'auto',
                overflowY: 'hidden',
                pb: 1,
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                mx: { xs: -2, sm: 0 },
                px: { xs: 2, sm: 0 },
                '& > *': { scrollSnapAlign: 'start', flex: '0 0 auto' },
              }}
            >
              {relatedPosts.map((relatedPost) => (
                <Box
                  key={relatedPost.id}
                  sx={{
                    flex: '0 0 auto',
                    width: { xs: '85vw', sm: 320 },
                    maxWidth: { sm: 360 },
                  }}
                >
                  <OverlayPostCard post={relatedPost} variant="compact" />
                </Box>
              ))}
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