import { Express } from 'express';
import analyzeCustomerController from 'src/controllers/analyzeCustomerController';

const routes = (app: Express): void => {
  app.post('/analyze', analyzeCustomerController);
};

export default routes;
