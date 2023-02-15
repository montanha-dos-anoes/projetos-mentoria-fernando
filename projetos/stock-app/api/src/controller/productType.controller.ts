import { Request, Response } from 'express';
import { resolve } from 'path';
import productTypeService from '../services/productType.service';


const ObjectId = require('mongodb').ObjectId;

class ProductTypeController {
  public async create(req: Request, res: Response) {
    const created = await productTypeService.create(req.body);
    return res.status(201).send(created);
  }

  public async get(req: Request, res: Response) {
    const data = await productTypeService.get()
    if (!data) {
      return res.status(404).json({
        message: `Products not found`
      });
    }
    return res.status(200).json(data);
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = ObjectId(req.params.id);
      const data = await productTypeService.getById(id);
      if (!data) {
        return res.status(404).json({
          message: `Product type with id ${req.params.id} not found`
        });
      }
      return res.status(200).json(data);
    }
    catch (error) {
      return res.status(500).json({
        message: 'Error retrieving product type',
        error: error
      });
    }

  }

  public async update(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    const data = await productTypeService.update(id, req.body)
    if (!data) {
      return res.status(404).json({
        message: `Check the id and fields`
      });
    }
    return res.status(200).json({
      message: `fields changed successfully ${data}`
    });
  }

  public async delete(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    const data = await productTypeService.delete(id);
    if (!data) {
      return res.status(404).json({
        message: `Product type with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      message: `deleted field successfully`
    })
  }
}
export default new ProductTypeController();
