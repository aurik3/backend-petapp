import { Router } from "express"
import { ClinicalController } from '../controllers/ClinicalController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middlewares/validator'
import { validateToken } from '../middlewares/jwt'


const router = Router()

router.get('/',
validateToken,
ClinicalController.getClinicals
)
router.get('/:id',
validateToken,
ClinicalController.getClinicalById
)
router.post('/create',
body('id_pet').notEmpty().withMessage('El campo id_pet es obligatorio'),
body('description').notEmpty().withMessage('El campo description es obligatorio'),
body('date').notEmpty().withMessage('El campo date es obligatorio'),
handleInputErrors,
validateToken,
ClinicalController.createClinical
)
router.put('/update/:id',
body('id_pet').notEmpty().withMessage('El campo id_pet es obligatorio'),
body('description').notEmpty().withMessage('El campo description es obligatorio'),
body('date').notEmpty().withMessage('El campo date es obligatorio'),
handleInputErrors,
validateToken,
ClinicalController.updateClinical
)
router.delete('/delete/:id',
validateToken,
ClinicalController.deleteClinical
)



export default router