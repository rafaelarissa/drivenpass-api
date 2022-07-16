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

export default { insert, getByTitle };
