import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MockInterview from "./pages/MockInterview";
import Header from "./components/Header";
import Feedback from "./pages/Feedback";
import Invitation from "./pages/Invitation";
import MockInterviewSession from "./pages/MockInterviewSession";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mock-interview" element={<MockInterview />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route
                    path="/mock-interview-session/:interviewId"
                    element={<MockInterviewSession />}
                />
            </Routes>
        </Router>
    );
}

export default App;
