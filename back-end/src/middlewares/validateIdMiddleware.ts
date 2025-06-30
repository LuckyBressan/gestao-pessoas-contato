import { ErrorMessage } from '@/@types/Error';
import { RequestHandler } from 'express';

export const validateIdMiddleware: RequestHandler = (req, res, next) => {
  const { id } = req.params

  if (!id || isNaN(Number(id))) {
    res.status(400).json({
      error: {
        title: 'Erro!',
        description: 'Parâmetro id inválido ou ausente'
      }
    } as ErrorMessage)
    return
  }

  return next()
}
