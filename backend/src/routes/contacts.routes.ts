import { Router } from 'express'

import { validateIdMiddleware } from '../middlewares/validateIdMiddleware'
import { validateContactMiddleware } from '../middlewares/validateContactMiddleware'

import { deleteContact, getAllContacts, postContact, putContact } from '../controllers/contactsController'

const router = Router()

router.get('/', getAllContacts)

router.post('/', validateContactMiddleware, postContact)

router.put(
  '/:id',
  validateIdMiddleware, //Válida se o id recebido é valido
  validateContactMiddleware, //Válido se os parametros são válidos
  putContact
)

router.delete('/:id', validateIdMiddleware, deleteContact)

export default router
