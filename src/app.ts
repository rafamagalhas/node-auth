import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import routes from "./routes";
import { logger } from "./utils/winston";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/v1", routes);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error);
  res
    .status(error["status"] || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
});

export default app;
