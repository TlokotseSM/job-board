const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { title, description, company, location, remote } = req.body;
    const employer_id = req.user.id;

    const jobId = await Job.create({
      title,
      description,
      company,
      location,
      remote: Boolean(remote),
      employer_id
    });

    res.status(201).json({ message: 'Job created successfully', jobId });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getJobs = async (req, res) => {
  try {
    const { search, remote, location } = req.query;
    const jobs = await Job.findAll({ search, remote, location });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getEmployerJobs = async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const jobs = await Job.findByEmployer(req.user.id);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { createJob, getJobs, getEmployerJobs };