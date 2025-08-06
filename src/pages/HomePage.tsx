import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import FeaturedPosts from '../components/home/FeaturedPosts';
import RecentPosts from '../components/home/RecentPosts';
import NewsletterSignup from '../components/home/NewsletterSignup';
import ReviewsSection from '../components/home/ReviewsSection';

// Mock reviews data - in a real app, this would come from an API
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
    comment: 'The quality of writing here is exceptional. Each piece feels carefully curated and thoughtfully presented.',
    date: '2 days ago',
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
    comment: 'Found some amazing contemporary poetry that really resonated with me. The platform is beautifully designed.',
    date: '1 week ago',
  },
  {
    id: '3',
    user: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    rating: 4,
    comment: 'Great selection of essays and fiction. The authors are diverse and the content is always engaging.',
    date: '2 weeks ago',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mokua Literary Blog - Contemporary Literature & Poetry</title>
        <meta
          name="description"
          content="Discover contemporary literature, poetry, and essays. A curated space for emerging voices and timeless works that celebrate the art of storytelling."
        />
        <meta
          name="keywords"
          content="literature, poetry, essays, fiction, contemporary writing, literary blog, book reviews"
        />
        <meta property="og:title" content="Mokua Literary Blog - Contemporary Literature & Poetry" />
        <meta
          property="og:description"
          content="Discover contemporary literature, poetry, and essays. A curated space for emerging voices and timeless works."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mokua-blog.vercel.app" />
      </Helmet>

      <HeroSection />
      <FeaturedPosts />
      <ReviewsSection reviews={mockReviews} />
      <RecentPosts />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;