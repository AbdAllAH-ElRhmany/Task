import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
const Home: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Retrieve the token from localStorage
                const authToken = localStorage.getItem('token');

                if (!authToken) {
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await fetch('http://localhost:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: number) => {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                // Remove the deleted user from the local state
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

                // Check if the deleted user is the currently logged-in user
                const loggedInUserId = parseInt(localStorage.getItem('userId') || '', 10);
                if (userId === loggedInUserId) {
                    navigate('/login');
                }

                console.log(`User with ID ${userId} deleted successfully`);
            } else {
                console.error(`Failed to delete user with ID ${userId}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
        }
    };

    const handleSendEmail = async (userIds: number | number[]) => {
        try {
            const authToken = localStorage.getItem('token');

            if (!authToken) {
                console.error('Token not found in localStorage');
                return;
            }
            userIds = typeof (userIds) == "number" ? [userIds] : userIds;

            const response = await fetch('http://127.0.0.1:8000/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include the Authorization header with the token
                },
                body: JSON.stringify({
                    ids: userIds,
                }),
            });

            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Failed to send email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className={"home"}>
            <div className={"sec_header"}>
                <h2>All Users</h2>
                <button onClick={() => handleSendEmail(users.map(user => user.id))}>
                    Send Emails to All Users
                </button>

            </div>
            <table className={"users_table"}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/edit/${user.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                            <button onClick={() => handleSendEmail(user.id)}>Send Email</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
