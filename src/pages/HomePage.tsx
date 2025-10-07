import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/home/HeroSection";
import FeaturedPosts from "../components/home/FeaturedPosts";
import RecentPosts from "../components/home/RecentPosts";
import NewsletterSignup from "../components/home/NewsletterSignup";
import ReviewsSection from "../components/home/ReviewsSection";

// Mock reviews data - in a real app, this would come from an API
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Amina Hassan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "Mombasa County",
    },
    rating: 5,
    comment: "This platform really opened my eyes to the drug abuse crisis in our coastal region. The investigative reporting on Mombasa's underground economy is eye-opening and necessary for our youth.",
    date: "2 days ago",
    topic: "Youth Affairs",
  },
  {
    id: "2",
    user: {
      name: "Kiprop Chebet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Eldoret, Uasin Gishu",
    },
    rating: 5,
    comment: "As a youth advocate, I appreciate how this platform covers mental health issues affecting Kenyan youth. The stories about depression and suicide prevention are crucial for our community.",
    date: "1 week ago",
    topic: "Health & Wellness",
  },
  {
    id: "3",
    user: {
      name: "Faith Njeri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Kiambu County",
    },
    rating: 4,
    comment: "The coverage of digital divide in rural counties is spot on. As an education tech specialist, I see these challenges daily. Great to see these issues getting the attention they deserve.",
    date: "2 weeks ago",
    topic: "Education & Tech",
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mokua Youth Platform - Kenyan Youth Affairs & County News</title>
        <meta
          name="description"
          content="Discover current affairs, county news, and social issues affecting Kenyan youth. A platform for authentic voices covering youth affairs, health, education, and community development across Kenya's 47 counties."
        />
        <meta
          name="keywords"
          content="kenyan youth, county news, youth affairs, mental health, drug abuse, education, social issues, kenya"
        />
        <meta property="og:title" content="Mokua Youth Platform - Kenyan Youth Affairs & County News" />
        <meta
          property="og:description"
          content="Discover current affairs, county news, and social issues affecting Kenyan youth. A platform for authentic voices covering youth affairs, health, education, and community development."
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