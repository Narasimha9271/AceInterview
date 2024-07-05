import React, { useState, useEffect } from "react";

const Feedback = () => {
    const [interviews, setInterviews] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        const fetchInterviews = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/interview", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setInterviews(data);
        };

        fetchInterviews();
    }, []);

    const handleFeedbackSubmit = async (e, interviewId) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/interview/feedback/${interviewId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ feedback }),
        });
        setFeedback("");
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Feedback</h1>
            <ul>
                {interviews.map((interview, index) => (
                    <li key={index}>
                        {interview.date} at {interview.time}
                        <form
                            onSubmit={(e) =>
                                handleFeedbackSubmit(e, interview._id)
                            }
                        >
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="block w-full mt-2"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white mt-2 px-4 py-2"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
