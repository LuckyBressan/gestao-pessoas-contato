# Gestão de Pessoas & Contatos - Backend

Este é o backend do sistema **Gestão de Pessoas & Contatos**, desenvolvido em **Node.js** com **TypeScript**, **Express** e **Prisma ORM**.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/) para autenticação
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto (caso não exista) e defina as variáveis necessárias, por exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gestao-pessoas-contatos?schema=public"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

Ajuste conforme sua configuração de banco e ambiente.

### 3. Rodando localmente (sem Docker)

#### 3.1. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

#### 3.2. (Opcional) Popule o banco com dados de exemplo
```bash
npx prisma db seed
```

#### 3.3. Inicie o servidor
```bash
npx prisma db seed
```
O backend estará disponível em http://localhost:3333.

## Estrutura de Pastas
- `src/` - Código-fonte principal
    - `controllers/` - Lógica das rotas
    - `middlewares/` - Middlewares de autenticação e validação
    - `routes/` - Definição das rotas da API
    - `@types/` - Tipagens globais
    - `lib/` - Instâncias e utilitários
    - `validators/` - Validações customizadas
- `prisma/` - Schema, migrations e seed do Prisma

## Scripts úteis
- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run build` — Gera o build para produção
- `npm run start` — Inicia o servidor em produção (após build)
- `npx prisma migrate dev` — Executa as migrations no banco de dados
- `npx prisma db seed` — Executa o seed para popular o banco

## Observações
- O backend espera que o banco de dados PostgreSQL esteja disponível conforme configurado em DATABASE_URL.
- Para rodar com Docker Compose, não esqueça de ajustar o host do banco para postgres no .env: