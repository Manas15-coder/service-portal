const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },

    location: {
        type: String,
        default: 'Noida',
        required: [true, 'Work Location is required']
    },
    type: {
        type: String,
        default: 'government',
        required: [true, 'company type is required']
    },
    category: {
        type: String,
        default: 'other'
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    url: {
        type: String,
        required: [true, "url is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    applicants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

const jobModel = mongoose.model("Job", jobSchema)

module.exports = jobModel;