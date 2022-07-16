import credentialService, {
  CreateCredentialData,
} from "./../services/credentialService.js";
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
  const credentials: CreateCredentialData = req.body;
  const { id } = req.params;

  await credentialService.create(credentials, Number(id));
  res.sendStatus(201);
}
