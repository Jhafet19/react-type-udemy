import { Router } from "express";
import { createProduct, getProducts, deletProduct, getProductbyID, updatedProduct, updatedProductAvailable } from "./handlers/products";
import { handleInputErrors } from "./middleware";
import { param } from "express-validator";

const   router = Router()


//Routeing
router.get('/', getProducts)

router.get('/:id', param('id').isInt().withMessage('ID no es valido '), getProductbyID)


router.post('/products',
    //handleInputErrors,
    createProduct)

router.put('/:id', param('id').isInt().withMessage('ID no es valido '), updatedProduct)

router.patch('/:id', param('id').isInt().withMessage('ID no es valido '), updatedProductAvailable)

router.delete('/:id',
    param('id').isInt().withMessage('ID no es valido '),
    deletProduct)

export default router;