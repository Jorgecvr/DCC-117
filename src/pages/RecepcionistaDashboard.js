import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import './RecepcionistaDashboard.css';

const RecepcionistaDashboard = () => {
  const [alunos, setAlunos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ nome: '', email: '', cpf: '', plano: '', vencimento: '', status: 'Ativo' });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Carregar alunos ao iniciar
  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      console.log('Buscando lista de alunos...');
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

  const handleOpenModal = () => {
    setModalData({ nome: '', email: '', cpf: '', plano: '', vencimento: '', status: 'Ativo' });
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleSave = async () => {
    if (!modalData.nome.trim() || !modalData.email.trim()) {
      alert('Nome e Email são obrigatórios!');
      return;
    }

    try {
      if (modalData.id) {
        // Atualizar aluno existente
        await userService.updateUser(modalData.id, {
          name: modalData.nome,
          email: modalData.email,
          cpf: modalData.cpf
        });
        alert('Aluno atualizado com sucesso!');
      } else {
        // Criar novo aluno
        await userService.createUser({
          name: modalData.nome,
          email: modalData.email,
          cpf: modalData.cpf,
          password: '654321', // Senha padrão
          isStudent: true
        });
        alert('Aluno criado com sucesso!');
      }
      
      setModalOpen(false);
      fetchAlunos(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este aluno?')) return;

    try {
      await userService.deleteUser(id);
      alert('Aluno removido com sucesso!');
      fetchAlunos(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      alert('Erro ao deletar aluno: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (aluno) => {
    setModalData({
      id: aluno.id,
      nome: aluno.name,
      email: aluno.email,
      cpf: aluno.cpf,
      plano: aluno.activeMembership ? aluno.activeMembership.type : ''
    });
    setModalOpen(true);
  };

  return (
    <div className="recepcionista-dashboard-container">
      <div className="recepcionista-header">
        <h1>Recepcionista - Gerenciamento de Alunos</h1>
        <button className="add-button" onClick={handleOpenModal}>Adicionar Aluno</button>
      </div>

      {carregando && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Carregando alunos...
        </div>
      )}

      {erro && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {erro}
        </div>
      )}

      {!carregando && !erro && (
        <div className="recepcionista-table-container">
          <table className="recepcionista-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Plano Ativo</th>
                <th>Data de Início</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    Nenhum aluno cadastrado.
                  </td>
                </tr>
              ) : (
                alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.name}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.activeMembership ? aluno.activeMembership.type : 'Sem plano'}</td>
                    <td>
                      {aluno.activeMembership 
                        ? new Date(aluno.activeMembership.startDate).toLocaleDateString('pt-BR')
                        : 'N/A'
                      }
                    </td>
                    <td>
                      <span className={`status-badge ${aluno.activeMembership ? 'ativo' : 'inativo'}`}>
                        {aluno.activeMembership ? 'Ativo' : 'Inativo'}
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
      )}

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
                  <label>Email</label>
                  <input
                    type="email"
                    value={modalData.email}
                    onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>CPF</label>
                  <input
                    type="text"
                    value={modalData.cpf}
                    onChange={(e) => setModalData({ ...modalData, cpf: e.target.value })}
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
