import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { router } from './routes/router';

export class App {
  private server: express.Application;

  constructor() {
    this.server = express();
  }

  public async create() {
    this.configureMiddlewares();
    this.configureRoutes();
    await this.connectToDatabase();
    return this.server;
  }

  private configureMiddlewares() {
    this.server.use(express.json());
  }

  private configureRoutes() {
    this.server.use(router);
  }

  private async connectToDatabase() {
    mongoose.set("strictQuery", false);
    return mongoose.connect(config.DB_URI,).then(() => {
      console.log('[app] > database conected');
    });
  }

  public start() {
    const PORT = config.PORT;
    this.server.listen(PORT, () => {
      console.log(`[app] > listen on port ${PORT}`);
    });
  }
}
