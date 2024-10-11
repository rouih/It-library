import "reflect-metadata";
import express from "express";
import router from "./src/api/routes/routes-index";
import initMongoInstance from "src/mongoose.config";

const app = express();
app.use(express.json());
app.use("/", router);

initMongoInstance();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
