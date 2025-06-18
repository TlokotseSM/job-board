import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';

const EmployerJobList = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs/employer', {
          params: { archived: showArchived },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJobs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'employer') {
      fetchJobs();
    }
  }, [user, showArchived]);

  const handleArchive = async (jobId, archive) => {
    try {
      await axios.patch(
        `/api/jobs/${jobId}`,
        { archived: archive },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    }
  };

  if (loading) return <div className="text-center my-4">Loading your job postings...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="employer-jobs-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Your Job Postings</h4>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="showArchived"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
          <label className="form-check-label" htmlFor="showArchived">
            Show Archived
          </label>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="alert alert-info">
          {showArchived 
            ? 'No archived job postings' 
            : 'You have no active job postings'}
        </div>
      ) : (
        <div className="row">
          {jobs.map(job => (
            <div key={job.id} className="col-md-6 mb-4">
              <JobCard job={job} />
              <div className="d-flex justify-content-end mt-2">
                <Link
                  to={`/jobs/${job.id}/edit`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  Edit
                </Link>
                <button
                  className={`btn btn-sm ${job.archived ? 'btn-success' : 'btn-warning'}`}
                  onClick={() => handleArchive(job.id, !job.archived)}
                >
                  {job.archived ? 'Restore' : 'Archive'}
                </button>
              </div>
              <div className="mt-2">
                <Link
                  to={`/jobs/${job.id}/applications`}
                  className="btn btn-sm btn-info"
                >
                  View Applications ({job.application_count || 0})
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerJobList;