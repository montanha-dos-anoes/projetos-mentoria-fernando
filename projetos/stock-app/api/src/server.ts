import { App } from './app';

async function boostrap() {
  try {
    const app = new App();
    await app.create();
    app.start();
  } catch (error) {
    console.log('[server] > ', (error as Error).toString());
  }
}

boostrap();
