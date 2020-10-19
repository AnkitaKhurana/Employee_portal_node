const { logger } = require('../middlewares/logging');
const jobService = require('../services/job');

const functions = {
    getJobs: async (req, res) => {
        let jobs = await jobService.findAllJobs();
        if (jobs)
            res.status(200).send(jobs);
        else
            res.status(404).send('No jobs found');
    },
    getJobById: async (req, res) => {
        let job = await jobService.findJob(req.params.id);
        if (job)
            res.status(200).send(job);
        else
            res.status(404).send('No such job found');
    },
    addJob: async (req, res) => {
        req.body.createdBy = req.user.username;
        let jobAdded = await jobService.addJob(req.body);
        if (jobAdded)
            res.status(200).send(jobAdded.toObject());
        else
            res.status(500).send('ERROR adding new Job... try again later');
    },
    deleteJob: async (req, res) => {
        let deteted = await jobService.deleteJob(req.params.id);
        if (deteted)
            res.status(200).send(deteted);
        else
            res.status(500).send(`ERROR deleting Job ${req.params.id}... try again later`);
    },
    editJob: async (req, res) => {
        if (!req.params.id)
            res.status(400).send(`Invalid request`);
        let editedJob = await jobService.editJob(req.params.id, req.body);
        if (editedJob)
            res.status(200).send(editedJob);
        else
            res.status(500).send(`ERROR editing Job ${req.params.id}... try again later`);
    },
    editJobStatus: async(req, res) => {
        if (!req.params.id || !req.params.status)
            res.status(400).send(`Invalid request`);
        let editedJob = await jobService.editJob(req.params.id, { status: req.params.status });
        if (editedJob)
            res.status(200).send(editedJob);
        else
            res.status(500).send(`ERROR editing Job ${req.params.id}... try again later`);
    },
    applyJob: async (req,res) =>{
        if (!req.params.jobId)
             res.status(400).send(`Invalid request, missing jobId`);
        let job = await jobService.findJob(req.params.jobId);
        if(!job)
            res.status(404).send('No Such job found');
        else{
           let jobApplied = await jobService.applyJob(req.user._id, job);
            if(jobApplied)
                res.status(200).send('Applied!');
            else
                res.status(500).send(`ERROR applying toJob ${req.params.jobId}... try again later`);   
        }    
    }
};

module.exports = functions;