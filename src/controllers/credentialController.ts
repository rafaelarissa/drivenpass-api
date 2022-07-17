import credentialService, {
  CreateCredentialData,
} from "./../services/credentialService.js";
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
  const credentials: CreateCredentialData = req.body;
  const userId = res.locals.user.id;

  await credentialService.create(credentials, userId);
  res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { id } = req.query;

  const credentials = await credentialService.get(Number(id), userId);

  res.send(credentials);
}
