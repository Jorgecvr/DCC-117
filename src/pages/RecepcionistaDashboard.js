import React, { useState, useEffect } from 'react';
import './RecepcionistaDashboard.css';

const API_URL = '/api/alunos'; // ajuste conforme seu backend

const RecepcionistaDashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ nome: '', matricula: '', plano: '', vencimento: '', status: 'Ativo' });

  // Carregar alunos ao iniciar
  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAlunos(data);
    } catch (err) {
      alert('Erro ao carregar alunos.');
    }
  };

  const handleOpenModal = () => {
    setModalData({ nome: '', matricula: '', plano: '', vencimento: '', status: 'Ativo' });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = async () => {
    if (!modalData.nome.trim() || !modalData.matricula.trim()) {
      alert('Nome e Matrícula são obrigatórios!');
      return;
    }

    try {
      if (modalData.id) {
        // Atualizar aluno
        const res = await fetch(`${API_URL}/${modalData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modalData),
        });
        if (!res.ok) throw new Error();
      } else {
        // Criar novo aluno
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modalData),
        });
        if (!res.ok) throw new Error();
      }
      fetchAlunos(); // recarregar lista
      setModalOpen(false);
    } catch {
      alert('Erro ao salvar aluno.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este aluno?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      fetchAlunos();
    } catch {
      alert('Erro ao deletar aluno.');
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
                    >
                      Editar
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(aluno.id)}
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
