import { Request, Response } from 'express';
import { resolve } from 'path';
import productTypeService from '../services/productType.service';


const ObjectId = require('mongodb').ObjectId;

class ProductTypeController {
  public async create(req: Request, res: Response) {
    try {
      const created = await productTypeService.create(req.body);
      return res.status(201).json({
        data: created,
        message: "Product type created sucefull!",
        sucess: true
      });
    } catch (error) {
      return res.status(404).json({
        data: null,
        message: (error as Error).message,
        sucess: false,
      });
    }

  }

  public async get(req: Request, res: Response) {
    const data = await productTypeService.get()
    if (!data) {
      return res.status(404).json({
        data: data,
        message: `Products not found`,
        sucess: false
      });
    }
    return res.status(200).json({
      data: data,
      message: "Listing of products type!",
      sucess: true
    });
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = ObjectId(req.params.id);
      const data = await productTypeService.getById(id);
      if (!data) {
        return res.status(404).json({
          data: data,
          message: `Product type with id ${req.params.id} not found`,
          sucess: false
        });
      }
      return res.status(200).json({
        data: data,
        message: "Search by ID successful!",
        sucess: true
      });
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
    try {
      const data = await productTypeService.update(id, req.body)
      return res.status(200).json({
        data: data,
        message: "Fields updated successfully!",
        sucess: true
      });
    } catch (error) {
      return res.status(404).json({
        data: null,
        message: (error as Error).message,
        sucess: false
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    const data = await productTypeService.delete(id);
    if (!data) {
      return res.status(404).json({
        data: data,
        message: `Product with id ${req.params.id} not found`,
        sucess: false
      });
    }
    return res.status(200).json({
      data: data,
      message: "Successfully deleted product!",
      sucess: true
    })
  }
}
export default new ProductTypeController();
