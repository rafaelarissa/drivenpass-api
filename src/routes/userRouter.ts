import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchemaMiddleware(userSchema), signUp);
userRouter.post("/sign-in", validateSchemaMiddleware(userSchema), signIn);

export default userRouter;
