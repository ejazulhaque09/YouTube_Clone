import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isLoggedIn, user } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/signup" replace />;
    }

    if (adminOnly && user?.role !== 'admin') {
        // If it's an admin only route and user is not admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
