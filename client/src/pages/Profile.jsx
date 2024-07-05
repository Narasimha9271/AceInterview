import React, { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setUser(data);
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                {user ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                            Profile Page
                        </h1>
                        <div className="mb-4">
                            <p className="text-gray-700 text-lg">
                                <strong className="font-semibold">
                                    Username:
                                </strong>{" "}
                                {user.username}
                            </p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 text-lg">
                                <strong className="font-semibold">
                                    Email:
                                </strong>{" "}
                                {user.email}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-3 text-gray-700"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.937l3-2.646z"
                            ></path>
                        </svg>
                        <p className="text-gray-700">Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
