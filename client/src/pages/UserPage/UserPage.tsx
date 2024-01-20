import React from 'react';
import { useParams } from 'react-router-dom';
import UserUpdateForm from "../../components/UserUpdateForm/UserUpdateForm";

const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const parsedUserId = userId ? parseInt(userId, 10) : undefined;

    return (
        <div>
            <UserUpdateForm userId={parsedUserId} />
        </div>
    );
};

export default UserPage;
