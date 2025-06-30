import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

const pessoaData: Prisma.PessoaCreateInput[] = [
  {
    nome: "Ana Silva",
    cpf: "11144477735",
    contatos: {
      create: [
        { tipo: 2, descricao: "ana@email.com" }, // e-mail
        { tipo: 1, descricao: "11999990001" }, // telefone
      ],
    },
  },
  {
    nome: "Bruno Souza",
    cpf: "98765432100",
    contatos: {
      create: [
        { tipo: 2, descricao: "bruno@email.com" }, // e-mail
      ],
    },
  },
  {
    nome: "Carla Pereira",
    cpf: "12345678909",
    contatos: {
      create: [
        { tipo: 1, descricao: "21988880002" }, // telefone
      ],
    },
  },
  {
    nome: "Daniel Costa",
    cpf: "86288366757",
    contatos: {
      create: [
        { tipo: 2, descricao: "daniel@email.com" }, // e-mail
        { tipo: 1, descricao: "31977770003" }, // telefone
      ],
    },
  },
  {
    nome: "Eduarda Lima",
    cpf: "35524519887",
    contatos: {
      create: [
        { tipo: 2, descricao: "eduarda@email.com" }, // e-mail
      ],
    },
  },
  {
    nome: "Felipe Ramos",
    cpf: "28625162060",
    contatos: {
      create: [
        { tipo: 1, descricao: "41966660004" }, // telefone
      ],
    },
  },
];

export async function main() {
  for (const u of pessoaData) {
    await prisma.pessoa.create({ data: u });
  }
}

main();
