import React, { useState } from 'react';
import './RecepcionistaDashboard.css';

const initialAlunos = [
  { id: 1, nome: 'Lucas Silva', matricula: '2023001', plano: 'Mensal', vencimento: '2025-07-01', status: 'Ativo' },
  { id: 2, nome: 'Ana Souza', matricula: '2023002', plano: 'Trimestral', vencimento: '2025-09-15', status: 'Ativo' },
  { id: 3, nome: 'Carlos Pereira', matricula: '2022999', plano: 'Anual', vencimento: '2026-01-10', status: 'Inativo' },
];

const RecepcionistaDashboard = () => {
  const [alunos, setAlunos] = useState(initialAlunos);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ nome: '', matricula: '', plano: '', vencimento: '', status: 'Ativo' });

  const handleOpenModal = () => {
    setModalData({ nome: '', matricula: '', plano: '', vencimento: '', status: 'Ativo' });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = () => {
    if (!modalData.nome.trim() || !modalData.matricula.trim()) {
      alert('Nome e Matrícula são obrigatórios!');
      return;
    }

    if (modalData.id) {
      // Editar aluno existente
      setAlunos(alunos.map(aluno => aluno.id === modalData.id ? modalData : aluno));
    } else {
      // Adicionar novo aluno
      setAlunos([
        ...alunos,
        { ...modalData, id: alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1 }
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este aluno?')) {
      setAlunos(alunos.filter(a => a.id !== id));
    }
  };

  const handleEdit = (aluno) => {
    setModalData(aluno);
    setModalOpen(true);
  };

  return (
    <div className="recepcionista-dashboard-container">
      <div className="recepcionista-header">
        <h1>Recepcionista - Gerenciamento de Alunos</h1>
        <button className="add-button" onClick={handleOpenModal}>Adicionar Aluno</button>
      </div>

      <div className="recepcionista-table-container">
        <table className="recepcionista-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Plano</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum aluno cadastrado.
                </td>
              </tr>
            ) : (
              alunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.plano}</td>
                  <td>{aluno.vencimento}</td>
                  <td>
                    <span className={`status-badge ${aluno.status.toLowerCase()}`}>
                      {aluno.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEdit(aluno)}
                      title="Editar"
                    >
                      Editar
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(aluno.id)}
                      title="Remover"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="recepcionista-modal-overlay" onClick={handleCloseModal}>
          <div className="recepcionista-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalData.id ? 'Editar Aluno' : 'Adicionar Aluno'}</h2>
              <button className="close-button" onClick={handleCloseModal}>&times;</button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    value={modalData.nome}
                    onChange={(e) => setModalData({ ...modalData, nome: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Matrícula</label>
                  <input
                    type="text"
                    value={modalData.matricula}
                    onChange={(e) => setModalData({ ...modalData, matricula: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Plano</label>
                  <input
                    type="text"
                    value={modalData.plano}
                    onChange={(e) => setModalData({ ...modalData, plano: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Vencimento</label>
                  <input
                    type="date"
                    value={modalData.vencimento}
                    onChange={(e) => setModalData({ ...modalData, vencimento: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={modalData.status}
                    onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="save-button" onClick={handleSave}>
                Salvar
              </button>
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecepcionistaDashboard;
