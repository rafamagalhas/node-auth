
import { Router } from "express";
import * as dotenv from "dotenv";
import { createUserController, deleteUserController, getAllUserController, getUserByIdController, loginController, updateUserController } from "../controllers/users";
import { verifyJwtController } from "../controllers/jwt";
dotenv.config();

const routes = Router();

routes.post("/", verifyJwtController, createUserController);
routes.get("/", verifyJwtController, getAllUserController);
routes.get("/:id", verifyJwtController, getUserByIdController);
routes.put("/:id", verifyJwtController, updateUserController);
routes.delete("/:id", verifyJwtController, deleteUserController);

export default routes;
