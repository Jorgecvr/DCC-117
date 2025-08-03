import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
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
        setErro(null);

        // Buscar perfil completo do aluno
        console.log('Buscando perfil do aluno...');
        const alunoData = await userService.getStudentProfile();
        console.log('Dados do aluno recebidos:', alunoData);
        setAluno(alunoData);

        // Buscar ficha de treino se o aluno tiver um ID de estudante
        if (alunoData.workoutPlan) {
          setFichaTreino(alunoData.workoutPlan);
        } else {
          // Se não tiver ficha de treino, criar uma estrutura vazia
          setFichaTreino({
            content: {
              nome: "Nenhuma ficha de treino encontrada",
              objetivo: "Aguardando criação pelo instrutor",
              validoAte: "Não definido",
              observacoes: "Entre em contato com seu instrutor para criar uma ficha de treino personalizada.",
              grupos: []
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErro('Erro ao carregar dados do servidor. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    fetchAluno();
  }, []);



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
          <div className="workout-date">📅 Válido até: {fichaTreino.content?.validoAte || "Não definido"}</div>
        </div>

        {erro && (
          <div className="offline-warning">
            <p>⚠️ {erro}</p>
          </div>
        )}

        <div className="workout-plan">
          <div className="plan-header">
            <h2 className="plan-title">{fichaTreino.content?.nome || "Ficha de Treino"}</h2>
            <span className="plan-objective">{fichaTreino.content?.objetivo || "Objetivo não definido"}</span>
          </div>

          {fichaTreino.content?.grupos && fichaTreino.content.grupos.length > 0 ? (
            fichaTreino.content.grupos.map((grupo, index) => (
              <div className="exercise-group" key={index}>
                <h3 className="group-title">🏋️ {grupo.nome}</h3>
                {grupo.exercicios && grupo.exercicios.map((ex, exIndex) => (
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
            ))
          ) : (
            <div className="no-workout-plan">
              <p>Nenhum exercício encontrado na ficha de treino.</p>
            </div>
          )}

          <div className="trainer-notes">
            <h4 className="notes-title">🏃 Observações do Instrutor</h4>
            <p>{fichaTreino.content?.observacoes || "Nenhuma observação disponível."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboard;