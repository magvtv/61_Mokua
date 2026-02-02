import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  alpha,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService';
import { useAppStore } from '../stores/useAppStore';

const submissionSchema = z.object({
  authorName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  content: z.string().min(500, 'Content must be at least 500 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const SubmitPage: React.FC = () => {
  const { addNotification } = useAppStore();
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: contentService.getCategories,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const contentValue = watch('content', '');
  const characterCount = contentValue.length;

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Submission form submitted:', data);
      
      addNotification({
        type: 'success',
        message: 'Thank you for your submission! We\'ll review it and get back to you within 5-7 business days.',
      });
      
      reset();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to submit your work. Please try again.',
      });
    }
  };

  const guidelines = [
    'Original, unpublished work only',
    'Fiction: 1,000-5,000 words',
    'Poetry: Up to 5 poems per submission',
    'Essays: 1,500-3,000 words',
    'Reviews: 800-1,500 words',
    'Include a brief author bio (50-150 words)',
    'Response time: 5-7 business days',
  ];

  return (
    <>
      <Helmet>
        <title>Submit Your Work - Mokua Literary Blog</title>
        <meta
          name="description"
          content="Submit your original literary work to Mokua Literary Blog. We welcome fiction, poetry, essays, and reviews from emerging and established writers."
        />
        <meta property="og:title" content="Submit Your Work - Mokua Literary Blog" />
        <meta
          property="og:description"
          content="Submit your original literary work to Mokua Literary Blog. We welcome submissions from writers worldwide."
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
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
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
              Submit Your Work
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                textAlign: 'center',
                px: { xs: 2, md: 0 },
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              Share your literary voice with our community. We welcome original fiction, poetry, essays, and reviews.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
            <Grid item xs={12} lg={12}>
              <Box sx={{ width: '100%' }}>
                <Card
                elevation={0}
                sx={(theme) => ({
                  p: { xs: 2.5, sm: 3, md: 4 },
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
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: { xs: 3, md: 4 },
                    pl: 1,
                  }}
                >
                  Submission Form
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    pl: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  {/* 1. Author information */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Author information
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        size="medium"
                        label="Author Name"
                        {...register('authorName')}
                        error={!!errors.authorName}
                        helperText={errors.authorName?.message}
                      />
                      <TextField
                        fullWidth
                        size="medium"
                        label="Email"
                        type="email"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Box>
                  </Box>

                  {/* 2. Work details */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Work details
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        size="medium"
                        label="Title"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <FormControl fullWidth size="medium" error={!!errors.category}>
                            <InputLabel id="submit-category-label">Category</InputLabel>
                            <Select
                              labelId="submit-category-label"
                              label="Category"
                              value={field.value || ''}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              inputRef={field.ref}
                            >
                              {categories?.map((category) => (
                                <MenuItem key={category.id} value={category.slug}>
                                  {category.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.category && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }} role="alert">
                                {errors.category.message}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Box>

                  {/* 3. Your work */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Your work
                    </Typography>
                    <TextField
                      fullWidth
                      label="Content"
                      multiline
                      minRows={10}
                      maxRows={16}
                      {...register('content')}
                      error={!!errors.content}
                      helperText={
                        errors.content?.message ||
                        `Characters: ${characterCount} (minimum 500 characters)`
                      }
                      placeholder="Paste your complete work here..."
                      sx={{
                        '& .MuiInputBase-root': {
                          minHeight: { xs: 240, md: 280 },
                          borderRadius: 2,
                          bgcolor: (t) => alpha(t.palette.primary.main, 0.02),
                          '&.Mui-focused': { bgcolor: 'background.paper' },
                        },
                      }}
                    />
                  </Box>

                  {/* 4. Author bio */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Author bio
                    </Typography>
                    <TextField
                      fullWidth
                      label="Author Bio"
                      multiline
                      rows={4}
                      {...register('bio')}
                      error={!!errors.bio}
                      helperText={errors.bio?.message || 'Brief biographical information (50-150 words)'}
                      placeholder="Tell us about yourself, your writing background, and any relevant publications..."
                      sx={{
                        '& .MuiInputBase-root': {
                          borderRadius: 2,
                          bgcolor: (t) => alpha(t.palette.primary.main, 0.02),
                          '&.Mui-focused': { bgcolor: 'background.paper' },
                        },
                      }}
                    />
                  </Box>

                  {/* 5. Disclaimer and submit */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        border: (t) => `1px solid ${alpha(t.palette.info.main, 0.3)}`,
                      }}
                    >
                      By submitting your work, you confirm that it is original, unpublished, and you own all rights to the content.
                    </Alert>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={(theme) => ({
                        px: { xs: 2.5, md: 4 },
                        py: 1.5,
                        width: { xs: '100%', sm: 'auto' },
                        alignSelf: { xs: 'stretch', sm: 'flex-start' },
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                        '&:hover': {
                          boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                      })}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Work'}
                    </Button>
                  </Box>
                </Box>
              </Card>
              </Box>
            </Grid>

            <Grid item xs={12} lg={12} sx={{ mt: { xs: 2, md: 0 } }}>
              <Box sx={{ width: '100%' }}>
              <Card
                elevation={0}
                sx={(theme) => ({
                  p: { xs: 2.5, sm: 3 },
                  mb: 4,
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                  boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.06)}`,
                })}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Submission Guidelines
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {guidelines.map((guideline, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      {guideline}
                    </Typography>
                  ))}
                </Box>
              </Card>

              <Card
                elevation={0}
                sx={(theme) => ({
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                  boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.06)}`,
                })}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  What We're Looking For
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  We seek compelling, original voices that push boundaries and explore the human condition.
                  Whether you're an emerging writer or established author, we value quality, authenticity,
                  and fresh perspectives on contemporary themes.
                </Typography>
              </Card>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default SubmitPage;