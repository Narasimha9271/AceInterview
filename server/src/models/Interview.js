const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: ["Scheduled", "Completed"],
        default: "Scheduled",
    },
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
