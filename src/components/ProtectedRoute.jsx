// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../helpers/auth';

const ProtectedRoute = ({ requiredRole, redirectTo, children }) => {
    const { isAuthenticated, role } = checkAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
