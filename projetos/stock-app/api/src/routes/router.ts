import { Router } from 'express';
import indexController from '../controller/index.controller';
import productController from '../controller/product.controller';
import productTypeController from '../controller/productType.controller';
import fieldController from '../controller/field.controller';

const router: Router = Router();

router.get('/', indexController.info);
router.get('/product-types', productTypeController.get);
router.get('/product-types/:id', productTypeController.getById);
router.post('/product-types', productTypeController.create);
router.put('/product-types/:id', productTypeController.update);
router.delete('/product-types/:id', productTypeController.delete);



router.get('/products', productController.get);
router.get('/products/:id', productController.getById);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);




router.get('/fields', fieldController.get);
router.get('/fields/:id', fieldController.getById);
router.post('/fields', fieldController.create);
router.put('/fields/:id', fieldController.update);
router.delete('/fields/:id', fieldController.delete);

export { router };
