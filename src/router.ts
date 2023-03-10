import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { createComment, deleteComment, getComments, getOneComment, updateComment } from "./handlers/comment";
import { createReview, deleteReview, getOneReview, getPublicReviews, getReviews, updateReview } from "./handlers/review";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Review(s)

router.get('/review', getReviews);
router.get('/review/public', getPublicReviews);
router.get('/review/:id', getOneReview);
router.put('/review/:id',
    body('establishment').optional().isString(),
    body('address').optional().isString(),
    body('description').optional().isString(),
    body('body').optional().isString(),
    body('rating').isIn(['CHICKEN',
        'CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN_CHICKEN_CHICKEN']).optional(),
    body('public').optional().isBoolean(),
    handleInputErrors,
    updateReview);
router.post('/review/',
    body('establishment').exists().isString(),
    body('address').exists().isString(),
    body('description').optional().isString(),
    body('body').exists().isString(),
    body('rating').isIn(['CHICKEN',
        'CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN_CHICKEN',
        'CHICKEN_CHICKEN_CHICKEN_CHICKEN_CHICKEN']).optional(),
    body('public').exists().isBoolean(),
    handleInputErrors,
    createReview)
router.delete('/review/:id', deleteReview);

// Comment(s)

router.get('/comment', getComments);
router.get('/comment/:id', getOneComment);
router.put('/comment/:id',
    body('body').optional().isString(),
    updateComment);
router.post('/comment/',
    body('body').exists().isString(),
    body('commentById').exists().isString(),
    body('commentOnReviewId').exists().isString(),
    createComment);
router.delete('/comment/:id',
    deleteComment);

export default router;