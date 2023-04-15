import { Request, Response } from 'express';
import productService from '../services/product.service';

const ObjectId = require('mongodb').ObjectId;

class ProductController {
  public async create(req: Request, res: Response) {
    const {  code, name, productType, description, quantity, priceInput, priceOutput, imageProduct, fieldValues  } = req.body; 
    try {
      const created = await productService.create({ code, name, productType, description, quantity, priceInput, priceOutput, imageProduct, fieldValues });
      return res.status(201).json({
        data: created,
        message: "Product created sucefful!",
        sucess: true
      })
    } catch (error) {
      return res.status(400).json({
        data: null,
        message: (error as Error).message,
        sucess: false
      })
    }
  }

  public async get(req: Request, res: Response) {
    const data = await productService.get()
    if (!data) {
      return res.status(404).json({
        data: null,
        message: 'Products not found',
        sucess: false
      });
    }
    return res.status(200).json({
      data: data,
      message: "Listing of products!",
      sucess: true
    });
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = ObjectId(req.params.id);
      const data = await productService.getById(id);
      if (!data) {
        return res.status(404).json({
          data: null,
          message: `Product with id ${req.params.id} not found`,
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
        message: 'Error retrieving product',
        error: error,
        sucess: false
      });
    }
  }

  public async update(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    try {
      const data = await productService.update(id, req.body)
      return res.status(200).json({
        data: data,
        message: "Fields updated successfull",
        sucess: true
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: (error as Error).message,
        sucess: false
      });
    }
    // if (!data) {
    //   return res.status(404).json({
    //     data: null,
    //     message: "Check the id and fields",
    //     sucess: false
    //   });
    // }

  }

  public async delete(req: Request, res: Response) {
    const id = ObjectId(req.params.id);
    const data = await productService.delete(id);
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

export default new ProductController();

