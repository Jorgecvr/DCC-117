// Dados mockados para o sistema de academia
export const mockData = {
  // Dados de funcionários (admin, recepcionista, professor)
  employees: [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@ufjf.edu.br",
      cpf: "123.456.789-01",
      role: "ADMIN",
      tenure: 5,
      createdAt: "2020-01-15T10:00:00Z",
      active: true
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@ufjf.edu.br",
      cpf: "234.567.890-12",
      role: "RECEPTIONIST",
      tenure: 3,
      createdAt: "2021-03-20T14:30:00Z",
      active: true
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos.oliveira@ufjf.edu.br",
      cpf: "345.678.901-23",
      role: "TEACHER",
      tenure: 4,
      createdAt: "2020-08-10T09:15:00Z",
      active: true
    },
    {
      id: 4,
      name: "Ana Costa",
      email: "ana.costa@ufjf.edu.br",
      cpf: "456.789.012-34",
      role: "TEACHER",
      tenure: 2,
      createdAt: "2022-01-05T11:45:00Z",
      active: true
    },
    {
      id: 5,
      name: "Pedro Lima",
      email: "pedro.lima@ufjf.edu.br",
      cpf: "567.890.123-45",
      role: "RECEPTIONIST",
      tenure: 1,
      createdAt: "2023-02-15T16:20:00Z",
      active: true
    }
  ],

  // Dados de alunos
  students: [
    {
      id: 101,
      studentId: "A20230001",
      name: "Lucas Mendes",
      email: "lucas.mendes@aluno.ufjf.edu.br",
      cpf: "111.222.333-44",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      idade: 22,
      altura: 1.75,
      peso: 70,
      objetivo: "Hipertrofia",
      nivel: "Intermediário",
      createdAt: "2023-01-10T08:00:00Z",
      activeMembership: {
        id: 1,
        type: "Mensal",
        startDate: "2023-01-10T08:00:00Z",
        endDate: "2024-01-10T08:00:00Z",
        active: true
      },
      active: true
    },
    {
      id: 102,
      studentId: "A20230002",
      name: "Fernanda Alves",
      email: "fernanda.alves@aluno.ufjf.edu.br",
      cpf: "222.333.444-55",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      idade: 25,
      altura: 1.65,
      peso: 58,
      objetivo: "Emagrecimento",
      nivel: "Iniciante",
      createdAt: "2023-02-15T10:30:00Z",
      activeMembership: {
        id: 2,
        type: "Mensal",
        startDate: "2023-02-15T10:30:00Z",
        endDate: "2024-02-15T10:30:00Z",
        active: true
      },
      active: true
    },
    {
      id: 103,
      studentId: "A20230003",
      name: "Rafael Costa",
      email: "rafael.costa@aluno.ufjf.edu.br",
      cpf: "333.444.555-66",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      idade: 28,
      altura: 1.80,
      peso: 85,
      objetivo: "Força",
      nivel: "Avançado",
      createdAt: "2023-03-20T14:15:00Z",
      activeMembership: {
        id: 3,
        type: "Mensal",
        startDate: "2023-03-20T14:15:00Z",
        endDate: "2024-03-20T14:15:00Z",
        active: true
      },
      active: true
    },
    {
      id: 104,
      studentId: "A20230004",
      name: "Juliana Pereira",
      email: "juliana.pereira@aluno.ufjf.edu.br",
      cpf: "444.555.666-77",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      idade: 23,
      altura: 1.68,
      peso: 62,
      objetivo: "Definição Muscular",
      nivel: "Intermediário",
      createdAt: "2023-04-05T09:45:00Z",
      activeMembership: {
        id: 4,
        type: "Mensal",
        startDate: "2023-04-05T09:45:00Z",
        endDate: "2024-04-05T09:45:00Z",
        active: true
      },
      active: true
    },
    {
      id: 105,
      studentId: "A20230005",
      name: "Diego Rodrigues",
      email: "diego.rodrigues@aluno.ufjf.edu.br",
      cpf: "555.666.777-88",
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
      idade: 26,
      altura: 1.72,
      peso: 75,
      objetivo: "Resistência",
      nivel: "Iniciante",
      createdAt: "2023-05-12T11:20:00Z",
      activeMembership: {
        id: 5,
        type: "Mensal",
        startDate: "2023-05-12T11:20:00Z",
        endDate: "2024-05-12T11:20:00Z",
        active: true
      },
      active: true
    },
    {
      id: 106,
      studentId: "A20230006",
      name: "Camila Silva",
      email: "camila.silva@aluno.ufjf.edu.br",
      cpf: "666.777.888-99",
      photo: "https://randomuser.me/api/portraits/women/6.jpg",
      idade: 24,
      altura: 1.70,
      peso: 65,
      objetivo: "Hipertrofia",
      nivel: "Intermediário",
      createdAt: "2023-06-18T13:40:00Z",
      activeMembership: {
        id: 6,
        type: "Mensal",
        startDate: "2023-06-18T13:40:00Z",
        endDate: "2024-06-18T13:40:00Z",
        active: true
      },
      active: true
    },
    {
      id: 107,
      studentId: "A20230007",
      name: "Thiago Santos",
      email: "thiago.santos@aluno.ufjf.edu.br",
      cpf: "777.888.999-00",
      photo: "https://randomuser.me/api/portraits/men/7.jpg",
      idade: 29,
      altura: 1.78,
      peso: 82,
      objetivo: "Força",
      nivel: "Avançado",
      createdAt: "2023-07-25T15:10:00Z",
      activeMembership: {
        id: 7,
        type: "Mensal",
        startDate: "2023-07-25T15:10:00Z",
        endDate: "2024-07-25T15:10:00Z",
        active: true
      },
      active: true
    },
    {
      id: 108,
      studentId: "A20230008",
      name: "Amanda Lima",
      email: "amanda.lima@aluno.ufjf.edu.br",
      cpf: "888.999.000-11",
      photo: "https://randomuser.me/api/portraits/women/8.jpg",
      idade: 21,
      altura: 1.63,
      peso: 55,
      objetivo: "Emagrecimento",
      nivel: "Iniciante",
      createdAt: "2023-08-30T12:25:00Z",
      activeMembership: {
        id: 8,
        type: "Mensal",
        startDate: "2023-08-30T12:25:00Z",
        endDate: "2024-08-30T12:25:00Z",
        active: true
      },
      active: true
    }
  ],

  // Dados de perfil do aluno (para AlunoDashboard)
  studentProfile: {
    id: 101,
    studentId: "A20230001",
    nome: "Lucas Mendes",
    matricula: "A20230001",
    email: "lucas.mendes@aluno.ufjf.edu.br",
    cpf: "111.222.333-44",
    peso: "70 kg",
    altura: "1,75 m",
    imc: "22,86",
    objetivo: "Hipertrofia",
    nivel: "Intermediário",
    membroDesde: "10/01/2023",
    vencimento: "10/01/2024",
    frequencia: 85,
    instrutor: "Carlos Oliveira",
    workoutPlan: {
      content: {
        nome: "Ficha de Treino - Hipertrofia",
        objetivo: "Hipertrofia",
        validoAte: "2024-01-10T08:00:00Z",
        observacoes: "Foco em ganho de massa muscular com treinos de força.",
        grupos: [
          {
            nome: "Treino A - Peito e Tríceps",
            exercicios: [
              {
                nome: "Supino Reto",
                series: "4",
                repeticoes: "8-12",
                carga: "60kg",
                descanso: "90s"
              },
              {
                nome: "Supino Inclinado",
                series: "3",
                repeticoes: "10-12",
                carga: "45kg",
                descanso: "90s"
              },
              {
                nome: "Extensão de Tríceps na Polia",
                series: "3",
                repeticoes: "12-15",
                carga: "25kg",
                descanso: "60s"
              }
            ]
          },
          {
            nome: "Treino B - Costas e Bíceps",
            exercicios: [
              {
                nome: "Puxada na Frente",
                series: "4",
                repeticoes: "8-12",
                carga: "55kg",
                descanso: "90s"
              },
              {
                nome: "Remada Curvada",
                series: "3",
                repeticoes: "10-12",
                carga: "40kg",
                descanso: "90s"
              },
              {
                nome: "Rosca Direta",
                series: "3",
                repeticoes: "12-15",
                carga: "15kg",
                descanso: "60s"
              }
            ]
          }
        ]
      }
    }
  },

  // Dados de avaliações físicas
  physicalAssessments: [
    {
      id: 1,
      studentId: 101,
      date: "2023-12-01T10:00:00Z",
      weight: 70.5,
      height: 1.75,
      bmi: 23.02,
      bodyFat: 15.2,
      muscleMass: 45.8,
      observations: "Aluno apresentou boa evolução no último mês. Ganho de massa muscular visível.",
      objectives: "Manter foco na hipertrofia e aumentar força nos exercícios básicos."
    },
    {
      id: 2,
      studentId: 102,
      date: "2023-12-01T11:00:00Z",
      weight: 58.2,
      height: 1.65,
      bmi: 21.37,
      bodyFat: 18.5,
      muscleMass: 38.2,
      observations: "Boa aderência ao treino. Perda de peso consistente.",
      objectives: "Continuar com treinos de resistência e aumentar intensidade gradualmente."
    }
  ],

  // Dados de fichas de treino
  workoutPlans: [
    {
      id: 1,
      studentId: 101,
      content: {
        nome: "Ficha de Treino - Hipertrofia",
        objetivo: "Hipertrofia",
        validoAte: "2024-01-10T08:00:00Z",
        observacoes: "Foco em ganho de massa muscular com treinos de força.",
        grupos: [
          {
            nome: "Treino A - Peito e Tríceps",
            exercicios: [
              {
                nome: "Supino Reto",
                series: "4",
                repeticoes: "8-12",
                carga: "60kg",
                descanso: "90s"
              },
              {
                nome: "Supino Inclinado",
                series: "3",
                repeticoes: "10-12",
                carga: "45kg",
                descanso: "90s"
              },
              {
                nome: "Extensão de Tríceps na Polia",
                series: "3",
                repeticoes: "12-15",
                carga: "25kg",
                descanso: "60s"
              }
            ]
          },
          {
            nome: "Treino B - Costas e Bíceps",
            exercicios: [
              {
                nome: "Puxada na Frente",
                series: "4",
                repeticoes: "8-12",
                carga: "55kg",
                descanso: "90s"
              },
              {
                nome: "Remada Curvada",
                series: "3",
                repeticoes: "10-12",
                carga: "40kg",
                descanso: "90s"
              },
              {
                nome: "Rosca Direta",
                series: "3",
                repeticoes: "12-15",
                carga: "15kg",
                descanso: "60s"
              }
            ]
          }
        ]
      }
    }
  ]
};

// Função para simular delay de API
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Função para simular erro aleatório (10% de chance)
export const simulateApiError = () => {
  return Math.random() < 0.1;
}; 