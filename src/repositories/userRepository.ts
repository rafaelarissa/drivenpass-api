import { prisma } from "../config/database.js";
import { CreateUserData } from "./../services/userService.js";

async function insert(createUserData: CreateUserData) {
  await prisma.users.create({
    data: createUserData,
  });
}

export default {
  insert,
};
