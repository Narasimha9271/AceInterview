const express = require("express");
const {
    scheduleInterview,
    getScheduledInterviews,
    updateInterviewStatus,
} = require("../controllers/interviewController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/schedule", auth, scheduleInterview);
router.get("/", auth, getScheduledInterviews);
router.patch("/:id/status", auth, updateInterviewStatus);

module.exports = router;
