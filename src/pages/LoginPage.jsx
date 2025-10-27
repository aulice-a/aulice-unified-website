// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// src/App.jsx (Renamed from App.js for clarity)
// This is the functional core of your application.

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 

// --- IMPORT CORE & STATIC PAGES (Minimal for compilation) ---
import HomePage from './pages/HomePage.jsx';
import LexiconPage from './pages/LexiconPage.jsx'; 
import ContactPage from './pages/ContactPage.jsx'; // Now exists and will be a component
import LoginPage from './pages/LoginPage.jsx'; // Now exists
import SignUpPage from './pages/SignUpPage.jsx'; // Now exists

// --- Placeholder Component ---
const PlaceholderPage = ({ action }) => (
  <div className="p-8 max-w-4xl mx-auto text-center">
    <h1 className="text-3xl font-bold text-gray-800">Page Under Construction</h1>
    <p className="mt-2 text-gray-600">The destination page for '{action}' needs to be built.</p>
  </div>
);
// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  // NOTE: You must use React Router's hooks (useNavigate, useParams) for navigation, 
  // rather than manual state switching, for this structure to work reliably.

  return (
    // The <Router> is assumed to be in index.js/main.jsx, so we don't put it here.
    <div className="min-h-screen flex flex-col"> 
      <Routes>
        
        {/* Core Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/lexicon" element={<LexiconPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/stripe" element={<StripeTestPage />} />

        {/* Glossary Mastery Route (Matches button logic) */}
        <Route path="/glossary/:courseId/mastery" element={<LexiconPage />} />

        {/* Course Card Button Routes (Fixes 404 Errors) */}
        <Route path="/:courseId/demo" element={<PlaceholderPage action="Demo" />} />
        <Route path="/:courseId/exam" element={<PlaceholderPage action="Exam" />} />
        <Route path="/:courseId/pathway" element={<PlaceholderPage action="Pathway" />} />
        <Route path="/:courseId/scenario" element={<PlaceholderPage action="Scenario" />} />
        <Route path="/:courseId/unit1" element={<PlaceholderPage action="Unit 1" />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<PlaceholderPage action="Not Found" />} />

      </Routes>
    </div>
  );
}

const LoginPage = () => {
    // This is a minimal login form placeholder to prevent the compiler from crashing.
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In to Aulice</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="user@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;