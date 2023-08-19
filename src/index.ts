import app from './app';
import connection from './database/connection';
import { logger } from './utils/winston';
import * as dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.HOST || 'https://localhost'
const PORT = process.env.PORT || 3000

connection.sync().then(() => {
  console.log("database successfully connected")
}).catch((error) => {
  console.log(error);
});

app.listen(PORT, () => {
    logger.info(`Server is running at ${HOST}:${PORT}`)
}).on('error', (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
})