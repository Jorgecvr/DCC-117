import React from 'react';
import styled from 'styled-components';
import { FaDumbbell, FaRunning, FaHeartbeat, FaWeight, FaChartLine, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ProfileSection = styled.div`
  width: 350px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 2rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorkoutSection = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ecf0f1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  overflow: hidden;
  border: 4px solid #3498db;
  
  svg {
    color: #7f8c8d;
    font-size: 60px;
  }
`;

const UserName = styled.h2`
  margin: 0;
  color: #ecf0f1;
  font-size: 1.8rem;
`;

const UserTitle = styled.p`
  margin: 0.5rem 0 0;
  color: #bdc3c7;
  font-size: 1rem;
`;

const StatsContainer = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #bdc3c7;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.span`
  color: white;
  font-weight: bold;
`;

const SectionTitle = styled.h3`
  color: #ecf0f1;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MembershipInfo = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
`;

const MembershipStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #3498db;
  border-radius: 4px;
`;

const WorkoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const WorkoutTitle = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 2rem;
`;

const WorkoutDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
`;

const WorkoutPlan = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
`;

const PlanTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
`;

const PlanObjective = styled.span`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ExerciseGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupTitle = styled.h3`
  color: #3498db;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ExerciseName = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

const ExerciseDetails = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ExerciseDetail = styled.div`
  text-align: center;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 0.3rem;
`;

const DetailValue = styled.div`
  font-weight: bold;
  color: #2c3e50;
`;

const TrainerNotes = styled.div`
  background-color: #fff8e1;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border-left: 4px solid #ffc107;
`;

const NotesTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #ff8f00;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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
    <DashboardContainer>
      {/* Seção do Perfil */}
      <ProfileSection>
        <ProfileHeader>
          <Avatar>
            <FaUserCircle size={80} />
          </Avatar>
          <UserName>{aluno.nome}</UserName>
          <UserTitle>#{aluno.matricula}</UserTitle>
        </ProfileHeader>

        <StatsContainer>
          <SectionTitle>
            <FaChartLine /> Estatísticas
          </SectionTitle>
          <StatItem>
            <StatLabel><FaWeight /> Peso</StatLabel>
            <StatValue>{aluno.peso}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Altura</StatLabel>
            <StatValue>{aluno.altura}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>IMC</StatLabel>
            <StatValue>{aluno.imc}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel><FaHeartbeat /> Objetivo</StatLabel>
            <StatValue>{aluno.objetivo}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Nível</StatLabel>
            <StatValue>{aluno.nivel}</StatValue>
          </StatItem>
        </StatsContainer>

        <SectionTitle>
          <FaCalendarAlt /> Plano Atual
        </SectionTitle>
        <MembershipInfo>
          <MembershipStatus>
            <span>Membro desde:</span>
            <span>{aluno.membroDesde}</span>
          </MembershipStatus>
          <MembershipStatus>
            <span>Vencimento:</span>
            <span>{aluno.vencimento}</span>
          </MembershipStatus>
          <MembershipStatus>
            <span>Frequência:</span>
            <span>{aluno.frequencia}%</span>
          </MembershipStatus>
          <ProgressBar>
            <Progress percentage={aluno.frequencia} />
          </ProgressBar>
        </MembershipInfo>

        <SectionTitle style={{ marginTop: '2rem' }}>
          <FaUserCircle /> Instrutor
        </SectionTitle>
        <MembershipInfo>
          <MembershipStatus>
            <span>Responsável:</span>
            <span>{aluno.instrutor}</span>
          </MembershipStatus>
        </MembershipInfo>
      </ProfileSection>

      {/* Seção da Ficha de Treino */}
      <WorkoutSection>
        <WorkoutHeader>
          <WorkoutTitle>Minha Ficha de Treino</WorkoutTitle>
          <WorkoutDate>
            <FaCalendarAlt /> Válido até: {fichaTreino.validoAte}
          </WorkoutDate>
        </WorkoutHeader>

        <WorkoutPlan>
          <PlanHeader>
            <PlanTitle>{fichaTreino.nome}</PlanTitle>
            <PlanObjective>{fichaTreino.objetivo}</PlanObjective>
          </PlanHeader>

          {fichaTreino.grupos.map((grupo, index) => (
            <ExerciseGroup key={index}>
              <GroupTitle>
                <FaDumbbell /> {grupo.nome}
              </GroupTitle>
              
              {grupo.exercicios.map((exercicio, exIndex) => (
                <ExerciseItem key={exIndex}>
                  <ExerciseName>{exercicio.nome}</ExerciseName>
                  <ExerciseDetails>
                    <ExerciseDetail>
                      <DetailLabel>Séries</DetailLabel>
                      <DetailValue>{exercicio.series}</DetailValue>
                    </ExerciseDetail>
                    <ExerciseDetail>
                      <DetailLabel>Repetições</DetailLabel>
                      <DetailValue>{exercicio.repeticoes}</DetailValue>
                    </ExerciseDetail>
                    <ExerciseDetail>
                      <DetailLabel>Carga</DetailLabel>
                      <DetailValue>{exercicio.carga}</DetailValue>
                    </ExerciseDetail>
                    <ExerciseDetail>
                      <DetailLabel>Descanso</DetailLabel>
                      <DetailValue>{exercicio.descanso}</DetailValue>
                    </ExerciseDetail>
                  </ExerciseDetails>
                </ExerciseItem>
              ))}
            </ExerciseGroup>
          ))}

          <TrainerNotes>
            <NotesTitle>
              <FaRunning /> Observações do Instrutor
            </NotesTitle>
            <p>{fichaTreino.observacoes}</p>
          </TrainerNotes>
        </WorkoutPlan>
      </WorkoutSection>
    </DashboardContainer>
  );
};

export default AlunoDashboard;