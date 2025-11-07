import React from 'react';
import { Box, Typography, Chip, IconButton, Button, alpha, useTheme } from '@mui/material';
import { BookmarkBorder, AccessTime, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { formatDate, getReadFullLabel } from '../../utils';

interface OverlayPostCardProps {
  post: Post;
}

const OverlayPostCard: React.FC<OverlayPostCardProps> = ({ post }) => {
  const theme = useTheme();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const backgroundImage = post.featuredImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box
        component={Link}
        to={`/post/${post.slug}`}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: { xs: 300, sm: 320 },
          borderRadius: 3,
          overflow: 'hidden',
          textDecoration: 'none',
          color: '#fff',
          backgroundImage: `linear-gradient(180deg, ${alpha('#0d1b2a', 0.15)} 0%, ${alpha('#0d1b2a', 0.65)} 50%, ${alpha('#0d1b2a', 0.95)} 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: `0 18px 45px ${alpha(theme.palette.common.black, 0.25)}`,
          transition: theme.transitions.create(['transform', 'box-shadow'], { duration: 220 }),
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 24px 55px ${alpha(theme.palette.common.black, 0.35)}`,
          },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {post.category?.name && (
            <Chip
              label={post.category.name}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: alpha(theme.palette.common.black, 0.4),
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            />
          )}

          <IconButton
            size="small"
            onClick={(event) => {
              event.preventDefault();
              setIsBookmarked((prev) => !prev);
            }}
            sx={{
              bgcolor: alpha('#000', 0.35),
              color: '#fff',
              '&:hover': { bgcolor: alpha('#000', 0.55) },
            }}
          >
            <BookmarkBorder sx={{ color: isBookmarked ? theme.palette.secondary.main : '#fff' }} />
          </IconButton>
        </Box>

        <Box sx={{ px: 2.5, pb: 2.75, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {post.readingTime} min read • {formatDate(post.publishedAt)}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow: '0 8px 18px rgba(0, 0, 0, 0.45)',
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: alpha('#fff', 0.9),
              lineHeight: 1.7,
              maxWidth: 520,
              textShadow: '0 6px 16px rgba(0, 0, 0, 0.45)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {post.author.name}
              </Typography>
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.75) }}>
                {post.category?.name || ''}
              </Typography>
            </Box>

            <Button
              component="span"
              variant="contained"
              size="small"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 999,
                px: 2.5,
                fontWeight: 600,
                backgroundColor: alpha('#000', 0.45),
                '&:hover': { backgroundColor: alpha('#000', 0.65) },
              }}
            >
              {getReadFullLabel(post.category?.slug)}
            </Button>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default OverlayPostCard;

