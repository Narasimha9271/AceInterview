import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 sticky w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">AceInterview</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-gray-400">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/profile" className="hover:text-gray-400">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/mock-interview"
                                className="hover:text-gray-400"
                            >
                                Mock Interview
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/invitation"
                                className="hover:text-gray-400"
                            >
                                Invitations
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/feedback"
                                className="hover:text-gray-400"
                            >
                                Feedback
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-gray-400">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="hover:text-gray-400"
                            >
                                Register
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
