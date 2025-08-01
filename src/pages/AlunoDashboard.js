import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlunoDashboard.css';

const AlunoDashboard = () => {
  const [aluno, setAluno] = useState(null);
  const [fichaTreino, setFichaTreino] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        setCarregando(true);
        const token = localStorage.getItem('token');

        // Simulando dados mock quando o backend está offline
        if (!token) {
          throw new Error('Sem token de autenticação');
        }

        // Tenta buscar os dados reais
        try {
          const response = await axios.get('http://localhost:3333/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const userData = response.data;
          setAluno(userData);

          const fichaResponse = await axios.get(`http://localhost:3333/api/alunos/${userData.id}/ficha`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setFichaTreino(fichaResponse.data);
          setErro(null);
        } catch (apiError) {
          // Se a API falhar, usa dados mock
          console.warn('API offline, usando dados mock...', apiError);
          setAluno(getMockAluno());
          setFichaTreino(getMockFichaTreino());
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErro('Não foi possível conectar ao servidor. Mostrando dados de exemplo...');
        // Mostra dados mock mesmo com erro
        setAluno(getMockAluno());
        setFichaTreino(getMockFichaTreino());
      } finally {
        setCarregando(false);
      }
    };

    fetchAluno();
  }, []);

  // Dados mock para quando a API estiver offline
  const getMockAluno = () => ({
    nome: "João Silva",
    matricula: "JS20230001",
    peso: "75kg",
    altura: "1.75m",
    imc: "24.5",
    objetivo: "Hipertrofia",
    nivel: "Intermediário",
    membroDesde: "15/03/2023",
    vencimento: "15/09/2023",
    frequencia: 78,
    instrutor: "Carlos Machado"
  });

  const getMockFichaTreino = () => ({
    nome: "Treino ABC - Hipertrofia",
    objetivo: "Ganho de Massa Muscular",
    validoAte: "30/09/2023",
    observacoes: "Focar na execução correta dos movimentos e controle da fase excêntrica.",
    grupos: [
      {
        nome: "Peito e Tríceps",
        exercicios: [
          {
            nome: "Supino Reto",
            series: "4",
            repeticoes: "10-12",
            carga: "40kg",
            descanso: "90s"
          },
          {
            nome: "Supino Inclinado Halteres",
            series: "3",
            repeticoes: "12-15",
            carga: "18kg",
            descanso: "60s"
          }
        ]
      },
      {
        nome: "Costas e Bíceps",
        exercicios: [
          {
            nome: "Barra Fixa",
            series: "4",
            repeticoes: "8-10",
            carga: "Peso Corporal",
            descanso: "90s"
          }
        ]
      }
    ]
  });

  // Componente de carregamento
  const LoadingState = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando seus dados...</p>
    </div>
  );

  // Componente de erro (agora só aparece se não conseguir mostrar dados mock)
  const ErrorState = () => (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Ocorreu um erro</h3>
      <p>{erro}</p>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Tentar novamente
      </button>
    </div>
  );

  // Se estiver carregando, mostra o spinner
  if (carregando) return <LoadingState />;
  
  // Se houver erro E não tiver dados mock, mostra mensagem de erro
  if (erro && !aluno) return <ErrorState />;

  return (
    <div className="dashboard-container">
      {/* SEÇÃO DE PERFIL DO ALUNO */}
      <div className="profile-section">
        <div className="profile-header">
          <div className="avatar"><span className="user-icon">👤</span></div>
          <h2 className="user-name">{aluno.nome}</h2>
          <p className="user-title">#{aluno.matricula}</p>
        </div>

        <div className="stats-container">
          <h3 className="section-title">📊 Estatísticas</h3>
          <div className="stat-item"><span className="stat-label">⚖️ Peso</span><span className="stat-value">{aluno.peso}</span></div>
          <div className="stat-item"><span className="stat-label">📏 Altura</span><span className="stat-value">{aluno.altura}</span></div>
          <div className="stat-item"><span className="stat-label">🧮 IMC</span><span className="stat-value">{aluno.imc}</span></div>
          <div className="stat-item"><span className="stat-label">🎯 Objetivo</span><span className="stat-value">{aluno.objetivo}</span></div>
          <div className="stat-item"><span className="stat-label">📈 Nível</span><span className="stat-value">{aluno.nivel}</span></div>
        </div>

        <h3 className="section-title">📅 Plano Atual</h3>
        <div className="membership-info">
          <div className="membership-status"><span>Membro desde o dia:</span><span>{aluno.membroDesde}</span></div>
          <div className="membership-status"><span>Vencimento:</span><span>{aluno.vencimento}</span></div>
          <div className="membership-status"><span>Frequência:</span><span>{aluno.frequencia}%</span></div>
          <div className="progress-bar"><div className="progress" style={{ width: `${aluno.frequencia}%` }}></div></div>
        </div>

        <h3 className="section-title" style={{ marginTop: '2rem' }}>👨‍🏫 Instrutor</h3>
        <div className="membership-info">
          <div className="membership-status"><span>Responsável:</span><span>{aluno.instrutor}</span></div>
        </div>
      </div>

      {/* FICHA DE TREINO */}
      <div className="workout-section">
        <div className="workout-header">
          <h1 className="workout-title">Minha Ficha de Treino</h1>
          <div className="workout-date">📅 Válido até: {fichaTreino.validoAte}</div>
        </div>

        {erro && (
          <div className="offline-warning">
            <p>⚠️ Você está visualizando dados locais. Algumas informações podem estar desatualizadas.</p>
          </div>
        )}

        <div className="workout-plan">
          <div className="plan-header">
            <h2 className="plan-title">{fichaTreino.nome}</h2>
            <span className="plan-objective">{fichaTreino.objetivo}</span>
          </div>

          {fichaTreino.grupos.map((grupo, index) => (
            <div className="exercise-group" key={index}>
              <h3 className="group-title">🏋️ {grupo.nome}</h3>
              {grupo.exercicios.map((ex, exIndex) => (
                <div className="exercise-item" key={exIndex}>
                  <div className="exercise-name">{ex.nome}</div>
                  <div className="exercise-details">
                    <div className="exercise-detail"><div className="detail-label">Séries</div><div className="detail-value">{ex.series}</div></div>
                    <div className="exercise-detail"><div className="detail-label">Repetições</div><div className="detail-value">{ex.repeticoes}</div></div>
                    <div className="exercise-detail"><div className="detail-label">Carga</div><div className="detail-value">{ex.carga}</div></div>
                    <div className="exercise-detail"><div className="detail-label">Descanso</div><div className="detail-value">{ex.descanso}</div></div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="trainer-notes">
            <h4 className="notes-title">🏃 Observações do Instrutor</h4>
            <p>{fichaTreino.observacoes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboard;