const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { roleCheck } = require('../middlewares/auth');
const { createJob, getJobs, getEmployerJobs } = require('../controllers/jobController');

router.get('/', getJobs);
router.post('/', auth, roleCheck('employer'), createJob);
router.get('/employer', auth, roleCheck('employer'), getEmployerJobs);

module.exports = router;