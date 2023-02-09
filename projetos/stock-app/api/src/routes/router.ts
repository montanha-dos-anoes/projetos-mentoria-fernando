import { Router } from 'express';
import indexController from '../controller/index.controller';
import productTypeController from '../controller/productType.controller';

const router: Router = Router();

router.get('/', indexController.info);
router.post('/product-types', productTypeController.create);

export { router };
