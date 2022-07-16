import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import credentialSchema from "../schemas/credentialSchema.js";
import { create } from "../controllers/credentialController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAutenticated.js";

const credentialRouter = Router();

credentialRouter.post(
  "/users/:id/credentials",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(credentialSchema),
  create
);

export default credentialRouter;
