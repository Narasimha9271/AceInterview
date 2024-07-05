const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's URL
        credentials: true,
    })
);

app.use(express.json());

const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");
const codeExecutionRoutes = require("./routes/codeExecution");
const invitationRoutes = require("./routes/invitation");
const feedbackRoutes = require("./routes/feedback");

app.use("/auth", authRoutes);
app.use("/interview", interviewRoutes);
app.use("/code-execution", codeExecutionRoutes);
app.use("/invitation", invitationRoutes); // Ensure this is included
app.use("/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });

app.get("/", (req, res) => {
    res.send("API is running...");
});
