import { Router } from 'express'
import { handleInputErrors } from '../middlewares/validator'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { validateToken } from '../middlewares/jwt'


const router = Router()

router.post('/login',
body('username').notEmpty().withMessage('El campo username es obligatorio'),
body('password').notEmpty().withMessage('El campo password es obligatorio'),
handleInputErrors,
AuthController.getUser
)
router.get('/info-user',
validateToken, 
AuthController.infoUser)

export default router