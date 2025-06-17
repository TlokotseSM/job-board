import React from 'react';

const JobFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Filters</h5>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Search</label>
              <input
                type="text"
                className="form-control"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Keywords"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-check mt-4 pt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="remoteCheck"
                name="remote"
                checked={filters.remote === true}
                onChange={() => setFilters(prev => ({
                  ...prev,
                  remote: prev.remote === null ? true : prev.remote === true ? false : null
                }))}
              />
              <label className="form-check-label" htmlFor="remoteCheck">
                Remote Only
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;