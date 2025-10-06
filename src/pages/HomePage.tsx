import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import FeaturedPosts from '../components/home/FeaturedPosts';
import RecentPosts from '../components/home/RecentPosts';
import NewsletterSignup from '../components/home/NewsletterSignup';

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
        <meta property="og:url" content="https://mokua-literary.vercel.app" />
      </Helmet>

      <HeroSection />
      <FeaturedPosts />
      <RecentPosts />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;