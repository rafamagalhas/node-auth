import { Router } from 'express';
import loginRoutes from './login';
import { verifyJwtController } from '../controllers/jwt';
const routes = Router();

routes.use('/login', loginRoutes);
routes.get('/test', verifyJwtController, (req, res, next) => {
  res.send('Heelo');
})
routes.get('/rafa', verifyJwtController, (req, res, next) => {
  res.send("Rafa");
})


export default routes;