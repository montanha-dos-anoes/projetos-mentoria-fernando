import { Router } from 'express';
import indexController from '../controller/index.controller';
import productTypeController from '../controller/productType.controller';
import fieldController from '../controller/field.controller';

const router: Router = Router();

router.get('/', indexController.info);
router.post('/product-types', productTypeController.create);




router.get('/fields', fieldController.get);
router.get('/fields/:id', fieldController.getById);
router.post('/fields', fieldController.create);
router.put('/fields/:id', fieldController.update);
router.delete('/fields/:id', fieldController.delete);

export { router };
