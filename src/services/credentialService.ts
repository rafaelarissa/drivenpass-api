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
  await validateTitle(createCredentialData.title);

  const encryptedPassword = cryptr.encrypt(createCredentialData.password);

  await credentialRepository.insert({
    userId,
    ...createCredentialData,
    password: encryptedPassword,
  });
}

async function get(credentialId: number, userId: number) {
  await validateUser(userId);

  if (credentialId) return await getCredentialById(credentialId);

  const credentials = await credentialRepository.findMany();
  if (!credentials) throw handleErrors.notFoundError("credential");

  credentials.map((credential) => {
    credential.password = decryptPassword(credential.password);
  });

  return { ...credentials };
}

async function getCredentialById(credentialId: number) {
  const credential = await credentialRepository.getById(credentialId);

  if (!credential) throw handleErrors.notFoundError("credential");

  const decryptedPassword = decryptPassword(credential.password);

  return { ...credential, password: decryptedPassword };
}

async function deleteCredential(credentialId: number) {
  const credential = await getCredentialById(credentialId);

  await validateUser(credential.userId);

  await credentialRepository.deleteCredential(credentialId);
}

function decryptPassword(password: string) {
  const decryptedPassword = cryptr.decrypt(password);

  return decryptedPassword;
}

async function validateUser(id: number) {
  const credentialUser = await credentialRepository.getByUserId(id);

  if (!credentialUser) throw handleErrors.badRequestError("credential");
}

async function validateTitle(title: string) {
  const credential = await credentialRepository.getByTitle(title);

  if (credential) throw handleErrors.conflictError("title");
}

const credentialService = { create, get, deleteCredential };
export default credentialService;
