const Invitation = require("../models/Invitation");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const questions = require("../data/questions");

const sendInvitation = async (req, res) => {
    const { recipientEmail } = req.body;
    const senderId = req.userId;

    try {
        const existingUser = await User.findOne({ email: recipientEmail });
        if (!existingUser)
            return res.status(404).json({ message: "Recipient not found" });

        const newInvitation = await Invitation.create({
            sender: senderId,
            recipientEmail,
        });

        // Send email with question link
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "your_email@gmail.com",
                pass: "your_email_password",
            },
        });

        const questionLinks = questions
            .map(
                (q) =>
                    `Question: ${q.content}, Link: http://localhost:5173/mock-interview-session/${newInvitation._id}?questionId=${q.id}`
            )
            .join("\n");

        const mailOptions = {
            from: "your_email@gmail.com",
            to: recipientEmail,
            subject: "Mock Interview Invitation",
            text: `You have been invited to participate in a mock interview. Here are the questions you can ask:\n\n${questionLinks}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.status(201).json(newInvitation);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find({
            recipientEmail: req.userEmail,
        });
        res.status(200).json(invitations);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateInvitationStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const updatedInvitation = await Invitation.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedInvitation);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { sendInvitation, getInvitations, updateInvitationStatus };
