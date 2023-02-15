import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Review(s)

router.get('/review', (req, res) => { });
router.get('/review/:id', () => { });
router.put('/review/:id',
    body('establishment').optional().isString(),
    body('address').optional().isString(),
    body('body').optional().isString(),
    body('rating').isIn(['CHICKEN', 'CHICKEN_CHICKEN', 'CHICKEN_CHICKEN_CHICKEN', 'CHICKEN_CHICKEN_CHICKEN_CHICKEN','CHICKEN_CHICKEN_CHICKEN_CHICKEN_CHICKEN']).optional(),
    body('public').optional().isBoolean(),
    handleInputErrors,
    (req, res) => { });
router.post('/review/',
    body('establiishment').exists().isString(), 
    body('address').exists().isString(),
    body('body').exists().isString(),
    body('public').exists().isBoolean(),
    handleInputErrors,
    (req, res) => { });
router.delete('/review/:id', () => { });

// Comment()

router.get('/comment', () => { });
router.get('/comment/:id', () => { });
router.put('/comment/:id', body('body').optional().isString(), () => { });
router.post('/comment/',
    body('body').exists().isString(),
    body('commentById').exists().isString(),
    body('commentOnReviewId').exists().isString(),
    () => { });
router.delete('/comment/:id', () => { });

export default router;