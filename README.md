# Teste Técnico NestJS - AvantSoft

Este é um projeto monorepo que consiste em um backend desenvolvido com NestJS e um frontend desenvolvido com React + Vite.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm**

## 🏗️ Estrutura do Projeto

```
test-tecnico-nest-js-avantsoft/
├── backend/                 # API NestJS
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/               # Aplicação React
│   ├── src/
│   └── package.json
└── README.md
```

## 🚀 Como Instalar e Executar

### 2. Configuração do Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Gere o cliente Prisma (executado automaticamente no postinstall)
npx prisma generate

# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run start:dev
```

O backend estará rodando em: **http://localhost:3000**

### 3. Configuração do Frontend

```bash
# Em um novo terminal, navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: **http://localhost:5173**

## 🛠️ Scripts Disponíveis

### Backend

```bash
# Desenvolvimento
npm run start:dev          # Inicia o servidor em modo desenvolvimento

# Produção
npm run build             # Compila o projeto
npm run start:prod        # Inicia o servidor em modo produção

# Qualidade de código
npm run lint              # Executa o linter
npm run format            # Formata o código
```

### Frontend

```bash
# Desenvolvimento
npm run dev               # Inicia o servidor de desenvolvimento

# Produção
npm run build             # Compila o projeto
npm run preview           # Visualiza a build de produção

# Qualidade de código
npm run lint              # Executa o linter
```

## 🗄️ Banco de Dados

O projeto utiliza **SQLite** com **Prisma** como ORM.

### Comandos do Prisma

```bash
# Navegue para a pasta backend
cd backend

# Gerar cliente Prisma
npx prisma generate
```

## 📡 API Endpoints

### Produtos

- `GET /products` - Lista todos os produtos
- `POST /products` - Cria um novo produto
- `PUT /products/:id` - Atualiza um produto
- `DELETE /products/:id` - Remove um produto

### Exemplo de uso da API

```bash
# Listar produtos
curl http://localhost:3000/products

# Criar produto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Teste",
    "price": 99.99,
    "SKU": "SKU123"
  }'
```

## 🎨 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **SQLite** - Banco de dados
- **TypeScript** - Linguagem de programação
- **Class Validator** - Validação de dados

### Frontend
- **React 19** - Biblioteca JavaScript
- **Vite** - Build tool
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Framework CSS
- **Shadcn UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **TanStack Query** - Gerenciamento de estado do servidor

## 🔧 Configuração de Desenvolvimento

### Variáveis de Ambiente

O projeto não requer variáveis de ambiente específicas, mas você pode configurar:

```bash
# Backend (.env)
PORT=3000
DATABASE_URL="file:./dev.db"

# Frontend (.env)
VITE_API_URL=http://localhost:3000
```

### CORS

O backend está configurado para aceitar requisições do frontend em `http://localhost:5173`.

## 📦 Build para Produção

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
```

Os arquivos de produção estarão na pasta `dist/` (backend) e `dist/` (frontend).
