const express = require("express");
const {
    submitFeedback,
    getFeedbacks,
} = require("../controllers/feedbackController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/:interviewId", auth, submitFeedback);
router.get("/:interviewId", auth, getFeedbacks);

module.exports = router;
