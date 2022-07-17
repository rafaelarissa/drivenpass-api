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

async function findMany() {
  return prisma.safeNotes.findMany();
}

async function getById(id: number) {
  return prisma.safeNotes.findUnique({ where: { id } });
}

async function getByUserId(userId: number) {
  return prisma.safeNotes.findFirst({ where: { userId } });
}

async function deleteSafeNote(id: number) {
  return prisma.safeNotes.delete({ where: { id } });
}

export default {
  insert,
  getByTitle,
  findMany,
  getById,
  getByUserId,
  deleteSafeNote,
};
