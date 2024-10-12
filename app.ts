import "reflect-metadata";
import express from "express";
import router from "./src/api/routes/routes-index";
import initMongoInstance from "./src/mongoose.config";
import logger from "./src/utils/winston-logger";
import { errorHandler } from "./src/utils/middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use("/", router);
app.use(errorHandler)
initMongoInstance();
app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});
