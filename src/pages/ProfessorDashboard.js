import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import HeaderProfessor from './HeaderProfessor';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  // Dados do professor (serão obtidos do token/contexto)
  const professor = {
    nome: "Arthur Busquet",
    foto: "https://randomuser.me/api/portraits/men/44.jpg"
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      console.log('Buscando lista de alunos do professor...');
      const data = await userService.getStudentsList();
      console.log('Dados dos alunos recebidos:', data);
      setAlunos(data);
    } catch (err) {
      console.error('Erro ao carregar alunos:', err);
      setErro('Erro ao carregar alunos do servidor. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSelectAluno = (aluno) => {
    // Navegar para o editor de treino com o ID do aluno
    navigate(`/professor/aluno/${aluno.studentId}`, { 
      state: { aluno } 
    });
  };

  const handleViewAssessment = (aluno) => {
    // Navegar para visualizar avaliação física do aluno
    navigate(`/professor/avaliacao/${aluno.studentId}`, { 
      state: { aluno } 
    });
  };

  return (
    <div className="professor-dashboard-container">
      <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />
      
      <div className="professor-content">
        <div className="professor-header">
          <h1>Meus Alunos</h1>
          <p>Gerencie os treinos e acompanhe o progresso dos seus alunos</p>
        </div>

        {carregando && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando alunos...</p>
          </div>
        )}

        {erro && (
          <div className="error-container">
            <p>{erro}</p>
            <button onClick={fetchAlunos} className="retry-button">
              Tentar Novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <div className="students-grid">
            {alunos.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum aluno encontrado.</p>
              </div>
            ) : (
              alunos.map(aluno => (
                <div key={aluno.id} className="student-card">
                  <div className="student-photo">
                    <img 
                      src={aluno.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                      alt={aluno.name}
                      onError={(e) => {
                        e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="student-info">
                    <h3>{aluno.name}</h3>
                    <p className="student-email">{aluno.email}</p>
                    <p className="student-cpf">CPF: {aluno.cpf}</p>
                    
                    <div className="membership-status">
                      <span className={`status-badge ${aluno.activeMembership ? 'ativo' : 'inativo'}`}>
                        {aluno.activeMembership ? 'Mensalidade Ativa' : 'Mensalidade Inativa'}
                      </span>
                      {aluno.activeMembership && (
                        <p className="membership-date">
                          Desde: {new Date(aluno.activeMembership.startDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="student-actions">
                    <button 
                      className="action-button primary"
                      onClick={() => handleSelectAluno(aluno)}
                    >
                      Editar Treino
                    </button>
                    <button 
                      className="action-button secondary"
                      onClick={() => handleViewAssessment(aluno)}
                    >
                      Ver Avaliação
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard; 