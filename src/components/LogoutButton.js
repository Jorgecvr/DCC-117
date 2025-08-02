import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar dados do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    
    // Redirecionar para login
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout}
      className={`logout-button ${className}`}
      style={{
        background: 'none',
        border: 'none',
        color: '#ff4757',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#ff4757';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#ff4757';
      }}
    >
      Sair
    </button>
  );
};

export default LogoutButton; 