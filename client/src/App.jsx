import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobListingsPage from './pages/JobListingsPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import JobSeekerDashboardPage from './pages/JobSeekerDashboardPage';
import Navbar from './components/shared/Navbar';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/employer-dashboard" element={
              <PrivateRoute role="employer">
                <EmployerDashboardPage />
              </PrivateRoute>
            } />
            <Route path="/job-seeker-dashboard" element={
              <PrivateRoute role="job_seeker">
                <JobSeekerDashboardPage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
