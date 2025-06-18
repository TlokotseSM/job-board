import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplicationList = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const endpoint = user.role === 'employer' 
          ? '/api/applications/job' 
          : '/api/applications/user';
        
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  const handleWithdraw = async (applicationId) => {
    try {
      await axios.delete(`/api/applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setApplications(prev => prev.filter(app => app.id !== applicationId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to withdraw application');
    }
  };

  if (loading) return <div className="text-center my-4">Loading applications...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="applications-container">
      <h4 className="mb-4">
        {user.role === 'employer' ? 'Applications Received' : 'Your Applications'}
      </h4>
      
      {applications.length === 0 ? (
        <div className="alert alert-info">
          {user.role === 'employer' 
            ? 'No applications received yet' 
            : 'You have not applied to any jobs yet'}
        </div>
      ) : (
        <div className="list-group">
          {applications.map(application => (
            <div key={application.id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>
                    {user.role === 'employer' 
                      ? application.user?.name || 'Applicant' 
                      : application.job?.title || 'Job'}
                  </h5>
                  <p className="mb-1">
                    {user.role === 'employer'
                      ? `Applied for: ${application.job?.title}`
                      : `At: ${application.job?.company}`}
                  </p>
                  <p className="text-muted small">
                    Applied on: {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`badge ${
                  application.status === 'pending' ? 'bg-warning' : 
                  application.status === 'accepted' ? 'bg-success' : 'bg-danger'
                }`}>
                  {application.status}
                </span>
              </div>
              
              {application.cover_letter && (
                <div className="mt-3">
                  <h6>Cover Letter:</h6>
                  <p className="text-muted">{application.cover_letter}</p>
                </div>
              )}
              
              <div className="d-flex justify-content-end mt-3">
                {user.role === 'job_seeker' && (
                  <button
                    className="btn btn-sm btn-outline-danger me-2"
                    onClick={() => handleWithdraw(application.id)}
                  >
                    Withdraw
                  </button>
                )}
                <Link
                  to={user.role === 'employer' 
                    ? `/applications/${application.id}`
                    : `/jobs/${application.job_id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;