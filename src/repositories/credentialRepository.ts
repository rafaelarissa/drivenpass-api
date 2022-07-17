import { prisma } from "./../config/database.js";
import { CreateCredentialData } from "./../services/credentialService.js";

async function insert(createCredentialData: CreateCredentialData) {
  return prisma.crendentials.create({
    data: createCredentialData,
  });
}

async function getByTitle(title: string) {
  return prisma.crendentials.findUnique({ where: { title } });
}

async function findMany() {
  return prisma.crendentials.findMany();
}

async function getById(id: number) {
  return prisma.crendentials.findUnique({ where: { id } });
}

async function getByUserId(userId: number) {
  return prisma.crendentials.findFirst({ where: { userId } });
}

export default { insert, getByTitle, findMany, getById, getByUserId };
