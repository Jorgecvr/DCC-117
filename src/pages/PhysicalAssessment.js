import React, { useState } from 'react';
import Header from './HeaderProfessor';
import './PhysicalAssessment.css';

const PhysicalAssessment = () => {
  // Dados do professor (seriam obtidos do contexto/autenticação na aplicação real)
  const professor = {
    nome: "Carlos Silva",
    foto: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Dados do aluno (normalmente viria de uma seleção/anterior)
  const [aluno, setAluno] = useState({
    id: "A20230045",
    nome: "Ana Carolina Oliveira",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    idade: 28,
    altura: 1.68,
    peso: 65,
    objetivo: "Hipertrofia"
  });

  // Estado da avaliação física
  const [avaliacao, setAvaliacao] = useState({
    data: new Date().toISOString().split('T')[0],
    peso: aluno.peso,
    altura: aluno.altura,
    imc: calcularIMC(aluno.peso, aluno.altura),
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

  return (
    <div className="assessment-container">
      <Header professorNome={professor.nome} professorFoto={professor.foto} />
      
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
            <img src={aluno.foto} alt={aluno.nome} className="student-photo" />
          </div>
          <div className="student-info">
            <h2>{aluno.nome}</h2>
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

          {/* <div className="form-section">
            <h3>Circunferências (cm)</h3>
            <div className="form-grid three-columns">
              <div className="form-group">
                <label>Cintura</label>
                <input
                  type="number"
                  name="cintura"
                  value={avaliacao.circunferencias.cintura}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="50"
                  max="150"
                />
              </div>
              <div className="form-group">
                <label>Quadril</label>
                <input
                  type="number"
                  name="quadril"
                  value={avaliacao.circunferencias.quadril}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="60"
                  max="150"
                />
              </div>
              <div className="form-group">
                <label>RCQ</label>
                <div className="result-box">
                  {calcularRCQ(
                    avaliacao.circunferencias.cintura, 
                    avaliacao.circunferencias.quadril
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Braço Direito</label>
                <input
                  type="number"
                  name="bracoDireito"
                  value={avaliacao.circunferencias.bracoDireito}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="15"
                  max="60"
                />
              </div>
              <div className="form-group">
                <label>Braço Esquerdo</label>
                <input
                  type="number"
                  name="bracoEsquerdo"
                  value={avaliacao.circunferencias.bracoEsquerdo}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="15"
                  max="60"
                />
              </div>
              <div className="form-group">
                <label>Coxa Direita</label>
                <input
                  type="number"
                  name="coxaDireita"
                  value={avaliacao.circunferencias.coxaDireita}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="30"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Coxa Esquerda</label>
                <input
                  type="number"
                  name="coxaEsquerda"
                  value={avaliacao.circunferencias.coxaEsquerda}
                  onChange={handleCircunferenciaChange}
                  step="0.1"
                  min="30"
                  max="100"
                />
              </div>
            </div>
          </div> */}

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
            <button type="button" className="cancel-button">
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