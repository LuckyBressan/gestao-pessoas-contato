# Gestão de Pessoas & Contatos

Sistema completo para cadastro, consulta e gerenciamento de pessoas e seus contatos, desenvolvido com **Node.js**, **TypeScript**, **React** e **PostgreSQL**.

---

## Tecnologias Utilizadas

- **Backend:** Node.js, TypeScript, Express, Prisma ORM, JWT, Docker
- **Frontend:** React 19, TypeScript, Vite, TailwindCSS, Axios, React Router
- **Banco de Dados:** PostgreSQL
- **DevOps:** Docker, Docker Compose

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LuckyBressan/gestao-pessoas-contato.git
cd gestao-pessoas-contato
```

### 2. Configure variáveis de ambiente

Crie o arquivo .env na raiz do projeto

Conforme .env.example:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/gestao-pessoas-contatos?schema=public"
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=g3St@o_p3rS0n
DB_NAME=gestao-pessoas-contatos
DB_PORT=5432
```

### 3. Suba o ambiente com Docker Compose

```bash
docker-compose up --build
```

- O backend estará disponível em http://localhost:3333
- O frontend estará disponível em http://localhost:3000

---

## Scripts úteis
### Backend
- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run build` — Gera o build para produção
- `npm run start` — Inicia o servidor em produção
- `npx prisma migrate dev` — Executa as migrations no banco de dados
- `npx prisma db seed` — Executa o seed para popular o banco

### Frontend
- `npm run dev` — Inicia o frontend em modo desenvolvimento
- `npm run build` — Gera o build para produção
- `npm run preview` — Visualiza o build de produção localmente