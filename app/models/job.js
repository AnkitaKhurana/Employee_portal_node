const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    projectName: { type: String, default: 'Node Project' },
    clientName: {type: String},
    technologies: [{ type: String}],
    role: {type: String},
    jobDescription: {type: String},
    status: {
        type: String,
        enum : ['open','closed'],
        default: 'open'
    },    
    createdBy: { type: String, default: 'Admin' },
    createdAt: { type: Date, default: Date.now },
    applicants: [ {type : mongoose.Schema.ObjectId, ref : 'User'} ]
});



module.exports = mongoose.model("Job", JobSchema);