import React from 'react';
import { Card, CardContent, CardMedia, Box, Typography, Button, alpha, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { getReadFullLabel } from '../../utils';

interface SideStoryCardProps {
  post: Post;
  accentColor?: string;
}

const SideStoryCard: React.FC<SideStoryCardProps> = ({ post, accentColor }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, 0.08)}`,
      }}
    >
      {post.featuredImage && (
        <CardMedia
          component="img"
          image={post.featuredImage}
          alt={post.title}
          sx={{
            height: 180,
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
        {post.category?.name && (
          <Typography
            variant="overline"
            sx={{
              display: 'inline-block',
              mb: 1,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: accentColor || theme.palette.primary.main,
            }}
          >
            {post.category.name}
          </Typography>
        )}

        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {post.title}
        </Typography>

        {post.excerpt && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.excerpt}
          </Typography>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Button
            component={Link}
            to={`/post/${post.slug}`}
            size="small"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{ borderRadius: 2 }}
          >
            {getReadFullLabel(post.category?.slug)}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SideStoryCard;


