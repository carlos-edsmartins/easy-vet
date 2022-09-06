import { Router } from 'express'

import { verifyToken } from '../middlewares/verifyToken'
import { UserController } from '../controllers/User'

const router = Router()

router.post('/user/register', new UserController().create)
router.post('/user/login', new UserController().auth)

router.get('/users', verifyToken, new UserController().findAll)
router.get('/user/:userId', verifyToken, new UserController().findOneById)

router.post('/user/:userId/edit', verifyToken, new UserController().update)

router.delete(
    '/user/:userId/delete',
    verifyToken,
    new UserController().deleteOneById
)

export default router
