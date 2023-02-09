import { Request, Response } from 'express';

class IndexController {
  public info(req: Request, res: Response) {
    return res.status(200).send({
      name: 'stock-app-api',
      version: '1.0',
    });
  }
}

export default new IndexController();
