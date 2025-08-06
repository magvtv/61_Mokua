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
  variant?: 'small' | 'medium' | 'large';
}

const CompactPostCard: React.FC<CompactPostCardProps> = ({ 
  post, 
  variant = 'medium' 
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'small':
        return {
          imageHeight: 140,
          titleLines: 2,
          excerptLines: 2,
          titleVariant: 'h6' as const,
        };
      case 'large':
        return {
          imageHeight: 220,
          titleLines: 3,
          excerptLines: 4,
          titleVariant: 'h5' as const,
        };
      default:
        return {
          imageHeight: 180,
          titleLines: 2,
          excerptLines: 3,
          titleVariant: 'h6' as const,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: theme.shadows[1],
          '&:hover': {
            boxShadow: theme.shadows[8],
          },
          transition: theme.transitions.create(['box-shadow']),
        }}
      >
        {post.featuredImage && (
          <CardMedia
            component="img"
            height={styles.imageHeight}
            image={post.featuredImage}
            alt={post.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1.5 }}>
            <Chip
              label={post.category.name}
              size="small"
              sx={{
                bgcolor: post.category.color,
                color: 'white',
                fontSize: '0.75rem',
              }}
            />
          </Box>
          
          <Typography
            variant={styles.titleVariant}
            component="h3"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              '-webkit-line-clamp': styles.titleLines,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mb: 1.5,
              flexGrow: 0,
            }}
          >
            {post.title}
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              '-webkit-line-clamp': styles.excerptLines,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.6,
              mb: 2,
              flexGrow: 1,
            }}
          >
            {post.excerpt}
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: 28, height: 28 }}
              />
              <Box>
                <Typography 
                  variant="caption" 
                  color="text.primary" 
                  sx={{ 
                    fontWeight: 500,
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  {post.author.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.2 }}
                >
                  {formatDate(post.publishedAt)}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              {post.readingTime} min
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompactPostCard; 