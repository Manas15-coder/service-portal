const express = require('express');
const { getAllJobController, createJobController, updateJobController, getJobByIdController, deleteJobController, userJobController, applyToJobController, viewAppliedJobsController ,viewJobApplicantsController} = require('../controllers/jobController');

const router = express.Router();

//get all jobs
router.get('/all-job', getAllJobController);
//create jobs
router.post('/create-job', createJobController)
//update jobs
router.put('/update-job/:id', updateJobController)
//single job
router.get('/get-job/:id', getJobByIdController)
//delete job
router.delete('/delete-job/:id', deleteJobController)
//get user job
router.get('/user-job/:id', userJobController)
//apply jobs
router.post('/apply/:jobId', applyToJobController)
//view applied jobs
router.get('/applied-jobs/:userId', viewAppliedJobsController)
// Route to view job applicants
router.get('/view-applicants/:jobId', viewJobApplicantsController);
module.exports = router;
