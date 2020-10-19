const mongoose = require("mongoose");
const { TYPES } = require('../config/constants');

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    name: { type: String, default: "default user" },
    username: String,
    password: String,
    jwt: String,
    type: {
        type: String,
        enum: [TYPES.PROJECT_MANAGER, TYPES.EMPLOYEE],
        default: TYPES.EMPLOYEE
    },
    createdAt: { type: Date, default: Date.now },
    jobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }]
});

module.exports = mongoose.model("User", UserSchema);