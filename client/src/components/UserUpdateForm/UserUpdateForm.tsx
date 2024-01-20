import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface UserUpdateFormProps {
    userId: any;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ userId }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {


                if (!authToken) {
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                const userData = response.data;
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdate = async () => {
        if (!user) {
            return;
        }

        try {

            if (!authToken) {
                console.error('Token not found in localStorage');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                }),
            });

            if (response.ok) {
                console.log('User details updated successfully');
            } else {
                console.error('Failed to update user details:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div className={"auth_form"}>
            <h2>Edit User {userId}</h2>
            {user && (
                <form>
                    <div className={"form_group"}>
                        <label htmlFor={"name"}>Name:</label>
                        <label>Name:</label>
                        <input
                            type="text" id={"name"}
                            value={user.name || ''}
                            onChange={(e) => setUser((prevUser) => ({...prevUser!, name: e.target.value}))}
                        />
                    </div>

                    <div className={"form_group"}>
                        <label htmlFor={"email"}>Email:</label>
                        <input
                            type="email" id={"email"}
                            value={user.email || ''}
                            onChange={(e) => setUser((prevUser) => ({...prevUser!, email: e.target.value}))}
                        />
                    </div>

                        <button type="button" onClick={handleUpdate}>
                            Update User
                        </button>
                </form>
                )}
        </div>
    );
};

export default UserUpdateForm;
