import { CreateUserData } from "./../services/userService.js";
import { Request, Response } from "express";
import userService from "../services/userService.js";

export async function create(req: Request, res: Response) {
  const user: CreateUserData = req.body;

  await userService.create(user);

  res.sendStatus(201);
}
