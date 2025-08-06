# Instruções para Executar o Projeto

## Pré-requisitos

1. **Node.js** (versão 16 ou superior)
2. **npm** ou **yarn**
3. **PostgreSQL** (para o backend)
4. **Backend da academia** configurado e rodando

## Passos para Execução

### 1. Configurar o Backend

Primeiro, certifique-se de que o backend está configurado e rodando:

```bash
# Navegar para a pasta do backend
cd ../ufjf-gym-backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (criar arquivo .env)
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Executar migrações do banco
npm run db:migrate

# Iniciar o servidor de desenvolvimento
npm run dev
```

O backend deve estar rodando na porta 3333.

### 2. Configurar o Frontend

```bash
# Navegar para a pasta do frontend
cd ../DCC-117

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

O frontend será aberto automaticamente em http://localhost:3000

### 3. Testar o Sistema

1. Acesse http://localhost:3000
2. Use as credenciais de um usuário admin para fazer login
3. Teste as funcionalidades do dashboard

## Estrutura de Dados Esperada

O sistema espera que existam usuários no banco de dados com os seguintes roles:

- **ADMIN**: Acesso completo ao sistema
- **RECEPTIONIST**: Pode criar alunos
- **TEACHER**: Pode editar treinos
- **STUDENT**: Acesso ao dashboard do aluno

## Problemas Comuns

### Erro de CORS
Se aparecer erro de CORS, verifique se o backend está rodando na porta 3333 e se o CORS está configurado corretamente.

### Erro de Conexão com API
Verifique se:
1. O backend está rodando
2. A URL da API está correta em `src/services/api.js`
3. O banco de dados está acessível

### Erro de Autenticação
Verifique se:
1. O token está sendo enviado corretamente
2. O middleware de autenticação está funcionando
3. As credenciais estão corretas

## Desenvolvimento

### Estrutura de Arquivos

```
DCC-117/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços de API
│   ├── utils/         # Utilitários
│   └── styles/        # Estilos
├── public/            # Arquivos públicos
└── package.json       # Dependências
```

### Comandos Úteis

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Ejetar configuração (irreversível)
npm run eject
```

## Tecnologias Utilizadas

- **React 19**: Framework principal
- **React Router**: Roteamento
- **Axios**: Cliente HTTP
- **Styled Components**: Estilização
- **React Icons**: Ícones

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request 