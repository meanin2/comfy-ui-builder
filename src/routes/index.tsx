import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import FormBuilder from '../pages/FormBuilder';
import SavedForms from '../pages/SavedForms';
import Gallery from '../pages/Gallery';
import Settings from '../pages/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/form-builder" element={<FormBuilder />} />
      <Route path="/saved-forms" element={<SavedForms />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}