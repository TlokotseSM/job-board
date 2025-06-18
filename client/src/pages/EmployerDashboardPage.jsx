import React, { useState } from 'react';
import axios from 'axios';
import JobForm from '../components/jobs/JobForm';
import EmployerJobList from '../components/jobs/EmployerJobList';

const EmployerDashboardPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleJobCreated = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employer Dashboard</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Post New Job'}
        </button>
      </div>

      {showForm && <JobForm onJobCreated={handleJobCreated} />}
      
      <h4 className="mt-4">Your Job Postings</h4>
      <EmployerJobList />
    </div>
  );
};

export default EmployerDashboardPage;