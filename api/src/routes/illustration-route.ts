import express from 'express';
import { body } from 'express-validator';
import * as illustrationController from '../controllers/illustration-controller';
import { AuthMiddleware } from '../middlewares/auth-middleware';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router
  .route('/')
  .post(
    illustrationController.getFileMiddleware,
    [
      body('title').not().isEmpty().withMessage('Title field cannot be empty'),
      body('categories')
        .isLength({ min: 1 })
        .withMessage('Categories must at least have one category'),
    ],
    validateRequest,
    AuthMiddleware,
    illustrationController.uploadSvg,
    illustrationController.createOne
  )
  .get(illustrationController.getAll);

router.route('/all-categories').get(illustrationController.getCategories);
router.route('/search').post(illustrationController.fuzzySearch);
router.route('/download').post(illustrationController.downloadOne);

router
  .route('/:id')
  .get(illustrationController.getOne)
  .patch(AuthMiddleware, illustrationController.updateOne)
  .delete(AuthMiddleware, illustrationController.deleteOne);

export default router;
