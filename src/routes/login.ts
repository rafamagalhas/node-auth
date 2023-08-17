
import { Router } from "express";
import * as dotenv from "dotenv";
import { loginController } from "../controllers/login";
dotenv.config();

const routes = Router();

routes.post("/", loginController);

export default routes;
