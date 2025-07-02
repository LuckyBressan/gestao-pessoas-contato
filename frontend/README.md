# Gestão de Pessoas & Contatos - Frontend

Este é o frontend do sistema **Gestão de Pessoas & Contatos**, desenvolvido em **React + TypeScript** utilizando **Vite** para build e desenvolvimento rápido.

## Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router v7](https://reactrouter.com/en/main)
- Outras bibliotecas utilitárias (Radix UI, Lucide, etc.)

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
VITE_PORT_BACKEND=3333
```

Ajuste conforme a porta do seu backend.

### 2. Rode o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse `http://localhost:5173` no seu navegador.

## Scripts disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Cria uma versão otimizada para produção.

## Estrutura do projeto

- `src`: Código-fonte do projeto.
  - `components`: Componentes reutilizáveis.
  - `pages`: Páginas do aplicativo.
  - `utils`: Funções e classes utilitárias.
  - `forms` - Formulários
  - `providers` - Contextos e providers
  - `services` - Serviços de API
  - `utils` - Funções utilitárias
  - `@types` - Tipagens globais
- `public`: Arquivos públicos estáticos.

## Observações

- O frontend espera que o backend esteja rodando e acessível na porta configurada em VITE_PORT_BACKEND.
- Para rodar com Docker, utilize o docker-compose na raiz do projeto principal.

---