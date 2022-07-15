import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import handleErrorsMiddleware from "./middlewares/handleErrors.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
