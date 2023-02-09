import { Request, Response } from 'express';
import productTypeService from '../services/productType.service';

class ProductTypeController {
  public async create(req: Request, res: Response) {
    const { description } = req.body; 
    const created = await productTypeService.create({ description });
    return res.status(201).send(created);
  }
}

export default new ProductTypeController();
