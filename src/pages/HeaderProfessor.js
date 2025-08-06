import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HeaderProfessor.css';

const HeaderProfessor = ({ professorNome, professorFoto }) => {
  const location = useLocation();
  const isOnDashboard = location.pathname === '/professor';
  
  return (
    <header className="header-container">
      <div className="header-left">
        <div className="logo">UFJF GYM</div>
        <nav className="header-nav">
          {!isOnDashboard && (
            <Link to="/professor" className="nav-link">Meus Alunos</Link>
          )}
        </nav>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Professor</span>
          <img 
            src={professorFoto || 'https://randomuser.me/api/portraits/men/32.jpg'} 
            alt="Professor" 
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderProfessor;