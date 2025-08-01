import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import banner from '../assets/login-banner.jpg';
import '../styles/global.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3333/api/sessions/login', {
  //       email,
  //       password: senha,
  //     });

  //     const { token, user } = response.data;
      

  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('role', user.role.toLowerCase());

  //     switch (user.role.toLowerCase()) {
  //       case 'admin':
  //         navigate('/admin');
  //         break;
  //       case 'recepcionista':
  //         navigate('/recepcionista');
  //         break;
  //       case 'professor':
  //         navigate('/professor');
  //         break;
  //       case 'aluno':
  //         navigate('/aluno');
  //         break;
  //       default:
  //         navigate('/home', { state: { perfil: user.role } });
  //     }
  //   } catch (err) {
  //     navigate('/aluno');
  //     console.error(err);
  //     setError('Email ou senha inválidos.');
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 👇 Simulando login como ALUNO
    const fakeUser = {
      role: 'admin',
      email,
    };
    const fakeToken = 'fake-token';

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    localStorage.setItem('role', fakeUser.role.toLowerCase());

    navigate('/admin'); // Redireciona para a dashboard do aluno
  } catch (err) {
    console.error(err);
    setError('Erro na simulação.');
  }
};

  return (
    <div className="login-background">
      <div className="login-overlay"></div>
      <div className="login-card">
        <h2>Bem-vindo(a)</h2>
        <p>Acesse sua conta</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="login-links">
          <a href="#">Esqueceu a senha?</a>
          <a href="#">Primeiro acesso?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
