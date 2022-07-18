import { Request, Response } from "express";
import cardService, { CreateCardData } from "./../services/cardService.js";

export async function create(req: Request, res: Response) {
  const cards: CreateCardData = req.body;
  const userId = res.locals.user.id;

  await cardService.create(cards, userId);
  res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { id } = req.query;

  const cards = await cardService.get(Number(id), userId);

  res.send(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  await cardService.deleteCard(Number(id), userId);
  res.sendStatus(200);
}
