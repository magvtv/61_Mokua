import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  useTheme,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { formatDate, getReadFullLabel } from '../../utils';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
            image={post.featuredImage}
            alt={post.title}
            sx={{
              width: '100%',
              height: { xs: featured ? 220 : 180, md: featured ? 320 : 220 },
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={post.category.name}
              size="small"
              sx={{
                bgcolor: post.category.color,
                color: 'white',
                mb: 1,
              }}
            />
          </Box>
          
          <Typography
            variant={featured ? 'h4' : 'h6'}
            component="h2"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              '-webkit-line-clamp': featured ? 3 : 2,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              '-webkit-line-clamp': featured ? 4 : 3,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
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
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="caption" color="text.primary" sx={{ fontWeight: 500 }}>
                  {post.author.name}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  {formatDate(post.publishedAt)}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              {post.readingTime} min read
            </Typography>
          </Box>

          <Button
            component="span"
            variant="contained"
            size="small"
            endIcon={<ArrowForward />}
            sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
          >
            {getReadFullLabel(post.category.slug)}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostCard;