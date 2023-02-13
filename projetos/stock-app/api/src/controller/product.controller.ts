import { Request, Response } from 'express';
import productService from '../services/product.service';

const ObjectId = require('mongodb').ObjectId;

class ProductController {
  public async create(req: Request, res: Response) {
    const { code, name, productType, description, quantity, priceInput, priceOutput, imageProduct  } = req.body; 
    const created = await productService.create({ code, name, productType, description, quantity, priceInput, priceOutput, imageProduct });
    return res.status(201).send(created);
  }

  public async get(req: Request, res: Response) {
    const data = await productService.get()
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
      const data = await productService.getById(id);
      if (!data) {
        return res.status(404).json({
          message: `Product with id ${req.params.id} not found`
        });
      }
      return res.status(200).json(data);
    }
    catch (error) {
      return res.status(500).json({
        message: 'Error retrieving product',
        error: error
      });
    }
  }

  public async update(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    const data = await productService.update(id, req.body)
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
    const data = await productService.delete(id);
    if (!data) {
      return res.status(404).json({
        message: `Product with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      message: `deleted product successfully`
    })
  } 

}

export default new ProductController();

