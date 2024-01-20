import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
    const { user, setUser } = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Clear user data from the context
        setUser(null);

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className={"header"}>
            <div className={"container"}>
            <div className={"logo"}>
                {user ? (
                    <div>
                        <p>Welcome, {user.name}!</p>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                ) : (
                    <p>Please log in</p>
                )}
            </div>
            <nav>
                <ul>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">Home</Link>
                    </li>
                    {user && (
                        <li className={location.pathname === '/profile' ? 'active' : ''}>
                            <Link to={`/edit/${user.id}`}>My Data</Link>
                        </li>
                    )}
                </ul>
            </nav>
            </div>
        </div>
    );
};

export default Header;
