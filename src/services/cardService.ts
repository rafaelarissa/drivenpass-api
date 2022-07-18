import dotenv from "dotenv";
import { Cards } from "@prisma/client";
import cardRepository from "../repositories/cardRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";
import Cryptr from "cryptr";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET);

export type CreateCardData = Omit<Cards, "id">;
async function create(createCardData: CreateCardData, userId: number) {
  await validateTitle(createCardData.title, userId);

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
  const cardPerUser = await validateUser(userId);

  if (cardId) return getCardById(cardId, cardPerUser);

  return [...cardPerUser];
}

function getCardById(cardId: number, cards: Cards[]) {
  const card = cards.filter((card) => card.id === cardId);

  if (card.length === 0) throw handleErrors.notFoundError("card");

  return card;
}

async function deleteCard(cardId: number, userId: number) {
  const cardsPerUser = await validateUser(userId);

  const card = getCardById(cardId, cardsPerUser);

  await cardRepository.deleteCard(card[0].id);
}

async function validateUser(id: number) {
  const cards = await cardRepository.getByUserId(id);

  if (cards.length === 0) throw handleErrors.badRequestError("user");

  return cards;
}

async function validateTitle(title: string, userId: number) {
  const filterCardsByUserId = await cardRepository.getByUserId(userId);

  const containsTitle = filterCardsByUserId.map((card) => card.title === title);

  if (containsTitle.includes(true)) throw handleErrors.conflictError("title");
}

const cardService = { create, get, deleteCard };
export default cardService;
