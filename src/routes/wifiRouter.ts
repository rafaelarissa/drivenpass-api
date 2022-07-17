import { Router } from "express";
import { create, deleteWifi, get } from "../controllers/wifiController.js";
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

wifiRouter.get("/users/wi-fi", ensureAuthenticatedMiddleware, get);

wifiRouter.delete(
  "/users/wi-fi/:id",
  ensureAuthenticatedMiddleware,
  deleteWifi
);

export default wifiRouter;
