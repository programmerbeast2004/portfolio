import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import { 
  BlogListPage, 
  BlogPostPage, 
  ProjListPage, 
  SingleProjPage, 
  CertsListPage, 
  CertsSourcePage, 
  ResumePage 
} from './components/SubPages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/projects" element={<ProjListPage />} />
      <Route path="/projects/:id" element={<SingleProjPage />} />
      <Route path="/certs" element={<CertsListPage />} />
      <Route path="/certs/:sourceId" element={<CertsSourcePage />} />
      <Route path="/resume" element={<ResumePage />} />
      {/* Catch-all route for undefined paths, redirect to home to secure from exposing 404/broken paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
