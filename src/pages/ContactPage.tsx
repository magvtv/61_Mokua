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
  IconButton,
} from '@mui/material';
import { Email, Phone, LocationOn, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const { addNotification } = useAppStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Contact form submitted:', data);
      
      addNotification({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.',
      });
      
      reset();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    }
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email',
      content: 'hello@mokualiterary.com',
      link: 'mailto:hello@mokualiterary.com',
    },
    {
      icon: <Phone />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      content: 'New York, NY',
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Mokua Literary Blog</title>
        <meta
          name="description"
          content="Get in touch with the Mokua Literary Blog team. We'd love to hear from you about submissions, collaborations, or general inquiries."
        />
        <meta property="og:title" content="Contact Us - Mokua Literary Blog" />
        <meta
          property="og:description"
          content="Get in touch with the Mokua Literary Blog team. We'd love to hear from you."
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
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
                  Send us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        {...register('subject')}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        {...register('message')}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Contact Information
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {info.title}
                          </Typography>
                          {info.link ? (
                            <Typography
                              component="a"
                              href={info.link}
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                            >
                              {info.content}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {info.content}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>

              <Card sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Follow Us
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Stay connected with our literary community
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton color="primary" href="https://twitter.com" target="_blank">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary" href="https://instagram.com" target="_blank">
                    <Instagram />
                  </IconButton>
                  <IconButton color="primary" href="https://linkedin.com" target="_blank">
                    <LinkedIn />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default ContactPage;