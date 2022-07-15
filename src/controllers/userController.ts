import { CreateUserData } from "./../services/userService.js";
import { Request, Response } from "express";
import userService from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
  const user: CreateUserData = req.body;

  await userService.signUp(user);

  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: CreateUserData = req.body;

  const token = await userService.signIn(user);

  res.send({ token });
}
