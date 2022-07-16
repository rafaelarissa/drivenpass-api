import dotenv from "dotenv";
import { Users } from "@prisma/client";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import * as handleErrors from "../middlewares/handleErrors.js";
import jwt from "jsonwebtoken";

dotenv.config();

export type CreateUserData = Omit<Users, "id">;
async function signUp(createUserData: CreateUserData) {
  const existingUser = await userRepository.findByEmail(createUserData.email);

  if (existingUser) throw handleErrors.conflictError("email");

  const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

  await userRepository.insert({
    ...createUserData,
    password: hashedPassword,
  });
}

async function signIn(loginData: CreateUserData) {
  const user = await getUser(loginData);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function findById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw handleErrors.notFoundError("user");

  return user;
}

async function getUser(loginData: CreateUserData) {
  const user = await userRepository.findByEmail(loginData.email);
  if (!user) throw handleErrors.unauthorizedError("email");

  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid) throw handleErrors.unauthorizedError("password");

  return user;
}

const userService = { signIn, signUp, findById };
export default userService;
