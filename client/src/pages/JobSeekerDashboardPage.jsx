import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ApplicationList from '../components/jobs/ApplicationList';
import JobListings from '../components/jobs/JobListings';

const JobSeekerDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const [showJobListings, setShowJobListings] = useState(false);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Job Seeker Dashboard</h2>
        <span>Welcome, {user?.name}</span>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            My Applications
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('jobs');
              setShowJobListings(true);
            }}
          >
            Browse Jobs
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 'applications' && (
          <div className="tab-pane fade show active">
            <h4>Your Job Applications</h4>
            <ApplicationList />
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="tab-pane fade show active">
            {showJobListings && <JobListings />}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboardPage;