# Sistema de Academia - Frontend

Este é o frontend do sistema de gerenciamento de academia, desenvolvido em React.

## Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da academia rodando na porta 3333

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Certifique-se de que o backend está rodando na porta 3333

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O aplicativo será aberto em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.js       # Cabeçalho da aplicação
│   └── LogoutButton.js # Botão de logout
├── pages/              # Páginas da aplicação
│   ├── Login.js        # Página de login
│   ├── AdminDashboard.js # Dashboard do administrador
│   ├── AlunoDashboard.js # Dashboard do aluno
│   ├── RecepcionistaDashboard.js # Dashboard do recepcionista
│   ├── ProfessorWorkoutEditor.js # Editor de treinos do professor
│   └── ProtectedRoute.js # Componente de rota protegida
├── services/           # Serviços de API
│   ├── api.js          # Configuração do axios
│   └── userService.js  # Serviços relacionados a usuários
├── utils/              # Utilitários
│   └── roleMapping.js  # Mapeamento de roles
├── styles/             # Estilos globais
│   └── global.css
└── assets/             # Recursos estáticos
    └── login-banner.jpg
```

## Funcionalidades

### Autenticação
- Login com email e senha
- Redirecionamento baseado no role do usuário
- Proteção de rotas por role
- Logout

### Dashboard do Administrador
- Visualização de funcionários e alunos
- Criação, edição e remoção de usuários
- Gerenciamento de roles

### Roles Disponíveis
- **ADMIN**: Acesso completo ao sistema
- **RECEPTIONIST**: Pode criar alunos
- **TEACHER**: Pode editar treinos
- **STUDENT**: Acesso ao dashboard do aluno

## Integração com Backend

O frontend se comunica com o backend através das seguintes rotas:

- `POST /api/sessions/login` - Autenticação
- `GET /api/users` - Listar usuários (apenas admin)
- `POST /api/users/create` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `GET /api/users/profile` - Perfil do usuário atual

## Configuração da API

A configuração da API está centralizada em `src/services/api.js` e inclui:

- URL base: `http://localhost:3333/api`
- Interceptors para adicionar token de autenticação
- Tratamento automático de erros 401 (logout)

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria a build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta a configuração do Create React App

## Tecnologias Utilizadas

- React 19
- React Router DOM
- Axios
- Styled Components
- React Icons
