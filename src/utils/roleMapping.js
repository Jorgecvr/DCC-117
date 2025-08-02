// Mapeamento de roles do backend para o frontend
export const mapBackendRoleToFrontend = (backendRole) => {
  const roleMapping = {
    'ADMIN': 'admin',
    'RECEPTIONIST': 'recepcionista',
    'TEACHER': 'professor',
    'STUDENT': 'aluno',
    'TRAINEE': 'estagiario'
  };
  
  return roleMapping[backendRole] || backendRole.toLowerCase();
};

// Mapeamento de roles do frontend para o backend
export const mapFrontendRoleToBackend = (frontendRole) => {
  const roleMapping = {
    'admin': 'ADMIN',
    'recepcionista': 'RECEPTIONIST',
    'professor': 'TEACHER',
    'aluno': 'STUDENT',
    'estagiario': 'TRAINEE'
  };
  
  return roleMapping[frontendRole] || frontendRole.toUpperCase();
};

// Função para obter o role principal do usuário
export const getPrimaryRole = (roles) => {
  if (!roles || roles.length === 0) return 'aluno';
  
  // Prioridade: ADMIN > RECEPTIONIST > TEACHER > STUDENT
  const priority = ['ADMIN', 'RECEPTIONIST', 'TEACHER', 'STUDENT'];
  
  for (const priorityRole of priority) {
    if (roles.includes(priorityRole)) {
      return mapBackendRoleToFrontend(priorityRole);
    }
  }
  
  return mapBackendRoleToFrontend(roles[0]);
}; 