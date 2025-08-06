import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import HeaderProfessor from './HeaderProfessor';
import './PhysicalAssessment.css';

const PhysicalAssessment = () => {
  const { id: studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Dados do professor (seriam obtidos do contexto/autenticação na aplicação real)
  const professor = {
    nome: "Professor",
    foto: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Dados mockados de alunos para demonstração
  const mockStudents = {
    "A20230001": {
      id: "A20230001",
      name: "Lucas Mendes",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      idade: 22,
      altura: 1.75,
      peso: 70,
      objetivo: "Hipertrofia"
    },
    "A20230002": {
      id: "A20230002",
      name: "Fernanda Alves",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      idade: 25,
      altura: 1.65,
      peso: 58,
      objetivo: "Emagrecimento"
    },
    "A20230003": {
      id: "A20230003",
      name: "Rafael Costa",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      idade: 28,
      altura: 1.80,
      peso: 85,
      objetivo: "Força"
    },
    "A20230004": {
      id: "A20230004",
      name: "Juliana Pereira",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      idade: 23,
      altura: 1.68,
      peso: 62,
      objetivo: "Definição Muscular"
    },
    "A20230005": {
      id: "A20230005",
      name: "Diego Rodrigues",
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
      idade: 26,
      altura: 1.72,
      peso: 75,
      objetivo: "Resistência"
    }
  };

  // Dados do aluno (vindos da navegação ou buscados via API)
  const [aluno, setAluno] = useState(location.state?.aluno || mockStudents[studentId] || {
    id: studentId,
    name: "Aluno",
    photo: "https://randomuser.me/api/portraits/lego/1.jpg",
    idade: 25,
    altura: 1.70,
    peso: 70,
    objetivo: "Hipertrofia"
  });

  // Estado da avaliação física
  const [avaliacao, setAvaliacao] = useState({
    data: new Date().toISOString().split('T')[0],
    peso: aluno.peso || 70,
    altura: aluno.altura || 1.70,
    imc: calcularIMC(aluno.peso || 70, aluno.altura || 1.70),
    gorduraCorporal: '',
    massaMuscular: '',
    circunferencias: {
      cintura: '',
      quadril: '',
      bracoDireito: '',
      bracoEsquerdo: '',
      coxaDireita: '',
      coxaEsquerda: ''
    },
    observacoes: '',
    objetivos: ''
  });

  // Carregar dados do aluno se não vierem via state
  useEffect(() => {
    if (!location.state?.aluno && studentId) {
      // Se não temos dados via state, busca nos dados mockados
      const mockStudent = mockStudents[studentId];
      if (mockStudent) {
        setAluno(mockStudent);
        setAvaliacao(prev => ({
          ...prev,
          peso: mockStudent.peso,
          altura: mockStudent.altura,
          imc: calcularIMC(mockStudent.peso, mockStudent.altura)
        }));
      }
    }
  }, [studentId, location.state]);

  // Função para calcular IMC
  function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
  }

  // Atualiza campos numéricos e recalcula IMC quando peso ou altura mudam
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setAvaliacao(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      
      // Recalcula IMC se peso ou altura foram alterados
      if (name === 'peso' || name === 'altura') {
        updated.imc = calcularIMC(
          name === 'peso' ? value : prev.peso,
          name === 'altura' ? value : prev.altura
        );
      }
      
      return updated;
    });
  };

  // Atualiza circunferências
  const handleCircunferenciaChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao(prev => ({
      ...prev,
      circunferencias: {
        ...prev.circunferencias,
        [name]: value
      }
    }));
  };

  // Submeter avaliação
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Avaliação submetida:', avaliacao);
    // Aqui você faria a chamada API para salvar a avaliação
    alert('Avaliação física salva com sucesso!');
  };

  // Cancelar e voltar
  const handleCancel = () => {
    navigate('/professor');
  };

  return (
    <div className="assessment-container">
      <HeaderProfessor professorNome={professor.nome} professorFoto={professor.foto} />
      
      <main className="assessment-content">
        <div className="assessment-header">
          <h1>Avaliação Física</h1>
          <div className="assessment-date">
            Data: {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Card do Aluno */}
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
            <p><strong>ID:</strong> #{aluno.id}</p>
            <p><strong>Idade:</strong> {aluno.idade} anos</p>
            <p><strong>Objetivo:</strong> {aluno.objetivo}</p>
          </div>
        </div>

        {/* Formulário de Avaliação */}
        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="form-section">
            <h3>Medidas Básicas</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Peso (kg)</label>
                <input
                  type="number"
                  name="peso"
                  value={avaliacao.peso}
                  onChange={handleChange}
                  step="0.1"
                  min="30"
                  max="200"
                  required
                />
              </div>
              <div className="form-group">
                <label>Altura (m)</label>
                <input
                  type="number"
                  name="altura"
                  value={avaliacao.altura}
                  onChange={handleChange}
                  step="0.01"
                  min="1.20"
                  max="2.50"
                  required
                />
              </div>
              <div className="form-group">
                <label>IMC</label>
                <div className="result-box">{avaliacao.imc}</div>
                <div className="imc-classification">
                  {classificarIMC(avaliacao.imc)}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Composição Corporal</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>% Gordura Corporal</label>
                <input
                  type="number"
                  name="gorduraCorporal"
                  value={avaliacao.gorduraCorporal}
                  onChange={handleChange}
                  step="0.1"
                  min="5"
                  max="50"
                />
              </div>
              <div className="form-group">
                <label>Massa Muscular (kg)</label>
                <input
                  type="number"
                  name="massaMuscular"
                  value={avaliacao.massaMuscular}
                  onChange={handleChange}
                  step="0.1"
                  min="20"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Observações e Objetivos</h3>
            <div className="form-group">
              <label>Observações</label>
              <textarea
                name="observacoes"
                value={avaliacao.observacoes}
                onChange={handleChange}
                rows="4"
                placeholder="Anotações sobre a avaliação física..."
              />
            </div>
            <div className="form-group">
              <label>Objetivos para o próximo período</label>
              <textarea
                name="objetivos"
                value={avaliacao.objetivos}
                onChange={handleChange}
                rows="4"
                placeholder="Metas a serem alcançadas..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Salvar Avaliação
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// Função auxiliar para calcular RCQ
function calcularRCQ(cintura, quadril) {
  if (!cintura || !quadril || parseFloat(quadril) === 0) return '-';
  const rcq = parseFloat(cintura) / parseFloat(quadril);
  return rcq.toFixed(2);
}

// Função auxiliar para classificar IMC
function classificarIMC(imc) {
  const value = parseFloat(imc);
  if (!value) return '';
  
  if (value < 18.5) return 'Abaixo do peso';
  if (value < 24.9) return 'Peso normal';
  if (value < 29.9) return 'Sobrepeso';
  if (value < 34.9) return 'Obesidade Grau I';
  if (value < 39.9) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
}

export default PhysicalAssessment;