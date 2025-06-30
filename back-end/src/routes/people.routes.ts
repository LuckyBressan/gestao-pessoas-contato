import { Router } from 'express'

import { validateIdMiddleware } from '../middlewares/validateIdMiddleware'
import { validatePersonMiddleware } from '../middlewares/validatePersonMiddleware'
import { deletePerson, getPeople, postPerson, putPerson } from '../controllers/peopleController'

const router = Router()

router.get('/', getPeople)

router.post('/', validatePersonMiddleware, postPerson)

router.put(
  '/:id',
  validateIdMiddleware, //Válido se o id é válido
  validatePersonMiddleware, //Válido se os parametros são válidos
  putPerson
)

router.delete('/:id', validateIdMiddleware, deletePerson)

export default router
