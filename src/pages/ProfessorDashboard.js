import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('alunos');
  
  const funcionarios = [
    {
      id: 1,
      nome: "Ana Paula Costa",
      email: "ana.costa@academia.com",
      cargo: "Instrutora",
      tipo: "Professor",
      dataContratacao: "10/05/2020",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Marcos Oliveira",
      email: "marcos.oliveira@academia.com",
      cargo: "Recepcionista",
      tipo: "Recepcionista",
      dataContratacao: "15/03/2021",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Carlos Eduardo",
      email: "carlos.eduardo@academia.com",
      cargo: "Estagiário",
      tipo: "Estagiário",
      dataContratacao: "05/01/2023",
      status: "Ativo"
    },
    {
      id: 4,
      nome: "Juliana Santos",
      email: "juliana.santos@academia.com",
      cargo: "Instrutora",
      tipo: "Professor",
      dataContratacao: "22/08/2019",
      status: "Inativo"
    }
  ];

  const alunos = [
    {
      id: 1,
      nome: "Carlos Silva",
      matricula: "AC2023001",
      email: "carlos.silva@email.com",
      dataInicio: "15/03/2022",
      status: "Ativo",
      plano: "Premium",
      vencimento: "15/03/2024"
    },
    {
      id: 2,
      nome: "Mariana Oliveira",
      matricula: "AC2023002",
      email: "mariana.oliveira@email.com",
      dataInicio: "10/04/2022",
      status: "Ativo",
      plano: "Básico",
      vencimento: "10/04/2023"
    },
    {
      id: 3,
      nome: "Ricardo Andrade",
      matricula: "AC2023003",
      email: "ricardo.andrade@email.com",
      dataInicio: "05/01/2023",
      status: "Inativo",
      plano: "Premium",
      vencimento: "05/01/2024"
    },
    {
      id: 4,
      nome: "Fernanda Costa",
      matricula: "AC2023004",
      email: "fernanda.costa@email.com",
      dataInicio: "20/02/2023",
      status: "Ativo",
      plano: "Intermediário",
      vencimento: "20/02/2024"
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item, type) => {
    setModalData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setModalData(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleSave = () => {
    console.log('Salvando:', modalData);
    handleCloseModal();
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <div className="admin-profile-header">
          <div className="admin-avatar">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="user-photo" />
          </div>
          <h2 className="admin-name">Professor</h2>
          <p className="admin-role">Arthur Busquet</p>
        </div>

        <nav className="admin-menu">
          <button 
            className={`menu-item ${activeTab === 'alunos' ? 'active' : ''}`}
            onClick={() => setActiveTab('alunos')}
          >
            🏋️ Alunos
          </button>
          {/* <button className="menu-item">
            ⚙️ Configurações
          </button> */}
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">
            {activeTab === 'funcionarios' ? 'Gerenciamento de Funcionários' : 'Gerenciamento de Alunos'}
          </h1>
        </div>

        <div className="admin-table-container">
          {activeTab === 'funcionarios' ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cargo</th>
                  <th>Tipo</th>
                  <th>Data de Contratação</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map(funcionario => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.id}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.cargo}</td>
                    <td>{funcionario.tipo}</td>
                    <td>{funcionario.dataContratacao}</td>
                    <td>
                      <span className={`status-badge ${funcionario.status === 'Ativo' ? 'active' : 'inactive'}`}>
                        {funcionario.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="action-button edit"
                        onClick={() => handleEdit(funcionario, 'funcionario')}
                      >
                        Ficha de treino
                      </button>
                      <button className="action-button delete">
                        Avaliação física
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Data de Início</th>
                  <th>Plano</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.dataInicio}</td>
                    <td>{aluno.plano}</td>
                    <td>{aluno.vencimento}</td>
                    <td>
                      <span className={`status-badge ${aluno.status === 'Ativo' ? 'active' : 'inactive'}`}>
                        {aluno.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="action-button edit"
                        onClick={() => handleEdit(aluno, 'aluno')}
                      >
                        Ficha de treino
                      </button>
                      <button className="action-button delete">
                        Avaliação física
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h2>{isEditing ? 'Editar' : 'Adicionar'} {activeTab === 'funcionarios' ? 'Funcionário' : 'Aluno'}</h2>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              {activeTab === 'funcionarios' ? (
                <form>
                  <div className="form-group">
                    <label>Nome</label>
                    <input 
                      type="text" 
                      value={modalData?.nome || ''}
                      onChange={(e) => setModalData({...modalData, nome: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={modalData?.email || ''}
                      onChange={(e) => setModalData({...modalData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Cargo</label>
                    <input 
                      type="text" 
                      value={modalData?.cargo || ''}
                      onChange={(e) => setModalData({...modalData, cargo: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo</label>
                    <input 
                      type="text" 
                      value={modalData?.tipo || ''}
                      onChange={(e) => setModalData({...modalData, tipo: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Data de Contratação</label>
                    <input 
                      type="text" 
                      value={modalData?.dataContratacao || ''}
                      onChange={(e) => setModalData({...modalData, dataContratacao: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      value={modalData?.status || ''}
                      onChange={(e) => setModalData({...modalData, status: e.target.value})}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </form>
              ) : (
                <form>
                  <div className="form-group">
                    <label>Nome</label>
                    <input 
                      type="text" 
                      value={modalData?.nome || ''}
                      onChange={(e) => setModalData({...modalData, nome: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Matrícula</label>
                    <input 
                      type="text" 
                      value={modalData?.matricula || ''}
                      onChange={(e) => setModalData({...modalData, matricula: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={modalData?.email || ''}
                      onChange={(e) => setModalData({...modalData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Data de Início</label>
                    <input 
                      type="text" 
                      value={modalData?.dataInicio || ''}
                      onChange={(e) => setModalData({...modalData, dataInicio: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Plano</label>
                    <input 
                      type="text" 
                      value={modalData?.plano || ''}
                      onChange={(e) => setModalData({...modalData, plano: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vencimento</label>
                    <input 
                      type="text" 
                      value={modalData?.vencimento || ''}
                      onChange={(e) => setModalData({...modalData, vencimento: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      value={modalData?.status || ''}
                      onChange={(e) => setModalData({...modalData, status: e.target.value})}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </form>
              )}
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

export default AdminDashboard;
