import { Router } from "express";
import { create } from "../controllers/safeNotesController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAutenticated.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import safeNotes from "../schemas/safeNotesSchema.js";

const safeNotesRouter = Router();

safeNotesRouter.post(
  "/users/safeNotes",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(safeNotes),
  create
);

export default safeNotesRouter;
