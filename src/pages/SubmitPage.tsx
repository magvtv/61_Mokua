import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
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
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const contentValue = watch('content', '');
  const wordCount = contentValue.split(/\s+/).filter(word => word.length > 0).length;

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

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              Submit Your Work
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Share your literary voice with our community. We welcome original fiction, poetry, essays, and reviews.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 4,
                  }}
                >
                  Submission Form
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Author Name"
                        {...register('authorName')}
                        error={!!errors.authorName}
                        helperText={errors.authorName?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Title"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          label="Category"
                          {...register('category')}
                        >
                          {categories?.map((category) => (
                            <MenuItem key={category.id} value={category.slug}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.category && (
                          <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                            {errors.category.message}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={12}
                        {...register('content')}
                        error={!!errors.content}
                        helperText={
                          errors.content?.message || 
                          `Word count: ${wordCount} (minimum 500 words)`
                        }
                        placeholder="Paste your complete work here..."
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Author Bio"
                        multiline
                        rows={4}
                        {...register('bio')}
                        error={!!errors.bio}
                        helperText={errors.bio?.message || 'Brief biographical information (50-150 words)'}
                        placeholder="Tell us about yourself, your writing background, and any relevant publications..."
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Alert severity="info" sx={{ mb: 3 }}>
                        By submitting your work, you confirm that it is original, unpublished, and you own all rights to the content.
                      </Alert>
                      
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Work'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, mb: 4 }}>
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

              <Card sx={{ p: 3 }}>
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
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default SubmitPage;