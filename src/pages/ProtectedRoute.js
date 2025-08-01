import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== allowedRole) {
    return <Navigate to="/" replace />; // redireciona para o login
  }

  return children;
};

export default ProtectedRoute;
    