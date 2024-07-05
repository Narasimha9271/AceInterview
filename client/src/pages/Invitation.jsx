import React, { useState, useEffect } from "react";

const Invitation = () => {
    const [invitations, setInvitations] = useState([]);
    const [recipientEmail, setRecipientEmail] = useState("");

    useEffect(() => {
        const fetchInvitations = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/invitation", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setInvitations(data);
        };

        fetchInvitations();
    }, []);

    const handleSendInvitation = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await fetch("http://localhost:5000/invitation/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recipientEmail }),
        });
        setRecipientEmail("");
    };

    const handleUpdateStatus = async (id, status) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/invitation/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Invitations</h1>
            <form onSubmit={handleSendInvitation}>
                <input
                    type="email"
                    placeholder="Recipient Email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="block w-full mt-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white mt-2 px-4 py-2"
                >
                    Send Invitation
                </button>
            </form>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Pending Invitations</h2>
                <ul>
                    {invitations.map((invitation, index) => (
                        <li key={index}>
                            {invitation.recipientEmail} - {invitation.status}
                            {invitation.status === "Pending" && (
                                <div>
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(
                                                invitation._id,
                                                "Accepted"
                                            )
                                        }
                                        className="bg-green-500 text-white mt-2 px-4 py-2"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(
                                                invitation._id,
                                                "Rejected"
                                            )
                                        }
                                        className="bg-red-500 text-white mt-2 px-4 py-2"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Invitation;
