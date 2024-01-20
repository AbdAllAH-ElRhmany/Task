import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface props {
    Component: React.ElementType;
}
const PrivateRoute: React.FC<props> = ({Component}) => {

    const isAuthenticated = localStorage.getItem('token') !== null;

    if(!isAuthenticated) return <Navigate to='/login' />;
    else return <Component  />
};

export default PrivateRoute;