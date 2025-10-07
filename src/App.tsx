import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
// import ComingSoonPage from './pages/ComingSoonPage'; // temporarily disabled to show full app
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AuthorsPage from './pages/AuthorsPage';
import AuthorDetailPage from './pages/AuthorDetailPage';
import PostDetailPage from './pages/PostDetailPage';
import ContactPage from './pages/ContactPage';
import SubmitPage from './pages/SubmitPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AuthorDetailPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;