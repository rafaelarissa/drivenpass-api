import { Users } from "@prisma/client";
import userRepository from "../repositories/userRepository.js";

export type CreateUserData = Omit<Users, "id">;
async function create(createUserData: CreateUserData) {
  await userRepository.insert(createUserData);
}

const userService = { create };
export default userService;
