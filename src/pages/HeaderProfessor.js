import React from 'react';
import './HeaderProfessor.css';

const HeaderProfessor = ({ professorNome, professorFoto }) => {
  return (
    <header className="header-container">
      <div className="header-left">
        <div className="logo">UFJF GYM</div>
        <nav className="header-nav">
          <a href="/alunos" className="nav-link">Alunos</a>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{professorNome}</span>
          <img 
            src={professorFoto || 'https://randomuser.me/api/portraits/men/32.jpg'} 
            alt={professorNome} 
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderProfessor;