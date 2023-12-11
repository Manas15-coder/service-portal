const mongoose = require('mongoose')
const jobModel = require('../models/jobModel')
const userModel = require('../models/userModel')

//get all jobs
exports.getAllJobController = async (req, res) => {
    try {
        const jobs = await jobModel.find({}).populate('user').sort({ createdAt: -1 })
        if (jobs.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No jobs found',
            });
        }
        return res.status(200).send({
            success: true, message: 'Jobs fetched successfully', jobs: jobs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false, message: 'Error while getting jobs', error
        });
    }
}

//create jobs
exports.createJobController = async (req, res) => {
    try {
        const { company,location, type, category, description, url, user, applicants } = req.body
        if (!company || !location || !type || !category || !description || !url) {
            return res.status(400).send({ success: false, message: 'Please Provide all Fields' });
        }
        const existingUser = await userModel.findById(user);
        //validation
        if (!existingUser) {
            return res.status(401).send({ success: false, message: 'unable to find user' });
        }
        const newJob = new jobModel({ company, location, type, category, description, url, user: existingUser._id, applicants: applicants || [] });

        const session = await mongoose.startSession();
        session.startTransaction();
        await newJob.save({ session })

        existingUser.jobs = existingUser.jobs || [];
        existingUser.jobs.push(newJob);
        await existingUser.save({ session })

        await session.commitTransaction();
        await newJob.save();

        return res.status(201).send({ succes: true, message: 'Job created', newJob })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }
}

//update jobs

exports.updateJobController = async (req, res) => {
    try {
        const { id } = req.params;
        const { company, position, location, type, category, pay, description, url } = req.body;

        const job = await jobModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({ success: true, message: 'Job Updated', job })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error
        });
    }
}

//single job

exports.getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findById(id);
        if (!job) {
            return res.status(404).send({
                success: false,
                message: 'Job not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Fetched single job',
            job, // Corrected variable name
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'Error while getting single job',
            error,
        });
    }
}

//delete blog
exports.deleteJobController = async (req, res) => {
    try {
        const job = await jobModel.findByIdAndDelete(req.params.id).populate('user');

        //check whether job found and valid user
        if (!job || !job.user) {
            return res.status(404).send({
                success: false,
                message: 'Job not found or user information missing',
            });
        }
        //remove jobs from user's job array
        job.user.jobs.pull(job);
        await job.user.save();
        return res.status(200).send({
            success: true,
            message: 'Job Deleted'
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: 'Error while deleting job',
            error
        });
    }
}

//get user job

exports.userJobController = async (req, res) => {
    try {
        const userJob = await userModel.findById(req.params.id).populate("jobs");
        if (!userJob) {
            return res.status(404).send({
                success: false,
                message: 'jobs not found with this id'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'user jobs',
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ success: false, message: 'error in user blog', error });
    }
}

//apply for jobs

// jobController.js
exports.applyToJobController = async (req, res) => {
    try {
        console.log("Apply to job request received");

        const { jobId } = req.params;
        const userId = req.headers.authorization // Get the user ID from req.user

        console.log("Job ID:", jobId);
        console.log("User ID:", userId);

        const job = await jobModel.findById(jobId);
        if (!job) {
            console.log("Job not found");
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        console.log("Job found:", job);

        job.applicants.push(userId);
        await job.save();

        const user = await userModel.findById(userId);
        user.appliedJobs.push(jobId);
        await user.save();

        console.log("User updated:", user);

        return res.status(200).send({ success: true, message: 'Applied to job successfully' });
    } catch (error) {
        console.error("Error applying to job:", error);
        return res.status(400).json({ success: false, message: 'Error applying to job', error });
    }
}


//applied jobs

exports.viewAppliedJobsController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId).populate('appliedJobs');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, appliedJobs: user.appliedJobs });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Error fetching applied jobs', error });
    }
};


// View job applicants
exports.viewJobApplicantsController = async (req, res) => {
    try {
        console.log("View job applicants request received");

        const { jobId } = req.params;

        const job = await jobModel.findById(jobId).populate('applicants');
        if (!job) {
            console.log("Job not found");
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        const applicants = job.applicants;

        console.log("Applicants:", applicants);

        return res.status(200).send({ success: true, message: 'Job applicants fetched successfully', applicants });
    } catch (error) {
        console.error("Error fetching job applicants:", error);
        return res.status(400).json({ success: false, message: 'Error fetching job applicants', error });
    }
};
