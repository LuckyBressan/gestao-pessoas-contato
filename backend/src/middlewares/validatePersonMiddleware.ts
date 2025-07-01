import { ErrorMessage } from "@/@types/Error";
import { Person } from "@/@types/Person";
import CpfValidator from "../validators/CpfValidator";
import { RequestHandler } from "express";

export const validatePersonMiddleware: RequestHandler = (req, res, next) => {
    const {
        cpf,
        nome
    } = req.body as Person

    if( !cpf || !nome ) {
        res.send(500).json(
            {
                error: {
                    title: 'Erro!',
                    description: 'Parâmetros obrigatórios não informados.'
                }
            } as ErrorMessage
        )
        return
    }

    const validator = new CpfValidator(cpf)

    if( !validator.validate() ) {
        res.send(500).json(
            {
                error: {
                    title: 'Erro!',
                    description: 'Parâmetro "cpf" é inválido.'
                }
            } as ErrorMessage
        )
        return
    }

    next()
}