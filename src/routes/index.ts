import { Router } from "express";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(credentialRouter);
router.use(safeNotesRouter);
router.use(cardRouter);

export default router;
