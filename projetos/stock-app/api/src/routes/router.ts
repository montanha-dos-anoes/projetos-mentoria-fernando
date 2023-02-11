import { Router } from 'express';
import indexController from '../controller/index.controller';
import productTypeController from '../controller/productType.controller';

const router: Router = Router();

router.get('/', indexController.info);
router.get('/product-types', productTypeController.get);
router.get('/product-types/:id', productTypeController.getById);
router.post('/product-types', productTypeController.create);
router.put('/product-types/:id', productTypeController.update);
router.delete('/product-types/:id', productTypeController.delete);



export { router };
