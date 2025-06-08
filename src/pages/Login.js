import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/login-banner.jpg';
import '../styles/global.css';

const Login = () => {
  const [tipoUsuario, setTipoUsuario] = useState('aluno');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoUsuario === 'aluno') {
      navigate('/aluno');
    } else {
      navigate('/AdminDashboard');
    }
  };

  return (
    <div className="login-background">
      <div className="login-overlay"></div>
      <div className="login-card">
        <h2>Bem-vindo(a)</h2>
        <p>Acesse sua conta ou crie uma nova</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="login-select"
          >
            <option value="aluno">Aluno</option>
            <option value="funcionario">Funcionário</option>
          </select>

          <input type="email" placeholder="E-mail (simulado)" disabled />
          <input type="password" placeholder="Senha (simulada)" disabled />
          <button type="submit">Entrar</button>
        </form>

        <div className="login-links">
          <a href="#">Esqueceu a senha?</a>
          <a href="#">Primeiro acesso?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
