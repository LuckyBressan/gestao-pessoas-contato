import { Contact } from "@/@types/Contact";
import { ErrorMessage } from "@/@types/Error";
import { EnumContactTipo } from "../enums/EnumContact";
import ContactValidator from "../validators/ContactValidator";
import { RequestHandler } from "express";

export const validateContactMiddleware: RequestHandler = (req, res, next) => {
    const {
        tipo,
        descricao,
        idPessoa
    } = req.body as Contact

    if(!tipo || !descricao || !idPessoa) {
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

    const validator = new ContactValidator(descricao)
    let   valid = true

    switch (tipo) {
        case EnumContactTipo.TELEFONE:
            valid = validator.isPhone() //Se é um telefone válido
            break;
        case EnumContactTipo.EMAIL:
            valid = validator.isEmail() //Se é um email válido
            break;
        default:
            valid = false //Se o tipo passado não corresponde ao enum
            break;
    }

    if(!valid) {
        res.send(500).json(
            {
                error: {
                    title: 'Erro!',
                    description: 'Parâmetro "tipo" é inválido.'
                }
            } as ErrorMessage
        )
        return
    }

    next()
}