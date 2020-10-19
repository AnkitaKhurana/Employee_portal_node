const { loggers } = require('winston');
const { logger } = require('../middlewares/logging');
const Job = require('../models/job');
const UserService = require('./user');
const functions = {
    findAllJobs: async () => {
        try {
            let jobs = await Job.find();
            return jobs;
        }
        catch {
            return [];
        }
    },
    findJob: async (id) => {
        try {
            let job = await Job.findOne({ _id: id });
            logger.info('Job',job);
            return job;
        }
        catch(err) {
            logger.err(err);
            return null;
        }
    },
    addJob: async (jobDetails) => {
        try {
            let newJob = await Job.create(jobDetails);
            logger.info('Job created', newJob);
            return newJob;
        }
        catch(err) {
            logger.error(err);
            return false;
        }

    },
    deleteJob: async (id) => {
        try {
            let jobDeleted = await Job.findOneAndDelete({ _id: id });
            return jobDeleted;
        }
        catch {
            return null;
        }
    },
    editJob: async (id, job) => {
        try {
            if(job.status){
                if (job.status != 'open' && job.status != 'closed') {
                    return null;
                }
            }
            let jobEdited = await Job.findOneAndUpdate({ _id: id }, job, {new: true});
            return jobEdited;
        }
        catch {
            return null;
        }
    },
    applyJob: async (user_id,job) =>{
        // Save user as applicant  
        try {
            job.applicants.push(user_id);
            await job.save();
        }
        catch (err){
            logger.error('Error', err);
            return null;
        }
        // add job to user applications
        try{
            let user = await UserService.findUserById(user_id);
            if(!user)
                throw Error();
            user.jobs.push(job._id);
            await user.save();
            return user;
        }
        catch(err){
            job.applicants = job.applicants.filter(x => {
                return x != user_id;
              });
            logger.error('Error', err);  
            await job.save();
            return null;
        }
    }
}

module.exports = functions;