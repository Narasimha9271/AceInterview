import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MockInterview = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSchedule = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch(
            "http://localhost:5000/interview/schedule",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date, time, email }),
            }
        );
        const data = await response.json();
        navigate(`/mock-interview-session/${data._id}`);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Schedule Mock Interview</h1>
            <form onSubmit={handleSchedule}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full mt-2"
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full mt-2"
                />
                <input
                    type="email"
                    placeholder="Friend's Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mt-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white mt-2 px-4 py-2"
                >
                    Schedule
                </button>
            </form>
        </div>
    );
};

export default MockInterview;
