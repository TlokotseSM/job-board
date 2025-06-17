const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { applyForJob, getApplicationsForJob, getUserApplications } = require('../controllers/applicationController');

router.post('/', auth, applyForJob);
router.get('/job/:jobId', auth, getApplicationsForJob);
router.get('/user', auth, getUserApplications);

module.exports = router;