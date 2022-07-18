import { Request, Response } from "express";
import wifiService, { CreateWifiData } from "../services/wifiService.js";

export async function create(req: Request, res: Response) {
  const wifi: CreateWifiData = req.body;
  const userId = res.locals.user.id;

  await wifiService.create(wifi, userId);
  res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { id } = req.query;

  const wifi = await wifiService.get(Number(id), userId);

  res.send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user.id;

  await wifiService.deleteWifi(Number(id), userId);
  res.sendStatus(200);
}
