import { Router } from 'express';
import ClientRoutes from './clients.routes';
import SessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/clients', ClientRoutes);
routes.use('/session', SessionRoutes);

export default routes;
