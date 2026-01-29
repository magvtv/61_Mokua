import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import { Twitter, Instagram, LinkedIn, Language } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';
import { contentService } from '../services/contentService';

const AuthorsPage: React.FC = () => {
  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: contentService.getAuthors,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Skeleton variant="text" width="40%" height={48} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                <Skeleton variant="text" width="40%" sx={{ mx: 'auto' }} />
              </Box>
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} />
            </Card>
          ))}
        </Box>
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
        <title>Our Voices - Mokua Youth Platform</title>
        <meta
          name="description"
          content="Meet the passionate Kenyan voices covering youth affairs, county news, health issues, and social trends affecting Gen Z across Kenya."
        />
        <meta property="og:title" content="Our Voices - Mokua Youth Platform" />
        <meta
          property="og:description"
          content="Meet the passionate Kenyan voices covering youth affairs, county news, health issues, and social trends affecting Gen Z across Kenya."
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Our Voices
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Meet the passionate Kenyan voices covering youth affairs, county news, 
            health issues, and social trends affecting Gen Z across Kenya's 47 counties.
          </Typography>
        </Box>

        {authors && authors.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
            {authors.map((author, index) => (
              <Box key={author.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 8,
                        transform: 'translateY(-4px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Avatar
                          src={author.avatar}
                          alt={author.name}
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            mb: 2,
                            boxShadow: 2,
                          }}
                        />
                        <Typography
                          variant="h5"
                          component={Link}
                          to={`/author/${author.slug}`}
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': { color: 'primary.main' },
                          }}
                        >
                          {author.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {author.postsCount} {author.postsCount === 1 ? 'story' : 'stories'}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          display: '-webkit-box',
                          '-webkit-line-clamp': 4,
                          '-webkit-box-orient': 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.6,
                        }}
                      >
                        {author.bio}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto',
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {author.socialLinks.map((link) => (
                            <IconButton
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              color="primary"
                            >
                              {getSocialIcon(link.platform)}
                            </IconButton>
                          ))}
                        </Box>
                        
                        <Button
                          component={Link}
                          to={`/author/${author.slug}`}
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 2 }}
                        >
                          View Profile
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No voices found.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default AuthorsPage;