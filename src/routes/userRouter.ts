import { Router } from "express";
import { create } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/users", validateSchemaMiddleware(userSchema), create);

export default userRouter;
