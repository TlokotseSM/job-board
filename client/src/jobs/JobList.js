import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    remote: null,
    location: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.remote !== null) params.append('remote', filters.remote);
        if (filters.location) params.append('location', filters.location);

        const response = await axios.get(`http://localhost:5000/api/jobs?${params.toString()}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div>
      <h2>Job Listings</h2>
      <JobFilters filters={filters} setFilters={setFilters} />
      <div className="row mt-4">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="col-md-6 mb-4">
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;