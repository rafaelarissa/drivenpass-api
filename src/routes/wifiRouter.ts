import { Router } from "express";
import { create } from "../controllers/wifiController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAutenticated.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post(
  "/users/wi-fi",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(wifiSchema),
  create
);

export default wifiRouter;
