const { INVALID_REQUEST } = require('../config/constants');
const { logger } = require('./logging');

const loginValidator = (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send(INVALID_REQUEST);
    }
    else
        next();
}

const registerValidator = (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.type) {
        res.status(400).send(INVALID_REQUEST)
        next(INVALID_REQUEST)
    }
    next();
}

const jobIdValidator = (req, res, next) => {
    if (!req.params || !req.params.id) {
        res.status(400).send(INVALID_REQUEST);
    }
    else
        next();
}
const validateStatus = (req, res, next) => {
    let job = req.body;
    if (job.status != 'open' && job.status != 'closed') {
        res.status(400).send(INVALID_REQUEST);
    }
    else next();
}

const jobValidator = (req, res, next) => {
    let job = req.body;
    if (!job
        || !job.projectName
        || !job.clientName
        || !job.role
        || !job.jobDescription
        || !job.status
        || !job.technologies) {
        res.status(400).send(INVALID_REQUEST);
    }
    else
        next();
}

module.exports = { loginValidator, registerValidator, jobIdValidator, jobValidator, validateStatus }