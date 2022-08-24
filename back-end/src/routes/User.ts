import { Router } from 'express'

import { UserController } from '../controllers/user'

const router = Router()

router.post('/user/register', new UserController().create)

router.get('/users', new UserController().findAll)
router.post('/user/:userId', new UserController().findOneById)

router.delete('/user/delete/:userId', new UserController().deleteOneById)

export default router
