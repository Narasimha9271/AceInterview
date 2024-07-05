const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        required: true,
    },
    feedback: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
