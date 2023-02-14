import { Router } from 'express';
import fieldValueController from '../controller/fieldValue.controller';
import indexController from '../controller/index.controller';
import productTypeController from '../controller/productType.controller';

const router: Router = Router();

router.get('/', indexController.info);
router.post('/product-types', productTypeController.create);



router.get('/field-value', fieldValueController.get);
router.get('/field-value/:id', fieldValueController.getById);
router.post('/field-value', fieldValueController.create);
router.put('/field-value/:id', fieldValueController.update);
router.delete('/field-value/:id', fieldValueController.delete);

export { router };
