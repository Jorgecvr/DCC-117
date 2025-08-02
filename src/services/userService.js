import api from './api';

export const userService = {
  // Buscar todos os usuários (apenas admin)
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Buscar usuário por ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  // Criar novo usuário
  async createUser(userData) {
    try {
      const response = await api.post('/users/create', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  // Atualizar usuário
  async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // Deletar usuário
  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  },

  // Resetar senha do usuário
  async resetUserPassword(id) {
    try {
      const response = await api.patch(`/users/${id}/reset-password`);
      return response.data;
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      throw error;
    }
  },

  // Buscar perfil do usuário atual
  async getCurrentUserProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  // Atualizar perfil do usuário atual
  async updateCurrentUserProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  // Atualizar senha do usuário atual
  async updateCurrentUserPassword(passwordData) {
    try {
      const response = await api.patch('/users/profile/password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      throw error;
    }
  },

  // Funções auxiliares para filtrar usuários
  async getEmployees() {
    try {
      const users = await this.getAllUsers();
      return users.filter(user => user.roles.some(role => 
        ['ADMIN', 'RECEPTIONIST', 'TEACHER', 'TRAINEE'].includes(role)
      ));
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      throw error;
    }
  },

  async getStudents() {
    try {
      const users = await this.getAllUsers();
      return users.filter(user => user.roles.includes('STUDENT'));
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  }
}; 