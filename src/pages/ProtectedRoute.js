import React from 'react';
import { Navigate } from 'react-router-dom';
import { getPrimaryRole } from '../utils/roleMapping';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const storedRole = localStorage.getItem('role');

  // Se não há token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se não há role armazenado, tenta obter do usuário
  if (!storedRole && user.roles) {
    const primaryRole = getPrimaryRole(user.roles);
    localStorage.setItem('role', primaryRole);
    
    if (primaryRole !== allowedRole) {
      return <Navigate to="/" replace />;
    }
  } else if (storedRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
    