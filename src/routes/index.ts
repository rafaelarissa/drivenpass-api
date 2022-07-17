import { Router } from "express";
import credentialRouter from "./credentialRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(credentialRouter);
router.use(safeNotesRouter);

export default router;
