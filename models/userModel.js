const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        phone: {
            type: Number,
            required: [true, "Phone no. is required"]
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },

        appliedJobs: [{
            type: mongoose.Types.ObjectId,
            ref: 'Job'
        }]
    }, {
    timestamps: true
}
)

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;