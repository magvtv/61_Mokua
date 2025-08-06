// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import AuthorsPage from './pages/AuthorsPage';
import AuthorDetailPage from './pages/AuthorDetailPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import SubmitPage from './pages/SubmitPage';
import ComingSoonPage from './pages/ComingSoonPage';
import { isFeatureEnabled } from './utils/featureFlags';

function App() {
  // If coming soon is enabled, show only that page
  if (isFeatureEnabled('SHOW_COMING_SOON')) {
    return <ComingSoonPage />;
  }

  // Main blog application with routing
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/author/:slug" element={<AuthorDetailPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        {isFeatureEnabled('ENABLE_SEARCH') && (
          <Route path="/search" element={<SearchPage />} />
        )}
        <Route path="/contact" element={<ContactPage />} />
        {isFeatureEnabled('ENABLE_SUBMISSIONS') && (
          <Route path="/submit" element={<SubmitPage />} />
        )}
      </Routes>
    </AppLayout>
  );
}

export default App;