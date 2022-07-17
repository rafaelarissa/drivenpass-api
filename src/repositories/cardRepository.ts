import { prisma } from "../config/database.js";
import { CreateCardData } from "../services/cardService.js";

async function insert(createCardData: CreateCardData) {
  return prisma.cards.create({
    data: createCardData,
  });
}

async function getByTitle(title: string) {
  return prisma.cards.findFirst({ where: { title } });
}

async function findMany() {
  return prisma.cards.findMany();
}

async function getById(id: number) {
  return prisma.cards.findUnique({ where: { id } });
}

async function getByUserId(userId: number) {
  return prisma.cards.findFirst({ where: { userId } });
}

export default { insert, getByTitle, findMany, getById, getByUserId };
