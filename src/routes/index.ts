import { Router } from 'express';
import userRoutes from './users';
import { verifyJwtController } from '../controllers/jwt';
import { loginController } from '../controllers/users';
const routes = Router();

routes.use('/users', userRoutes);
routes.use('/login', loginController);
routes.get('/test', verifyJwtController, (req, res, next) => {
  res.send('Heelo');
})
routes.get('/rafa', verifyJwtController, (req, res, next) => {
  res.send("Rafa");
})


export default routes;