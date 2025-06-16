import React, { useState } from 'react';
import './ProfessorWorkoutEditor.css';
import HeaderProfessor from "./HeaderProfessor.js"

const ProfessorWorkoutEditor = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Costas e Bíceps',
      objective: 'hypertrophy',
      notes: 'Focar na execução correta dos movimentos',
      exercises: [
        {
          id: 101,
          name: 'Barra Fixa',
          sets: '4',
          reps: '8-10',
          weight: 'Peso Corporal',
          rest: '90s',
          notes: 'Execução completa'
        },
        {
          id: 102,
          name: 'Rosca Direta',
          sets: '3',
          reps: '10-12',
          weight: '12kg',
          rest: '60s',
          notes: 'Controle a descida'
        }
      ]
    },
    {
      id: 2,
      name: 'Peito e Tríceps',
      objective: 'hypertrophy',
      notes: 'Manter boa amplitude de movimento',
      exercises: [
        {
          id: 201,
          name: 'Supino Reto',
          sets: '4',
          reps: '10-12',
          weight: '40kg',
          rest: '90s',
          notes: 'Controle a descida'
        }
      ]
    }
  ]);

  const [activeWorkout, setActiveWorkout] = useState(0);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  // Dados fictícios do aluno
  const aluno = {
    nome: "Ana Carolina Oliveira",
    matricula: "AC20230045",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    membroDesde: "15/03/2023",
    objetivo: "Hipertrofia",
    instrutor: "Arthur Busquet"
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

  return (
    <div className="professor-container">
      {/* Cabeçalho */}
    <HeaderProfessor professorNome={"Arthur Busquet"} professorFoto="https://randomuser.me/api/portraits/men/44.jpg" />

      <div className="workout-editor">
        {/* Informações do aluno */}
        <div className="student-card">
          <div className="student-photo-container">
            <img src={aluno.foto} alt={aluno.nome} className="student-photo" />
          </div>
          <div className="student-info">
            <h2>{aluno.nome}</h2>
            <p><strong>Matrícula:</strong> #{aluno.matricula}</p>
            <p><strong>Membro desde:</strong> {aluno.membroDesde}</p>
            <p><strong>Objetivo atual:</strong> {aluno.objetivo}</p>
          </div>
        </div>

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
                    <button className="delete-training-btn">Excluir treino</button>
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
          <button className="cancel-btn">Cancelar</button>
          <button className="save-btn">Salvar Ficha</button>
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
                placeholder="Ex: 60s"
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