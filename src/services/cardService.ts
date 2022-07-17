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

async function validateTitle(title: string) {
  const card = await cardRepository.getByTitle(title);

  if (card) throw handleErrors.conflictError("title");
}

const cardService = { create };
export default cardService;
