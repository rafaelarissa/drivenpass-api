import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { create, get } from "../controllers/credentialController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAutenticated.js";

const credentialRouter = Router();

credentialRouter.post(
  "/users/credentials",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(credentialSchema),
  create
);

credentialRouter.get("/users/credentials", ensureAuthenticatedMiddleware, get);

export default credentialRouter;
