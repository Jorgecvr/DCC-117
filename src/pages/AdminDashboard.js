import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { mapBackendRoleToFrontend } from '../utils/roleMapping';
import LogoutButton from '../components/LogoutButton';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('funcionarios');
  const [funcionarios, setFuncionarios] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (activeTab === 'funcionarios') {
        const employees = await userService.getEmployees();
        setFuncionarios(employees);
      } else {
        const students = await userService.getStudents();
        setAlunos(students);
      }
    } catch (err) {
      setError('Erro ao carregar dados. Tente novamente.');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  // Recarregar dados quando mudar a aba
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleEdit = (item, type) => {
    setModalData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setModalData(activeTab === 'funcionarios' ? {
      name: '',
      email: '',
      cpf: '',
      password: '',
      role: 'TEACHER'
    } : {
      name: '',
      email: '',
      cpf: '',
      password: ''
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
    setError('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      if (activeTab === 'funcionarios') {
        if (isEditing) {
          await userService.updateUser(modalData.id, {
            name: modalData.name,
            email: modalData.email,
            role: modalData.role,
            tenure: modalData.tenure || 0
          });
        } else {
          await userService.createUser({
            name: modalData.name,
            email: modalData.email,
            cpf: modalData.cpf,
            password: modalData.password,
            role: modalData.role,
            tenure: modalData.tenure || 0
          });
        }
      } else {
        if (isEditing) {
          await userService.updateUser(modalData.id, {
            name: modalData.name,
            email: modalData.email
          });
        } else {
          await userService.createUser({
            name: modalData.name,
            email: modalData.email,
            cpf: modalData.cpf,
            password: modalData.password,
            isStudent: true
          });
        }
      }

      handleCloseModal();
      loadData(); // Recarregar dados
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar. Tente novamente.');
      console.error('Erro ao salvar:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Tem certeza que deseja remover este ${type}?`)) {
      return;
    }

    try {
      await userService.deleteUser(id);
      loadData(); // Recarregar dados
    } catch (err) {
      setError('Erro ao remover. Tente novamente.');
      console.error('Erro ao remover:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getRoleDisplay = (role) => {
    const roleMapping = {
      'ADMIN': 'Administrador',
      'RECEPTIONIST': 'Recepcionista',
      'TEACHER': 'Professor',
      'TRAINEE': 'Estagiário'
    };
    return roleMapping[role] || role;
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <div className="admin-profile-header">
          <div className="admin-avatar">
            <span className="admin-icon">👑</span>
          </div>
          <h2 className="admin-name">Administrador</h2>
          <p className="admin-role">Super Admin</p>
        </div>

        <nav className="admin-menu">
          <button 
            className={`menu-item ${activeTab === 'funcionarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('funcionarios')}
          >
            👥 Funcionários
          </button>
          <button 
            className={`menu-item ${activeTab === 'alunos' ? 'active' : ''}`}
            onClick={() => setActiveTab('alunos')}
          >
            🏋️ Alunos
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">
            {activeTab === 'funcionarios' ? 'Gerenciamento de Funcionários' : 'Gerenciamento de Alunos'}
          </h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="add-button" onClick={handleAddNew}>
              + Adicionar {activeTab === 'funcionarios' ? 'Funcionário' : 'Aluno'}
            </button>
            <LogoutButton />
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
            {error}
          </div>
        )}

        <div className="admin-table-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Carregando...
            </div>
          ) : activeTab === 'funcionarios' ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Cargo</th>
                  <th>Data de Contratação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map(funcionario => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.id}</td>
                    <td>{funcionario.name}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{getRoleDisplay(funcionario.role)}</td>
                    <td>{formatDate(funcionario.createdAt)}</td>
                    <td>
                      <button 
                        className="action-button edit"
                        onClick={() => handleEdit(funcionario, 'funcionario')}
                      >
                        Editar
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDelete(funcionario.id, 'funcionario')}
                      >
                        Remover
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
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Data de Cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.name}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.cpf}</td>
                    <td>{formatDate(aluno.createdAt)}</td>
                    <td>
                      <button 
                        className="action-button edit"
                        onClick={() => handleEdit(aluno, 'aluno')}
                      >
                        Editar
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDelete(aluno.id, 'aluno')}
                      >
                        Remover
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
                      value={modalData?.name || ''}
                      onChange={(e) => setModalData({...modalData, name: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={modalData?.email || ''}
                      onChange={(e) => setModalData({...modalData, email: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  <div className="form-group">
                    <label>CPF</label>
                    <input 
                      type="text" 
                      value={modalData?.cpf || ''}
                      onChange={(e) => setModalData({...modalData, cpf: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  {!isEditing && (
                    <div className="form-group">
                      <label>Senha</label>
                      <input 
                        type="password" 
                        value={modalData?.password || ''}
                        onChange={(e) => setModalData({...modalData, password: e.target.value})}
                        disabled={saving}
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Cargo</label>
                    <select 
                      value={modalData?.role || 'TEACHER'}
                      onChange={(e) => setModalData({...modalData, role: e.target.value})}
                      disabled={saving}
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="RECEPTIONIST">Recepcionista</option>
                      <option value="TEACHER">Professor</option>
                      <option value="TRAINEE">Estagiário</option>
                    </select>
                  </div>
                </form>
              ) : (
                <form>
                  <div className="form-group">
                    <label>Nome</label>
                    <input 
                      type="text" 
                      value={modalData?.name || ''}
                      onChange={(e) => setModalData({...modalData, name: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={modalData?.email || ''}
                      onChange={(e) => setModalData({...modalData, email: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  <div className="form-group">
                    <label>CPF</label>
                    <input 
                      type="text" 
                      value={modalData?.cpf || ''}
                      onChange={(e) => setModalData({...modalData, cpf: e.target.value})}
                      disabled={saving}
                    />
                  </div>
                  {!isEditing && (
                    <div className="form-group">
                      <label>Senha</label>
                      <input 
                        type="password" 
                        value={modalData?.password || ''}
                        onChange={(e) => setModalData({...modalData, password: e.target.value})}
                        disabled={saving}
                      />
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="modal-footer">
              <button className="save-button" onClick={handleSave} disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button className="cancel-button" onClick={handleCloseModal} disabled={saving}>
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