const Interview = require("../models/Interview");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const questions = require("../data/questions");

const scheduleInterview = async (req, res) => {
    const { date, time, email } = req.body;
    const userId = req.userId;

    try {
        const recipientUser = await User.findOne({ email });
        if (!recipientUser)
            return res.status(404).json({ message: "Recipient not found" });

        const newInterview = await Interview.create({
            user: userId,
            date,
            time,
        });

        // Send invitation email
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
                    `Question: ${q.content}, Link: http://yourdomain.com/mock-interview-session/${newInterview._id}?questionId=${q.id}`
            )
            .join("\n");

        const mailOptions = {
            from: "your_email@gmail.com",
            to: email,
            subject: "Mock Interview Invitation",
            text: `You have been invited to a mock interview on ${date} at ${time}. Please login to your account to accept or reject the invitation. Here are the questions you can ask:\n\n${questionLinks}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.status(201).json(newInterview);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getScheduledInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ user: req.userId });
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateInterviewStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const updatedInterview = await Interview.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedInterview);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    scheduleInterview,
    getScheduledInterviews,
    updateInterviewStatus,
};
