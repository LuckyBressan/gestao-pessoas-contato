import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { Person } from "@/@types/Person";
import { ErrorMessage } from "@/@types/Error";

const errorDefault = (action: string, error: unknown) => {
  return {
    error: {
      title: `Erro ao ${action} pessoa!`,
      description: "Verifique o console.",
      trace: error,
    },
  } as ErrorMessage;
};

export const getAllPerson: RequestHandler = async (req, res) => {
  try {
    const people = await prisma.pessoa.findMany({
      include: { contatos: true },
    });
    res.json(people);
  } catch (error) {
    res.status(500).json(errorDefault("listar", error));
  }
};

export const postPerson: RequestHandler = async (req, res) => {
  const { nome, cpf } = req.body as Person;
  try {
    const person = await prisma.pessoa.create({
      data: { nome, cpf },
    });
    res.json(person);
  } catch (error) {
    res.status(500).json(errorDefault("incluir", error));
  }
};

export const putPerson: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const { cpf, nome } = req.body as Person;

  try {
    const person = await prisma.pessoa.update({
      where: { id: Number(id) },
      data: { cpf, nome },
    });
    res.json(person);
  } catch (error) {
    res.status(500).json(errorDefault("alterar", error));
  }
};

export const deletePerson: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pessoa.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Pessoa deletada com sucesso" });
  } catch (error) {
    res.status(500).json(errorDefault("excluir", error));
  }
};
