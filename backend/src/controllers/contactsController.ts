import { RequestHandler } from "express"
import prisma from "../lib/prisma"

import { ErrorMessage } from "@/@types/Error"
import { Contact } from "@/@types/Contact"

const errorDefault = (action: string, error: unknown) => {
  return {
    error: {
      title: `Erro ao ${action} contato!`,
      description: 'Verifique o console.',
      trace: error
    }
  } as ErrorMessage
}


export const getAllContacts: RequestHandler = async (req, res) => {
  const contacts = await prisma.contato.findMany()
  res.json(contacts)
}

export const postContact: RequestHandler = async (req, res) => {
    const {
      tipo,
      descricao,
      idPessoa
    } = req.body as Contact

    try {
      const contact = await prisma.contato.create({
        data: { tipo, descricao, idPessoa: Number(idPessoa) }
      })
      res.json(contact)
    } catch (error) {
      res.status(500).json(
        errorDefault('incluir', error)
      )
    }
}

export const putContact: RequestHandler = async (req, res) => {
    const { id } = req.params

    const {
      tipo,
      descricao,
      idPessoa
    } = req.body as Contact

    try {
      const contact = await prisma.contato.update({
        where: { id: Number(id) },
        data: { tipo, descricao, idPessoa: Number(idPessoa) },
      })
        res.json(contact)
    } catch (error) {
      res.status(500).json(
        errorDefault('alterar', error)
      )
    }
}

export const deleteContact: RequestHandler = async (req, res) => {
    const { id } = req.params
    try {
      await prisma.contato.delete({
        where: { id: Number(id) }
      })
      res.json({ message: 'Contato deletado com sucesso' })
    } catch (error) {
      res.status(500).json(
        errorDefault('excluir', error)
      )
    }
}