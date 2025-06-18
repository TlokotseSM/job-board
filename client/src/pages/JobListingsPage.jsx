import React from 'react';
import { useAuth } from '../context/AuthContext';
import JobList from '../components/jobs/JobList';
import ApplyModal from '../components/jobs/ApplyModal';

const JobListingsPage = () => {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleJobClick = (job) => {
    if (user?.role === 'job_seeker') {
      setSelectedJob(job);
      setShowApplyModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Job Listings</h2>
        {user?.role === 'employer' && (
          <a href="/employer-dashboard" className="btn btn-outline-primary">
            Go to Dashboard
          </a>
        )}
      </div>

      <JobList onJobClick={handleJobClick} />

      {showApplyModal && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setShowApplyModal(false)}
          onApplySuccess={() => {
            setShowApplyModal(false);
            // You might want to refresh the job list or show a success message
          }}
        />
      )}
    </div>
  );
};

export default JobListingsPage;