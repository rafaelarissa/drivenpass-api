import { Request, Response } from "express";
import wifiService, { CreateWifiData } from "../services/wifiService.js";

export async function create(req: Request, res: Response) {
  const wifi: CreateWifiData = req.body;
  const userId = res.locals.user.id;

  await wifiService.create(wifi, userId);
  res.sendStatus(201);
}
