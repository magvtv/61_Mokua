import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
} from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { contentService } from '../services/contentService';
import PostCard from '../components/post/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAppStore } from '../stores/useAppStore';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useAppStore();
  
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: contentService.getCategories,
  });

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['searchPosts', localQuery, selectedCategory, page],
    queryFn: () => contentService.getPosts(
      { page, limit: postsPerPage },
      {
        query: localQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
      }
    ),
    enabled: localQuery.length > 0,
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setLocalQuery(query);
      setSearchQuery(query);
    }
  }, [searchParams, setSearchQuery]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery });
      setPage(1);
    }
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    setSearchParams({});
    setSearchQuery('');
    setSelectedCategory('all');
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages = postsData ? Math.ceil(postsData.total / postsPerPage) : 0;

  return (
    <>
      <Helmet>
        <title>{localQuery ? `Search: ${localQuery} - Mokua Literary Blog` : 'Search - Mokua Literary Blog'}</title>
        <meta
          name="description"
          content={localQuery ? `Search results for "${localQuery}"` : 'Search articles, authors, and topics on Mokua Literary Blog'}
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 3,
              textAlign: 'center',
            }}
          >
            Search Articles
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
          >
            <TextField
              fullWidth
              placeholder="Search articles, authors, topics..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: localQuery && (
                  <InputAdornment position="end">
                    <Button onClick={handleClearSearch} size="small">
                      <Clear />
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.slug}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!localQuery.trim()}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>

          {localQuery && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {postsData ? (
                  <>
                    Found {postsData.total} {postsData.total === 1 ? 'result' : 'results'} for{' '}
                    <Chip label={`"${localQuery}"`} size="small" />
                    {selectedCategory !== 'all' && (
                      <>
                        {' '}in{' '}
                        <Chip
                          label={categories?.find(c => c.slug === selectedCategory)?.name}
                          size="small"
                          color="primary"
                        />
                      </>
                    )}
                  </>
                ) : (
                  `Searching for "${localQuery}"...`
                )}
              </Typography>
            </Box>
          )}
        </Box>

        {isLoading ? (
          <LoadingSpinner message="Searching..." />
        ) : localQuery && postsData ? (
          postsData.posts.length > 0 ? (
            <>
              <Grid container spacing={4} sx={{ mb: 6 }}>
                {postsData.posts.map((post, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No results found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or browse our categories
              </Typography>
            </Box>
          )
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Enter a search term to find articles
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SearchPage;