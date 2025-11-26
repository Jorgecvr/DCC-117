import api from './api';
import { mockData, simulateApiDelay, simulateApiError } from './mockData';

// Função para verificar se o backend está disponível
const isBackendAvailable = async () => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    console.log('Backend não disponível, usando dados mockados');
    return false;
  }
};

export const userService = {
  // Buscar todos os usuários (apenas admin)
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      // Retorna dados mockados se backend não disponível
      await simulateApiDelay();
      return [...mockData.employees, ...mockData.students];
    }
  },

  async getAllEmployees() {
    try {
      const response = await api.get('/users/employees');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      await simulateApiDelay();
      return mockData.employees;
    }
  },

  async getAllStudents() {
    try {
      const response = await api.get('/users/students');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      await simulateApiDelay();
      return mockData.students;
    }
  },

  // Buscar usuário por ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      await simulateApiDelay();
      // Busca nos dados mockados
      const allUsers = [...mockData.employees, ...mockData.students];
      return allUsers.find(user => user.id == id) || null;
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
    const token = localStorage.getItem('token');

    const response = await api.put(
      `/users/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

  // Buscar perfil completo do aluno
  async getStudentProfile() {
    try {
      const response = await api.get('/users/students/profile');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil do aluno:', error);
      await simulateApiDelay();
      return mockData.studentProfile;
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

  async getEmployees() {
    try {
      const users = await this.getAllEmployees();
      return users;
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      await simulateApiDelay();
      return mockData.employees;
    }
  },

  async getStudents() {
    try {
      const users = await this.getAllStudents();
      return users;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      await simulateApiDelay();
      return mockData.students;
    }
  },

  // Buscar ficha de treino do aluno
  async getStudentWorkoutPlan(studentId) {
    try {
      const response = await api.get(`/workout-plan/students/${studentId}/workout-plans`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ficha de treino:', error);
      await simulateApiDelay();
      // Busca nos dados mockados
      const workoutPlan = mockData.workoutPlans.find(plan => plan.studentId == studentId);
      return workoutPlan || {
        content: {
          nome: "Nenhuma ficha de treino encontrada",
          objetivo: "Aguardando criação pelo instrutor",
          validoAte: "Não definido",
          observacoes: "Entre em contato com seu instrutor para criar uma ficha de treino personalizada.",
          grupos: []
        }
      };
    }
  },

  // Buscar lista de alunos (para recepcionistas e professores)
  async getStudentsList() {
    try {
      const response = await api.get('/users/students');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lista de alunos:', error);
      await simulateApiDelay();
      return mockData.students;
    }
  },

  // Salvar ficha de treino do aluno
  async saveStudentWorkoutPlan(studentId, workoutPlanData) {
    try {
      console.log('userService.saveStudentWorkoutPlan - Iniciando...');
      console.log('Student ID:', studentId);
      console.log('Workout Plan Data:', workoutPlanData);
      
      const response = await api.put(`/workout-plan/students/${studentId}/workout-plans`, workoutPlanData);
      
      console.log('userService.saveStudentWorkoutPlan - Resposta:', response.data);
      return response.data;
    } catch (error) {
      console.error('userService.saveStudentWorkoutPlan - Erro:', error);
      console.error('userService.saveStudentWorkoutPlan - Response:', error.response);
      throw error;
    }
  },

  // Buscar avaliações físicas de um aluno
  async getStudentPhysicalAssessments(studentId) {
    try {
      const response = await api.get(`/physical-assessment/students/${studentId}/assessments`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações físicas:', error);
      await simulateApiDelay();
      // Busca nos dados mockados
      return mockData.physicalAssessments.filter(assessment => assessment.studentId == studentId);
    }
  },

  // Criar nova avaliação física
  async createPhysicalAssessment(studentId, assessmentData) {
    try {
      const response = await api.post(`/physical-assessment/students/${studentId}/assessments`, assessmentData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar avaliação física:', error);
      throw error;
    }
  },

  // Atualizar avaliação física existente
  async updatePhysicalAssessment(assessmentId, assessmentData) {
    try {
      const response = await api.put(`/physical-assessment/assessments/${assessmentId}`, assessmentData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar avaliação física:', error);
      throw error;
    }
  },

  // Criar nova matrícula para um aluno
  async createStudentMembership(studentId, membershipData) {
    try {
      const response = await api.post(`/membership/students/${studentId}/memberships`, membershipData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar matrícula:', error);
      throw error;
    }
  }
}; 