import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onApply }) => {
  const { user } = useAuth();
  const isEmployer = user?.role === 'employer';
  const isJobSeeker = user?.role === 'job_seeker';

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title">{job.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
          </div>
          <span className={`badge ${job.remote ? 'bg-success' : 'bg-primary'}`}>
            {job.remote ? 'Remote' : 'On-site'}
          </span>
        </div>
        
        <p className="card-text mt-2">{job.location}</p>
        <p className="card-text">{job.description.substring(0, 150)}...</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Posted on {new Date(job.created_at).toLocaleDateString()}
          </small>
          
          <div>
            {isJobSeeker && (
              <button 
                className="btn btn-sm btn-primary me-2"
                onClick={() => onApply(job)}
              >
                Apply Now
              </button>
            )}
            
            <Link 
              to={`/jobs/${job.id}`} 
              className="btn btn-sm btn-outline-secondary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;