import React from 'react';
import './AlunoDashboard.css';

const AlunoDashboard = () => {
  // Dados fictícios do aluno
  const aluno = {
    nome: "Carlos Silva",
    matricula: "AC2023001",
    idade: 28,
    altura: "1,78m",
    peso: "82kg",
    imc: "25.8",
    objetivo: "Hipertrofia",
    instrutor: "Ana Paula Costa",
    membroDesde: "15/03/2022",
    vencimento: "15/03/2024",
    frequencia: 85,
    nivel: "Intermediário",
  };

  // Dados fictícios da ficha de treino
  const fichaTreino = {
    nome: "Treino ABC - Hipertrofia",
    objetivo: "Ganho de Massa Muscular",
    validoAte: "30/06/2023",
    grupos: [
      {
        nome: "Peito e Tríceps",
        exercicios: [
          { nome: "Supino Reto", series: "4", repeticoes: "10-12", carga: "40kg", descanso: "90s" },
          { nome: "Supino Inclinado Halteres", series: "3", repeticoes: "10-12", carga: "18kg", descanso: "90s" },
          { nome: "Crucifixo Máquina", series: "3", repeticoes: "12-15", carga: "30kg", descanso: "60s" },
          { nome: "Tríceps Corda", series: "3", repeticoes: "12-15", carga: "20kg", descanso: "60s" },
        ]
      },
      {
        nome: "Costas e Bíceps",
        exercicios: [
          { nome: "Barra Fixa", series: "4", repeticoes: "8-10", carga: "Peso Corporal", descanso: "90s" },
          { nome: "Remada Curvada", series: "3", repeticoes: "10-12", carga: "35kg", descanso: "90s" },
          { nome: "Puxada Alta", series: "3", repeticoes: "12-15", carga: "40kg", descanso: "60s" },
          { nome: "Rosca Direta", series: "3", repeticoes: "10-12", carga: "12kg", descanso: "60s" },
        ]
      },
      {
        nome: "Pernas e Ombro",
        exercicios: [
          { nome: "Agachamento Livre", series: "4", repeticoes: "8-10", carga: "60kg", descanso: "120s" },
          { nome: "Leg Press 45°", series: "3", repeticoes: "10-12", carga: "120kg", descanso: "90s" },
          { nome: "Elevação Lateral", series: "3", repeticoes: "12-15", carga: "8kg", descanso: "60s" },
          { nome: "Desenvolvimento Militar", series: "3", repeticoes: "10-12", carga: "20kg", descanso: "90s" },
        ]
      }
    ],
    observacoes: "Manter a técnica correta em todos os exercícios. Aumentar a carga gradualmente a cada 2 semanas. Manter ingestão proteica adequada para os objetivos."
  };

  return (
    <div className="dashboard-container">
      {/* Seção do Perfil */}
      <div className="profile-section">
        <div className="profile-header">
          <div className="avatar">
            <span className="user-icon">👤</span>
          </div>
          <h2 className="user-name">{aluno.nome}</h2>
          <p className="user-title">#{aluno.matricula}</p>
        </div>

        <div className="stats-container">
          <h3 className="section-title">📊 Estatísticas</h3>
          <div className="stat-item">
            <span className="stat-label">⚖️ Peso</span>
            <span className="stat-value">{aluno.peso}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📏 Altura</span>
            <span className="stat-value">{aluno.altura}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🧮 IMC</span>
            <span className="stat-value">{aluno.imc}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🎯 Objetivo</span>
            <span className="stat-value">{aluno.objetivo}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📈 Nível</span>
            <span className="stat-value">{aluno.nivel}</span>
          </div>
        </div>

        <h3 className="section-title">📅 Plano Atual</h3>
        <div className="membership-info">
          <div className="membership-status">
            <span>Membro desde:</span>
            <span>{aluno.membroDesde}</span>
          </div>
          <div className="membership-status">
            <span>Vencimento:</span>
            <span>{aluno.vencimento}</span>
          </div>
          <div className="membership-status">
            <span>Frequência:</span>
            <span>{aluno.frequencia}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${aluno.frequencia}%` }}></div>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '2rem' }}>👨‍🏫 Instrutor</h3>
        <div className="membership-info">
          <div className="membership-status">
            <span>Responsável:</span>
            <span>{aluno.instrutor}</span>
          </div>
        </div>
      </div>

      {/* Seção da Ficha de Treino */}
      <div className="workout-section">
        <div className="workout-header">
          <h1 className="workout-title">Minha Ficha de Treino</h1>
          <div className="workout-date">
            📅 Válido até: {fichaTreino.validoAte}
          </div>
        </div>

        <div className="workout-plan">
          <div className="plan-header">
            <h2 className="plan-title">{fichaTreino.nome}</h2>
            <span className="plan-objective">{fichaTreino.objetivo}</span>
          </div>

          {fichaTreino.grupos.map((grupo, index) => (
            <div className="exercise-group" key={index}>
              <h3 className="group-title">🏋️ {grupo.nome}</h3>
              
              {grupo.exercicios.map((exercicio, exIndex) => (
                <div className="exercise-item" key={exIndex}>
                  <div className="exercise-name">{exercicio.nome}</div>
                  <div className="exercise-details">
                    <div className="exercise-detail">
                      <div className="detail-label">Séries</div>
                      <div className="detail-value">{exercicio.series}</div>
                    </div>
                    <div className="exercise-detail">
                      <div className="detail-label">Repetições</div>
                      <div className="detail-value">{exercicio.repeticoes}</div>
                    </div>
                    <div className="exercise-detail">
                      <div className="detail-label">Carga</div>
                      <div className="detail-value">{exercicio.carga}</div>
                    </div>
                    <div className="exercise-detail">
                      <div className="detail-label">Descanso</div>
                      <div className="detail-value">{exercicio.descanso}</div>
                    </div>
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