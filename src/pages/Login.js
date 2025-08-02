import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getPrimaryRole } from '../utils/roleMapping';
import banner from '../assets/login-banner.jpg';
import '../styles/global.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/sessions/login', {
        email,
        password: senha,
      });

      const { token, user } = response.data;
      
      // Mapear o role do backend para o frontend
      const primaryRole = getPrimaryRole(user.roles);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', primaryRole);

      // Redirecionar baseado no role
      switch (primaryRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'recepcionista':
          navigate('/recepcionista');
          break;
        case 'professor':
          navigate('/professor');
          break;
        case 'aluno':
          navigate('/aluno');
          break;
        default:
          navigate('/home', { state: { perfil: primaryRole } });
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError(err.response?.data?.message || 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="login-links">
          <a href="#">Esqueceu a senha?</a>
          <a href="#">Primeiro acesso?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
