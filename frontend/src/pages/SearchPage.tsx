import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
  alpha,
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
  const { setSearchQuery } = useAppStore();
  
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
    enabled: true,
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

      {/* Hero Section */}
      <Box
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}08 100%)`,
          borderBottom: 1,
          borderColor: 'divider',
        })}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                lineHeight: { xs: 1.2, md: 1.15 },
                mb: { xs: 1.5, md: 2 },
                textAlign: 'center',
              }}
            >
              Search Articles
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 560,
                mx: 'auto',
                lineHeight: 1.6,
                textAlign: 'center',
                px: { xs: 2, md: 0 },
                fontSize: { xs: '0.95rem', md: '1.0625rem' },
              }}
            >
              Find articles, authors, and topics across our literary collection.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Search form card */}
          <Card
            elevation={0}
            sx={(theme) => ({
              p: { xs: 2.5, sm: 3, md: 3.5 },
              mb: 4,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.06)}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                opacity: 0.9,
              },
            })}
          >
            <Box component="form" onSubmit={handleSearch} sx={{ pl: { xs: 1.5, sm: 2 } }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  maxWidth: 720,
                  mx: 'auto',
                }}
              >
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="Search articles, authors, topics..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: localQuery && (
                      <InputAdornment position="end">
                        <Button onClick={handleClearSearch} size="small" aria-label="Clear search">
                          <Clear fontSize="small" />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: (t) => alpha(t.palette.primary.main, 0.02),
                      '&.Mui-focused': { bgcolor: 'background.paper' },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <FormControl size="medium" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                    <InputLabel id="search-category-label">Category</InputLabel>
                    <Select
                      labelId="search-category-label"
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
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!localQuery.trim()}
                    sx={(theme) => ({
                      width: { xs: '100%', sm: 'auto' },
                      px: { xs: 2, md: 3 },
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                      '&:hover': {
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                    })}
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Results summary */}
          {localQuery && (
            <Box
              sx={{
                textAlign: { xs: 'center', sm: 'left' },
                mb: 3,
                px: { xs: 1, sm: 0 },
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                {postsData ? (
                  <>
                    <span>
                      Found {postsData.total} {postsData.total === 1 ? 'result' : 'results'} for
                    </span>
                    <Chip label={`"${localQuery}"`} size="small" sx={{ fontWeight: 500 }} />
                    {selectedCategory !== 'all' && (
                      <>
                        <span>in</span>
                        <Chip
                          label={categories?.find(c => c.slug === selectedCategory)?.name}
                          size="small"
                          color="primary"
                          variant="outlined"
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

          {isLoading ? (
            <Box sx={{ py: { xs: 6, md: 8 } }}>
              <LoadingSpinner message={localQuery ? 'Searching...' : 'Loading posts...'} />
            </Box>
          ) : postsData && postsData.posts.length > 0 ? (
            <>
              {!localQuery && (
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, mb: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {postsData.total} {postsData.total === 1 ? 'article' : 'articles'}
                    {selectedCategory !== 'all' && categories?.find(c => c.slug === selectedCategory) && (
                      <> in {categories.find(c => c.slug === selectedCategory)?.name}</>
                    )}
                  </Typography>
                </Box>
              )}
              <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} sx={{ mb: 5 }}>
                {postsData.posts.map((post, index) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      style={{ height: '100%' }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="medium"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPagination-item': { fontSize: { xs: '0.875rem', sm: '1rem' } },
                    }}
                  />
                </Box>
              )}
            </>
          ) : postsData && postsData.posts.length === 0 ? (
            <Card
              elevation={0}
              sx={(theme) => ({
                textAlign: 'center',
                py: { xs: 6, md: 8 },
                px: 3,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              })}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                No results found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                {localQuery
                  ? 'Try adjusting your search terms or browse our categories.'
                  : 'No articles match the selected category.'}
              </Typography>
            </Card>
          ) : (
            <Card
              elevation={0}
              sx={(theme) => ({
                textAlign: 'center',
                py: { xs: 6, md: 8 },
                px: 3,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              })}
            >
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                Enter a search term to find articles
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Use the search box above to explore by keyword, author, or topic.
              </Typography>
            </Card>
          )}
        </motion.div>
      </Container>
    </>
  );
};

export default SearchPage;