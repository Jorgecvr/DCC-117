import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const perfil = location.state?.perfil;

  if (!perfil) return <Navigate to="/" />;

  if (perfil === 'admin') return <h2>Bem-vindo, Admin</h2>;
  if (perfil === 'recepcionista') return <h2>Bem-vindo, Recepcionista</h2>;
  if (perfil === 'professor') return <h2>Bem-vindo, Professor</h2>;
  if (perfil === 'estagiario') return <h2>Bem-vindo, Estagiário</h2>;
  if (perfil === 'aluno') return <h2>Bem-vindo, Aluno</h2>;

  return <h2>Perfil desconhecido</h2>;
}

export default Home;
