import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import cardSchema from "../schemas/cardSchema.js";
import { create, deleteCard, get } from "../controllers/cardController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAutenticated.js";

const cardRouter = Router();

cardRouter.post(
  "/users/cards",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(cardSchema),
  create
);

cardRouter.get("/users/cards", ensureAuthenticatedMiddleware, get);

cardRouter.delete(
  "/users/cards/:id",
  ensureAuthenticatedMiddleware,
  deleteCard
);

export default cardRouter;
