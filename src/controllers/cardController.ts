import { Request, Response } from "express";
import cardService, { CreateCardData } from "./../services/cardService.js";

export async function create(req: Request, res: Response) {
  const cards: CreateCardData = req.body;
  const userId = res.locals.user.id;

  await cardService.create(cards, userId);
  res.sendStatus(201);
}
