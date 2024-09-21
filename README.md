# API-Post

## Visão Geral
API-Post é uma API RESTful construída com Express e TypeScript. Ela oferece funcionalidades para gerenciamento de usuários, autenticação e criação de posts. A API utiliza JWT para autenticação, armazenando tokens em cookies para maior segurança.

## Funcionalidades
- Criação e gerenciamento de usuários
- Autenticação de usuários com JWT
- Armazenamento de token em cookies
- Criação e gerenciamento de posts para usuários
- TypeScript para segurança de tipos
- Express para roteamento e middleware
- Prisma como ORM com banco de dados PostgreSQL
- Docker para containerização e fácil implantação

## Pré-requisitos
- Node.js (versão >= 14.x)
- Docker e Docker Compose
- npm ou yarn

## Estrutura do Projeto
```
.
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── post.controller.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── utils/
│   ├── validators/
│   │   └── modelValidators.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── .env
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## Configuração

### Usando Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-post.git
   cd api-post
   ```

2. Configure seu arquivo `.env` com as seguintes variáveis:
   ```
   DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb?schema=public"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=mydb
   JWT_SECRET="seu_segredo_jwt_aqui"
   ```

3. Inicie os containers com Docker Compose:
   ```bash
   docker-compose up -d
   ```

   Isso iniciará tanto o banco de dados PostgreSQL quanto a aplicação API-Post.

4. A API estará disponível em `http://localhost:3000`

### Configuração Manual

Se preferir rodar sem Docker:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure seu arquivo `.env` com as variáveis apropriadas para seu ambiente local.

3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Endpoints da API

### Rotas de Usuário
- `POST /users`: Criar um novo usuário
- `POST /login`: Login do usuário
- `GET /users`: Obter todos os usuários (requer autenticação)
- `PUT /users/:id`: Atualizar um usuário (requer autenticação)
- `DELETE /users/:id`: Deletar um usuário (requer autenticação)

### Rotas de Post
- `POST /users/:id/newpost`: Criar um novo post para um usuário (requer autenticação)
- `GET /users/:id/posts`: Obter todos os posts de um usuário (requer autenticação)
- `PUT /users/:id/post/:postId`: Atualizar um post de um usuário (requer autenticação)
- `DELETE /users/:id/post/:postId`: Deletar um post de um usuário (requer autenticação)

## Autenticação
A API usa JWT para autenticação. Após um login bem-sucedido, um token é armazenado em um cookie HTTP-only. Este token deve ser incluído nas requisições subsequentes para acessar rotas protegidas.

## Tratamento de Erros
A API inclui um tratamento de erros abrangente, incluindo:
- Erros de validação (usando Zod)
- Erros de banco de dados
- Erros de autenticação e autorização

## Testando a API
Você pode usar ferramentas como Postman ou curl para testar os endpoints da API. Aqui está um exemplo de como criar um novo usuário:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@exemplo.com", "password": "senhasegura", "age": 30}'
```

## Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para submeter um Pull Request.
