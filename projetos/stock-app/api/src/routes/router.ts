import { Router } from 'express';
import indexController from '../controller/index.controller';

const router: Router = Router();

router.get('/', indexController.info);

export { router };
