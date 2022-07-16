import { prisma } from "../config/database.js";
import { CreateUserData } from "./../services/userService.js";

async function insert(createUserData: CreateUserData) {
  return prisma.users.create({
    data: createUserData,
  });
}

async function findByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

async function findById(id: number) {
  return prisma.users.findUnique({ where: { id } });
}

export default {
  insert,
  findByEmail,
  findById,
};
