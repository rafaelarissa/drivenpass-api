import { prisma } from "../config/database.js";
import { CreateSafeNotesData } from "./../services/safeNotesService.js";

async function insert(createSafeNotesData: CreateSafeNotesData) {
  return prisma.safeNotes.create({
    data: createSafeNotesData,
  });
}

async function getByTitle(title: string) {
  return prisma.safeNotes.findFirst({ where: { title } });
}

export default { insert, getByTitle };
