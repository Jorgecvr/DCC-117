import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import './ProfessorWorkoutEditor.css';
import HeaderProfessor from "./HeaderProfessor.js"

const ProfessorWorkoutEditor = () => {
  const { id: studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const [activeWorkout, setActiveWorkout] = useState(0);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  // Dados do professor (serão obtidos do token/contexto)
  const professor = {
    nome: "Arthur Busquet",
    foto: "https://randomuser.me/api/portraits/men/44.jpg"
  };

  // Função para transformar dados do frontend para o formato do backend
  const transformToBackendFormat = (workouts) => {
    console.log('Transformando workouts para backend:', workouts);
    
    // Verificar se há workouts válidos
    if (!workouts || workouts.length === 0) {
      console.error('Nenhum workout para transformar');
      return null;
    }

    const backendData = {
      nome: "Ficha de Treino",
      objetivo: workouts[0]?.objective || "hypertrophy",
      validoAte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      observacoes: workouts[0]?.notes || "",
      grupos: workouts.map(workout => {
        console.log('Processando workout:', workout);
        return {
          nome: workout.name || "Treino",
          exercicios: (workout.exercises || []).map(exercise => {
            console.log('Processando exercício:', exercise);
            return {
              nome: exercise.name || "",
              series: exercise.sets || "",
              repeticoes: exercise.reps || "",
              carga: exercise.weight || "",
              descanso: exercise.rest || ""
            };
          })
        };
      })
    };

    console.log('Dados transformados para backend:', backendData);
    return backendData;
  };

  // Função para transformar dados do backend para o formato do frontend
  const transformFromBackendFormat = (backendData) => {
    if (!backendData || !backendData.content) {
      return [];
    }

    const content = backendData.content;
    if (!content.grupos || !Array.isArray(content.grupos)) {
      return [];
    }

    return content.grupos.map((grupo, index) => ({
      id: index + 1,
      name: grupo.nome || `Treino ${index + 1}`,
      objective: content.objetivo || 'hypertrophy',
      notes: content.observacoes || '',
      exercises: (grupo.exercicios || []).map((exercicio, exIndex) => ({
        id: (index + 1) * 100 + exIndex + 1,
        name: exercicio.nome || '',
        sets: exercicio.series || '',
        reps: exercicio.repeticoes || '',
        weight: exercicio.carga || '',
        rest: exercicio.descanso || '',
        notes: ''
      }))
    }));
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setCarregando(true);
        setErro(null);

        // Se temos dados do aluno no state da navegação, use-os
        if (location.state?.aluno) {
          setAluno(location.state.aluno);
        } else {
          // Caso contrário, busque os dados do aluno pelo ID
          console.log('Buscando dados do aluno:', studentId);
          const studentData = await userService.getStudentWorkoutPlan(studentId);
          console.log('Dados do aluno recebidos:', studentData);
          setAluno(studentData);
        }

        // Buscar ficha de treino existente
        try {
          const workoutPlanData = await userService.getStudentWorkoutPlan(studentId);
          console.log('Ficha de treino recebida:', workoutPlanData);
          const transformedWorkouts = transformFromBackendFormat(workoutPlanData);
          setWorkouts(transformedWorkouts);
        } catch (workoutError) {
          console.log('Nenhuma ficha de treino encontrada, iniciando com treinos vazios');
          setWorkouts([]);
        }
      } catch (err) {
        console.error('Erro ao carregar dados do aluno:', err);
        setErro('Erro ao carregar dados do aluno. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId, location.state]);

  const handleSaveWorkoutPlan = async () => {
    try {
      setSalvando(true);
      setErro(null);
      setMensagemSucesso('');

      console.log('Iniciando salvamento da ficha de treino...');
      console.log('Workouts atuais:', workouts);

      if (workouts.length === 0) {
        setErro('Adicione pelo menos um treino antes de salvar.');
        return;
      }

      const backendData = transformToBackendFormat(workouts);
      
      if (!backendData) {
        setErro('Erro ao preparar dados para salvamento.');
        return;
      }

      console.log('Dados a serem enviados para o backend:', backendData);
      console.log('Student ID:', studentId);

      const response = await userService.saveStudentWorkoutPlan(studentId, backendData);
      console.log('Resposta do backend:', response);
      
      setMensagemSucesso('Ficha de treino salva com sucesso!');
      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (err) {
      console.error('Erro detalhado ao salvar ficha de treino:', err);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      console.error('Response headers:', err.response?.headers);
      
      let errorMessage = 'Erro ao salvar ficha de treino.';
      
      if (err.response?.data?.message) {
        errorMessage += ` ${err.response.data.message}`;
      } else if (err.message) {
        errorMessage += ` ${err.message}`;
      }
      
      setErro(errorMessage);
    } finally {
      setSalvando(false);
    }
  };

  const handleAddWorkout = (workoutName) => {
    const newWorkout = {
      id: Date.now(),
      name: workoutName,
      objective: 'hypertrophy',
      notes: '',
      exercises: []
    };
    setWorkouts([...workouts, newWorkout]);
    setActiveWorkout(workouts.length);
    setShowWorkoutModal(false);
  };

  const handleAddExercise = (newExercise) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[activeWorkout].exercises.push({
      id: Date.now(),
      ...newExercise
    });
    setWorkouts(updatedWorkouts);
    setShowExerciseModal(false);
  };

  const handleDeleteExercise = (exerciseId) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[activeWorkout].exercises = updatedWorkouts[activeWorkout].exercises.filter(
      ex => ex.id !== exerciseId
    );
    setWorkouts(updatedWorkouts);
  };

  const handleDeleteWorkout = () => {
    if (workouts.length <= 1) {
      setErro('Deve haver pelo menos um treino.');
      return;
    }
    
    const updatedWorkouts = workouts.filter((_, index) => index !== activeWorkout);
    setWorkouts(updatedWorkouts);
    setActiveWorkout(Math.max(0, activeWorkout - 1));
  };

  if (carregando) {
    return (
      <div className="professor-container">
        <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do aluno...</p>
        </div>
      </div>
    );
  }

  if (erro && !aluno) {
    return (
      <div className="professor-container">
        <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />
        <div className="error-container">
          <p>{erro}</p>
          <button onClick={() => navigate('/professor')} className="back-button">
            Voltar para Lista de Alunos
          </button>
        </div>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="professor-container">
        <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />
        <div className="error-container">
          <p>Aluno não encontrado.</p>
          <button onClick={() => navigate('/professor')} className="back-button">
            Voltar para Lista de Alunos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="professor-container">
      {/* Cabeçalho */}
      <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />

      <div className="workout-editor">
        {/* Informações do aluno */}
        <div className="student-card">
          <div className="student-photo-container">
            <img 
              src={aluno.photo || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
              alt={aluno.name} 
              className="student-photo"
              onError={(e) => {
                e.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
              }}
            />
          </div>
          <div className="student-info">
            <h2>{aluno.name}</h2>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>CPF:</strong> {aluno.cpf}</p>
            <p><strong>Membro desde:</strong> {new Date(aluno.createdAt).toLocaleDateString('pt-BR')}</p>
            {aluno.activeMembership && (
              <p><strong>Plano ativo:</strong> {aluno.activeMembership.type}</p>
            )}
          </div>
        </div>

        {/* Mensagens de erro e sucesso */}
        {erro && (
          <div className="error-message">
            <p>{erro}</p>
          </div>
        )}

        {mensagemSucesso && (
          <div className="success-message">
            <p>{mensagemSucesso}</p>
          </div>
        )}

        {/* Editor de ficha */}
        <div className="workout-content">
          {/* Lista de treinos */}
          <div className="workout-list">
            <h3>Treinos</h3>
            <ul>
              {workouts.map((workout, index) => (
                <li 
                  key={workout.id}
                  className={activeWorkout === index ? 'active' : ''}
                  onClick={() => setActiveWorkout(index)}
                >
                  {workout.name}
                  <span className="exercise-count">
                    {workout.exercises.length} ex.
                  </span>
                </li>
              ))}
              <button 
                className="add-workout-btn"
                onClick={() => setShowWorkoutModal(true)}
              >
                + Novo Treino
              </button>
            </ul>
          </div>

          {/* Formulário de treino */}
          <div className="workout-form">
            {workouts.length > 0 ? (
              <>
                <div className="workout-header">
                  <h2>{workouts[activeWorkout].name}</h2>
                  <div>
                    <button 
                      className="delete-training-btn"
                      onClick={handleDeleteWorkout}
                    >
                      Excluir treino
                    </button>
                    <select
                        value={workouts[activeWorkout].objective}
                        onChange={(e) => {
                        const updatedWorkouts = [...workouts];
                        updatedWorkouts[activeWorkout].objective = e.target.value;
                        setWorkouts(updatedWorkouts);
                        }}
                    >
                        <option value="hypertrophy">Hipertrofia</option>
                        <option value="weight-loss">Perda de Peso</option>
                        <option value="strength">Força</option>
                        <option value="endurance">Resistência</option>
                        <option value="toning">Definição Muscular</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Observações</label>
                  <textarea
                    value={workouts[activeWorkout].notes}
                    onChange={(e) => {
                      const updatedWorkouts = [...workouts];
                      updatedWorkouts[activeWorkout].notes = e.target.value;
                      setWorkouts(updatedWorkouts);
                    }}
                    placeholder="Anotações importantes sobre o treino..."
                  />
                </div>

                <h3>Exercícios</h3>
                
                {workouts[activeWorkout].exercises.length > 0 ? (
                  workouts[activeWorkout].exercises.map((exercise) => (
                    <div className="exercise-card" key={exercise.id}>
                      <div className="exercise-header">
                        <h4>{exercise.name}</h4>
                        <div className="exercise-actions">
                          <button className="edit-btn">Editar</button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteExercise(exercise.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                      <div className="exercise-details">
                        <div>
                          <span>Séries</span>
                          <strong>{exercise.sets}</strong>
                        </div>
                        <div>
                          <span>Repetições</span>
                          <strong>{exercise.reps}</strong>
                        </div>
                        <div>
                          <span>Carga</span>
                          <strong>{exercise.weight}</strong>
                        </div>
                        <div>
                          <span>Descanso</span>
                          <strong>{exercise.rest}</strong>
                        </div>
                      </div>
                      {exercise.notes && (
                        <div className="exercise-notes">
                          <p>{exercise.notes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Nenhum exercício adicionado a este treino.</p>
                  </div>
                )}

                <button 
                  className="add-exercise-btn"
                  onClick={() => setShowExerciseModal(true)}
                >
                  + Adicionar Exercício
                </button>
              </>
            ) : (
              <div className="empty-workout-state">
                <p>Nenhum treino criado ainda.</p>
                <button 
                  className="add-workout-btn"
                  onClick={() => setShowWorkoutModal(true)}
                >
                  + Criar Primeiro Treino
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="cancel-btn"
            onClick={() => navigate('/professor')}
          >
            Cancelar
          </button>
          <button 
            className="save-btn"
            onClick={handleSaveWorkoutPlan}
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar Ficha'}
          </button>
        </div>
      </div>

      {/* Modal para adicionar treino */}
      {showWorkoutModal && (
        <AddWorkoutModal 
          onClose={() => setShowWorkoutModal(false)}
          onSave={handleAddWorkout}
        />
      )}

      {/* Modal para adicionar exercício */}
      {showExerciseModal && workouts.length > 0 && (
        <AddExerciseModal 
          onClose={() => setShowExerciseModal(false)}
          onSave={handleAddExercise}
        />
      )}
    </div>
  );
};

// Componente Modal para adicionar treino
const AddWorkoutModal = ({ onClose, onSave }) => {
  const [workoutName, setWorkoutName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workoutName.trim()) {
      onSave(workoutName);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Novo Treino</h3>
          <button onClick={onClose} className="close-modal">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Treino</label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Ex: Costas e Bíceps, Peito e Perna"
              required
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Criar Treino
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Modal para adicionar exercício
const AddExerciseModal = ({ onClose, onSave }) => {
  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (exercise.name && exercise.sets && exercise.reps) {
      onSave(exercise);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Adicionar Exercício</h3>
          <button onClick={onClose} className="close-modal">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Exercício</label>
            <input
              type="text"
              name="name"
              value={exercise.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Séries</label>
              <input
                type="text"
                name="sets"
                value={exercise.sets}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Repetições</label>
              <input
                type="text"
                name="reps"
                value={exercise.reps}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Carga</label>
              <input
                type="text"
                name="weight"
                value={exercise.weight}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Descanso</label>
              <input
                type="text"
                name="rest"
                value={exercise.rest}
                onChange={handleChange}
                placeholder=""
              />
            </div>
          </div>
          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="notes"
              value={exercise.notes}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Adicionar Exercício
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessorWorkoutEditor;