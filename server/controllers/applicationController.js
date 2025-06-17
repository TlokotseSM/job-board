const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
  try {
    if (req.user.role !== 'job_seeker') {
      return res.status(403).json({ message: 'Only job seekers can apply for jobs' });
    }

    const { job_id, cover_letter } = req.body;
    
    // Check if job exists
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applicationId = await Application.create({
      job_id,
      user_id: req.user.id,
      cover_letter
    });

    res.status(201).json({ message: 'Application submitted successfully', applicationId });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getApplicationsForJob = async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { jobId } = req.params;
    
    // Verify the job belongs to the employer
    const job = await Job.findById(jobId);
    if (!job || job.employer_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const applications = await Application.findByJob(jobId);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getUserApplications = async (req, res) => {
  try {
    if (req.user.role !== 'job_seeker') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const applications = await Application.findByUser(req.user.id);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { applyForJob, getApplicationsForJob, getUserApplications };