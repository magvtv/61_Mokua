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
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { formatDate } from '../../utils';

interface CompactPostCardProps {
  post: Post;
  imagePosition?: 'left' | 'top';
  size?: 'small' | 'medium';
  showExcerpt?: boolean;
}

const CompactPostCard: React.FC<CompactPostCardProps> = ({
  post,
  imagePosition = 'left',
  size = 'medium',
  showExcerpt = true,
}) => {
  const theme = useTheme();
  const isLeftImage = imagePosition === 'left';
  const isSmall = size === 'small';

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card
        component={Link}
        to={`/post/${post.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: isLeftImage ? 'row' : 'column',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 'none',
          border: '1px solid',
          borderColor: theme.palette.divider,
          '&:hover': {
            boxShadow: theme.shadows[2],
            borderColor: 'transparent',
            transform: 'translateY(-4px)',
          },
          transition: theme.transitions.create(['box-shadow']),
        }}
      >
        {post.featuredImage && (
          <CardMedia
            component="img"
            image={post.featuredImage}
            alt={post.title}
            sx={{
              width: isLeftImage ? { xs: 100, sm: isSmall ? 90 : 130 } : '100%',
              height: isLeftImage 
                ? '100%' 
                : { xs: 130, sm: isSmall ? 110 : 150 },
              objectFit: 'cover',
            }}
          />
        )}
        
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: isSmall ? 1.5 : 2,
            width: isLeftImage ? { xs: 'calc(100% - 100px)', sm: isSmall ? 'calc(100% - 90px)' : 'calc(100% - 130px)' } : '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isLeftImage ? 'center' : 'flex-start',
          }}
        >
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={post.category.name}
              size="small"
              sx={{
                              bgcolor: `${post.category.color}30`,
              color: post.category.color,
              fontWeight: 600,
                height: isSmall ? 20 : 24,
                fontSize: isSmall ? '0.65rem' : '0.75rem',
                '& .MuiChip-label': {
                  px: isSmall ? 0.8 : 1.2,
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {post.readingTime} min
            </Typography>
          </Box>
          
          <Typography
            variant={isSmall ? 'subtitle2' : 'subtitle1'}
            component="h3"
            gutterBottom
            sx={{
              fontFamily: '"EB Garamond", serif',
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              '-webkit-line-clamp': 2,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              mb: showExcerpt ? 1 : 2,
            }}
          >
            {post.title}
          </Typography>
          
          {showExcerpt && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: '-webkit-box',
                '-webkit-line-clamp': isSmall ? 2 : 3,
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
                fontSize: isSmall ? '0.75rem' : '0.875rem',
              }}
            >
              {post.excerpt}
            </Typography>
          )}
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 'auto',
            }}
          >
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              sx={{ width: isSmall ? 24 : 28, height: isSmall ? 24 : 28, mr: 1 }}
            />
            <Box>
              <Typography 
                variant="caption" 
                color="text.primary" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: isSmall ? '0.65rem' : '0.75rem',
                  display: 'block',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }
                }}
              >
                {post.author.name}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{
                  fontSize: isSmall ? '0.6rem' : '0.7rem',
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