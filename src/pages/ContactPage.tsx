import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Email, Phone, LocationOn, Twitter, Instagram, LinkedIn, ArrowForward } from '@mui/icons-material';
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
    } catch {
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
        <title>Contact Us - Rise Above</title>
        <meta
          name="description"
          content="Get in touch with the Rise Above team. We welcome submissions, collaborations, and general inquiries."
        />
        <meta property="og:title" content="Contact Us - Rise Above" />
        <meta
          property="og:description"
          content="Reach the Rise Above editors and contributors."
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
              Get in Touch
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', px: { xs: 2, md: 0 }, fontSize: { xs: '1rem', md: '1.125rem' } }}>
              We read every note. Share a submission, pitch a collaboration, or simply say hello.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: { xs: 4, md: 6 }, alignItems: 'stretch' }}>
            <Box>
              <Card sx={{ p: { xs: 2.5, sm: 3, md: 4 }, height: '100%' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: { xs: 3, md: 4 },
                  }}
                >
                  Send us a message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 2, sm: 3 } }}>
                    <Box>
                      <TextField
                        fullWidth
                        label="Name"
                        size="medium"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Box>
                    
                    <Box>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        size="medium"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Box>
                    
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        size="medium"
                        {...register('subject')}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                      />
                    </Box>
                    
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={7}
                        size="medium"
                        {...register('message')}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                    </Box>
                    
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={<ArrowForward />}
                        sx={{ px: { xs: 2.5, md: 4 }, py: 1.5, borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}
                      >
                        {isSubmitting ? 'Sending…' : "Let's Connect"}
                      </Button>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                        We respect your privacy. Your information will only be used to respond to your message.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: { xs: 2.5, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3 } }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: { xs: 1, md: 1.5 },
                    }}
                  >
                    Contact information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prefer email or a quick call? We’re available on the channels below.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 2.5 } }}>
                  {contactInfo.map((info, index) => (
                    <motion.div key={info.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: { xs: 40, md: 44 }, height: { xs: 40, md: 44 }, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>{info.title}</Typography>
                          {info.link ? (
                            <Typography component="a" href={info.link} variant="body2" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                              {info.content}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.secondary">{info.content}</Typography>
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: 1.5 }}>
                    Follow us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <IconButton color="primary" href="https://twitter.com" target="_blank"><Twitter /></IconButton>
                    <IconButton color="primary" href="https://instagram.com" target="_blank"><Instagram /></IconButton>
                    <IconButton color="primary" href="https://linkedin.com" target="_blank"><LinkedIn /></IconButton>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </motion.div>

        {/* FAQ Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, mb: { xs: 2.5, md: 3 }, textAlign: 'center', fontSize: { xs: '1.75rem', md: '2rem' } }}>
            Frequently asked questions
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: { xs: 2, md: 3 } }}>
            {[{
              q: 'How soon will you get back to me?',
              a: 'We aim to respond within 2–3 business days. Submissions may take longer while under review.'
            },{
              q: 'Do you accept simultaneous submissions?',
              a: 'Yes. Please inform us promptly if your work is accepted elsewhere.'
            },{
              q: 'Can I pitch sponsored content?',
              a: 'We consider partnerships that align with our editorial values. Share details in your message.'
            }].map((item, i) => (
              <Box key={i}>
                <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: { xs: 0.75, md: 1 } }}>{item.q}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.a}</Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ContactPage;