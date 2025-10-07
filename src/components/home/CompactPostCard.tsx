import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import { BookmarkBorder, AccessTime, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { formatDate } from '../../utils';

interface CompactPostCardProps {
  post: Post;
  variant?: 'small' | 'medium' | 'large';
  showExcerpt?: boolean;
}

const CompactPostCard: React.FC<CompactPostCardProps> = ({
  post,
  variant = 'medium',
  showExcerpt = true,
}) => {
  const theme = useTheme();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const cardVariants = {
    small: {
      imageHeight: 180,
      titleLines: 2,
      excerptLines: 2,
      padding: 2,
    },
    medium: {
      imageHeight: 220,
      titleLines: 2,
      excerptLines: 3,
      padding: 2.5,
    },
    large: {
      imageHeight: 280,
      titleLines: 3,
      excerptLines: 4,
      padding: 3,
    },
  };

  const config = cardVariants[variant];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      style={{ height: '100%' }}
    >
      <Card
        component={Link}
        to={`/post/${post.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 'none',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: 'relative',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          '&:hover': {
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            '& .post-image': {
              transform: 'scale(1.05)',
            },
            '& .post-overlay': {
              opacity: 1,
            },
          },
          transition: theme.transitions.create(['box-shadow', 'border-color']),
        }}
      >
        {/* Image Section */}
        {post.featuredImage && (
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={post.featuredImage}
              alt={post.title}
              className="post-image"
              sx={{
                height: config.imageHeight,
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
            
            {/* Gradient Overlay */}
            {post.category?.name && (
            <Box
              className="post-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to bottom, ${alpha('#000', 0)} 0%, ${alpha('#000', 0.6)} 100%)`,
                opacity: 0,
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'flex-end',
                p: 2,
              }}
            >
              <Chip
                label={post.category?.name}
                size="small"
                sx={{
                  bgcolor: alpha(post.category?.color || theme.palette.primary.main, 0.9),
                  color: '#fff',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                }}
              />
            </Box>
            )}

            {/* Featured Badge */}
            {post.featured && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  bgcolor: alpha(theme.palette.warning.main, 0.95),
                  color: '#fff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <TrendingUp sx={{ fontSize: 14 }} />
                Featured
              </Box>
            )}

            {/* Bookmark Button */}
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                setIsBookmarked(!isBookmarked);
              }}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: alpha('#fff', 0.9),
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: '#fff',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
              size="small"
            >
              <BookmarkBorder 
                sx={{ 
                  fontSize: 18,
                  color: isBookmarked ? theme.palette.primary.main : 'text.secondary'
                }} 
              />
            </IconButton>
          </Box>
        )}
        
        {/* Content Section */}
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: config.padding,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Category & Reading Time */}
          {!post.featuredImage && post.category?.name && (
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={post.category?.name}
                size="small"
                sx={{
                  bgcolor: alpha(post.category?.color || theme.palette.primary.main, 0.1),
                  color: post.category?.color || theme.palette.primary.main,
                  fontWeight: 600,
                }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {post.readingTime} min read
            </Typography>
          </Box>
          
          {/* Title */}
          <Typography
            variant={variant === 'small' ? 'h6' : variant === 'large' ? 'h5' : 'h6'}
            component="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              lineHeight: 1.3,
              display: '-webkit-box',
              '-webkit-line-clamp': config.titleLines,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              mb: showExcerpt ? 1.5 : 2,
              color: 'text.primary',
              fontSize: variant === 'small' ? '1.1rem' : variant === 'large' ? '1.5rem' : '1.25rem',
            }}
          >
            {post.title}
          </Typography>
          
          {/* Excerpt */}
          {showExcerpt && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                '-webkit-line-clamp': 2,
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
                lineHeight: 1.6,
                fontSize: variant === 'large' ? '0.95rem' : '0.875rem',
              }}
            >
              {post.excerpt && post.excerpt.length > 50
                ? `${post.excerpt.slice(0, 50)}…`
                : post.excerpt}
            </Typography>
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && variant !== 'small' && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
              {post.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 22,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                />
              ))}
            </Box>
          )}
          
          {/* Author */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 'auto',
              pt: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              sx={{ 
                width: variant === 'small' ? 32 : 36, 
                height: variant === 'small' ? 32 : 36, 
                mr: 1.5,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: variant === 'small' ? '0.8rem' : '0.875rem',
                  color: 'text.primary',
                  mb: 0.25,
                }}
              >
                {post.author.name}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{
                  fontSize: '0.75rem',
                }}
              >
                {formatDate(post.publishedAt)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompactPostCard;