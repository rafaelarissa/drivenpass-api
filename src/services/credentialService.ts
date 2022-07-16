import dotenv from "dotenv";
import { Crendentials } from "@prisma/client";
import credentialRepository from "../repositories/credentialRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";
import Cryptr from "cryptr";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET);

export type CreateCredentialData = Omit<Crendentials, "id">;
async function create(
  createCredentialData: CreateCredentialData,
  userId: number
) {
  const title = await credentialRepository.getByTitle(
    createCredentialData.title
  );

  if (title) throw handleErrors.conflictError("title");

  const encryptedPassword = cryptr.encrypt(createCredentialData.password);

  await credentialRepository.insert({
    userId,
    ...createCredentialData,
    password: encryptedPassword,
  });
}

const credentialService = { create };
export default credentialService;
