import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "sqlite",
  storage: "../../auth.sqlite",
  models: [User]
})

export default connection;