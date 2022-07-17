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

export default { insert, getByTitle };
