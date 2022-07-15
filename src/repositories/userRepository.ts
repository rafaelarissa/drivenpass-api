import { prisma } from "../config/database.js";
import { CreateUserData } from "./../services/userService.js";

async function insert(createUserData: CreateUserData) {
  await prisma.users.create({
    data: createUserData,
  });
}

async function findByEmail(email: string) {
  const user = await prisma.users.findUnique({ where: { email } });

  return user;
}

async function findById(id: number) {
  const user = await prisma.users.findUnique({ where: { id } });

  return user;
}

export default {
  insert,
  findByEmail,
  findById,
};
