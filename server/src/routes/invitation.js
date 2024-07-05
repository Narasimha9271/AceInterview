const express = require("express");
const {
    sendInvitation,
    getInvitations,
    updateInvitationStatus,
} = require("../controllers/invitationController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/send", auth, sendInvitation);
router.get("/", auth, getInvitations);
router.patch("/:id/status", auth, updateInvitationStatus);

module.exports = router;
