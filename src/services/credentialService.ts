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
  await validateTitle(createCredentialData.title, userId);

  const encryptedPassword = cryptr.encrypt(createCredentialData.password);

  await credentialRepository.insert({
    userId,
    ...createCredentialData,
    password: encryptedPassword,
  });
}

async function get(credentialId: number, userId: number) {
  const credentialPerUser = await validateUser(userId);

  if (credentialId) return getCredentialById(credentialId, credentialPerUser);

  credentialPerUser.map((credential) => {
    credential.password = decryptPassword(credential.password);
  });

  return { ...credentialPerUser };
}

function getCredentialById(credentialId: number, credentials: Crendentials[]) {
  const credential = credentials.filter(
    (credential) => credential.id === credentialId
  );

  if (credential.length === 0) throw handleErrors.notFoundError("credential");

  credential.map((credential) => {
    credential.password = decryptPassword(credential.password);
  });

  return credential;
}

async function deleteCredential(credentialId: number, userId: number) {
  const credentialsPerUser = await validateUser(userId);

  const credential = getCredentialById(credentialId, credentialsPerUser);

  await credentialRepository.deleteCredential(credential[0].id);
}

function decryptPassword(password: string) {
  const decryptedPassword = cryptr.decrypt(password);

  return decryptedPassword;
}

async function validateUser(id: number) {
  const credentials = await credentialRepository.getByUserId(id);

  if (credentials.length === 0) throw handleErrors.badRequestError("user");

  return credentials;
}

async function validateTitle(title: string, userId: number) {
  const filterCredentialsByUserId = await credentialRepository.getByUserId(
    userId
  );

  const containsTitle = filterCredentialsByUserId.map(
    (credential) => credential.title === title
  );

  if (containsTitle.includes(true)) throw handleErrors.conflictError("title");
}

const credentialService = { create, get, deleteCredential };
export default credentialService;
