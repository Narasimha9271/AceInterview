const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipientEmail: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
