const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
    const { feedback } = req.body;
    const { interviewId } = req.params;
    const userId = req.userId;

    try {
        const newFeedback = await Feedback.create({
            interview: interviewId,
            feedback,
            user: userId,
        });
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({
            interview: req.params.interviewId,
        }).populate("user", "username");
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { submitFeedback, getFeedbacks };
