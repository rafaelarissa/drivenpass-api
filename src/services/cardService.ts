import dotenv from "dotenv";
import { Cards } from "@prisma/client";
import cardRepository from "../repositories/cardRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";
import Cryptr from "cryptr";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET);

export type CreateCardData = Omit<Cards, "id">;
async function create(createCardData: CreateCardData, userId: number) {
  await validateTitle(createCardData.title);

  const encryptedPassword = cryptr.encrypt(createCardData.password);
  const encryptedCVV = cryptr.encrypt(createCardData.securityCode);

  await cardRepository.insert({
    userId,
    ...createCardData,
    password: encryptedPassword,
    securityCode: encryptedCVV,
  });
}

async function get(cardId: number, userId: number) {
  await validateUser(userId);

  if (cardId) return await getCredentialById(cardId);

  const cards = await cardRepository.findMany();
  if (!cards) throw handleErrors.notFoundError("card");

  return [...cards];
}

async function getCredentialById(cardId: number) {
  const card = await cardRepository.getById(cardId);

  if (!card) throw handleErrors.notFoundError("card");

  return card;
}

async function validateUser(id: number) {
  const cardUser = await cardRepository.getByUserId(id);

  if (!cardUser) throw handleErrors.badRequestError("card");
}

async function validateTitle(title: string) {
  const card = await cardRepository.getByTitle(title);

  if (card) throw handleErrors.conflictError("title");
}

const cardService = { create, get };
export default cardService;
