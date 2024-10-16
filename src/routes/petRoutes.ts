import { Router } from "express"
import { PetController } from '../controllers/PetController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middlewares/validator'
import { validateToken } from '../middlewares/jwt'
const router = Router();


router.get('/',
validateToken,
PetController.getPets
)
router.get('/:id',
validateToken,
PetController.getPetById)

router.post('/create',
body('name').notEmpty().withMessage('El campo name es obligatorio'),
body('breed').notEmpty().withMessage('El campo breed es obligatorio'),
body('age').notEmpty().withMessage('El campo age es obligatorio'),
body('weight').notEmpty().withMessage('El campo weight es obligatorio'),
handleInputErrors,
validateToken,
PetController.createPet
)
router.put('/update/:id',
body('name').notEmpty().withMessage('El campo name es obligatorio'),
body('breed').notEmpty().withMessage('El campo breed es obligatorio'),
body('age').notEmpty().withMessage('El campo age es obligatorio'),
body('weight').notEmpty().withMessage('El campo weight es obligatorio'),
handleInputErrors,
validateToken,
PetController.updatePet
)
router.delete('/delete/:id',
validateToken,
PetController.deletePet
)

export default router