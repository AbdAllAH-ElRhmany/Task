import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://your-api/users');
            setUsers(response.data);
        } catch (error:any) {
            console.error('Error fetching users:', error.response.data);
        }
    };
    useEffect(() => {


        fetchUsers();
    }, []);

    const handleDelete = async (userId: number) => {
        try {
            await axios.delete(`http://your-api/users/${userId}`);
            console.log('User deleted successfully!');
            // Refresh the user list after deletion
            fetchUsers();
        } catch (error:any) {
            console.error('Error deleting user:', error.response?.data);
        }
    };


    return (
        <div>
            <h2>User Table</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/users/${user.id}/edit`}>Edit</Link>{' '}
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                            {' '}
                            <Link to={`/users/${user.id}/email`}>Send Email</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;