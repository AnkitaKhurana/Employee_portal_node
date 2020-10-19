let express = require('express');
let router = express.Router();

const { authMiddleware, isManager } = require('../middlewares/authentication');
const { jobIdValidator, jobValidator, validateStatus } = require('../middlewares/validations');
const jobController = require('../controllers/job');

// Get all jobs
router.get('/', jobController.getJobs);

// Get job detail
router.get('/:id', [jobIdValidator], jobController.getJobById);

// Add new job
router.post('/', [authMiddleware, isManager, jobValidator, validateStatus, jobController.addJob]);

// Delete job 
router.delete('/:id', [jobIdValidator, authMiddleware, isManager, jobController.deleteJob]);

// Edit job
router.put('/:id', [authMiddleware, isManager, jobController.editJob]);

// Edit job status
router.put('/:id/:status', [authMiddleware, isManager, validateStatus, jobController.editJobStatus]);

// Apply for job 
router.post('/apply/:jobId', [authMiddleware, jobController.applyJob]);

module.exports = router