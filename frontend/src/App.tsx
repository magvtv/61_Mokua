import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ComingSoonPage from './pages/ComingSoonPage';
import { isFeatureEnabled } from './utils/featureFlags';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const AuthorsPage = lazy(() => import('./pages/AuthorsPage'));
const AuthorDetailPage = lazy(() => import('./pages/AuthorDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SubmitPage = lazy(() => import('./pages/SubmitPage'));

function App() {
  // If coming soon is enabled, show only that page
  if (isFeatureEnabled('SHOW_COMING_SOON')) {
    return <ComingSoonPage />;
  }

  // Main blog application with routing
  return (
    <AppLayout>
      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
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
      </Suspense>
    </AppLayout>
  );
}

export default App;