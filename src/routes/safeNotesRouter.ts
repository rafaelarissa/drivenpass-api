import { Router } from "express";
import {
  create,
  deleteSafeNote,
  get,
} from "../controllers/safeNotesController.js";
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

safeNotesRouter.get("/users/safeNotes", ensureAuthenticatedMiddleware, get);

safeNotesRouter.delete(
  "/users/safeNotes/:id",
  ensureAuthenticatedMiddleware,
  deleteSafeNote
);

export default safeNotesRouter;
