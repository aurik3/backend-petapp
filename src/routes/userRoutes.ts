import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middlewares/validator'

const router = Router()

router.get('/', UserController.getUsers)

router.get('/:id', UserController.getUserById)

router.post('/create',
body('name').notEmpty().withMessage('El campo name es obligatorio'),
body('username').notEmpty().withMessage('El campo username es obligatorio'),
body('email').notEmpty().withMessage('El campo email es obligatorio'),
body('password').notEmpty().withMessage('El campo password es obligatorio'),
handleInputErrors,
UserController.createUser
)




export default router