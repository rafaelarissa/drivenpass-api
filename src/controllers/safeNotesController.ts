import { Request, Response } from "express";
import safeNotesService, {
  CreateSafeNotesData,
} from "./../services/safeNotesService.js";

export async function create(req: Request, res: Response) {
  const safeNotes: CreateSafeNotesData = req.body;
  const userId = res.locals.user.id;

  await safeNotesService.create(safeNotes, userId);
  res.sendStatus(201);
}
