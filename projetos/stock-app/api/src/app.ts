import express from 'express';
import { router } from './routes/router';

export class App {
  private server: express.Application;

  constructor() {
    this.server = express();
  }

  public create() {
    this.configureMiddlewares();
    this.configureRoutes();
    return this.server;
  }

  private configureMiddlewares() {
    this.server.use(express.json());
  }

  private configureRoutes() {
    this.server.use(router);
  }

  public start() {
    const PORT = 3000;
    this.server.listen(PORT, () => {
      console.log(`[app] > listen on port ${PORT}`);
    });
  }
}
