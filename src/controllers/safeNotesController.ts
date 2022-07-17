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

export async function get(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { id } = req.query;

  const safeNotes = await safeNotesService.get(Number(id), userId);

  res.send(safeNotes);
}

export async function deleteSafeNote(req: Request, res: Response) {
  const { id } = req.params;

  await safeNotesService.deleteSafeNote(Number(id));
  res.sendStatus(200);
}
