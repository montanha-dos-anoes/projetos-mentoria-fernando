import {Request, Response} from 'express';
import fieldValueService from '../services/fieldValue.service';

const ObjectId = require('mongodb').ObjectId;

class FieldValueController{

    public async create (req: Request, res: Response){
        const { product, field, value } = req.body;
        const created = await fieldValueService.create({ product, field, value });
        return res.status(201).send(created)
     }

     public async get(req: Request, res: Response) {
        const data = await fieldValueService.get()
        if (!data) {
          return res.status(404).json({
            message: `Fields value not found`
          });
        }
        return res.status(200).json(data);
      }

      public async getById(req: Request, res: Response) {
        try {
          const id = ObjectId(req.params.id);
          const data = await fieldValueService.getById(id);
          if (!data) {
            return res.status(404).json({
              message: `Field value with id ${req.params.id} not found`
            });
          }
          return res.status(200).json(data);
        }
        catch (error) {
          return res.status(500).json({
            message: 'Error retrieving field',
            error: error
          });
        }
      }

      public async update(req: Request, res: Response) {
        const id = ObjectId(req.params.id);
        const data = await fieldValueService.update(id, req.body)
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
        const data = await fieldValueService.delete(id);
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

export default new FieldValueController();