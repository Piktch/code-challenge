import express from 'express';
import * as bodyParser from 'body-parser'; // used to parse the form data that you pass in the request
import router from './router';
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const allowedOrigins = ['http://localhost:3000'];
    const options: cors.CorsOptions = {
      origin: allowedOrigins
    };
    this.app.use(cors(options));
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      }),
    );

    this.app.use('/', router);
  }
}

export default new App().app;