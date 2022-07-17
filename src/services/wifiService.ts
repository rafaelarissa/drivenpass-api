import dotenv from "dotenv";
import { Wifi } from "@prisma/client";
import wifiRepository from "../repositories/wifiRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";
import Cryptr from "cryptr";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET);

export type CreateWifiData = Omit<Wifi, "id">;
async function create(createWifiData: CreateWifiData, userId: number) {
  const encryptedPassword = cryptr.encrypt(createWifiData.password);

  await wifiRepository.insert({
    userId,
    ...createWifiData,
    password: encryptedPassword,
  });
}

async function get(wifiId: number, userId: number) {
  await validateUser(userId);

  if (wifiId) return await getWifiById(wifiId);

  const wifis = await wifiRepository.findMany();
  if (!wifis) throw handleErrors.notFoundError("wi-fi");

  return [...wifis];
}

async function getWifiById(wifiId: number) {
  const wifi = await wifiRepository.getById(wifiId);

  if (!wifi) throw handleErrors.notFoundError("wi-fi");

  return wifi;
}

async function deleteWifi(wifiId: number) {
  const wifi = await getWifiById(wifiId);

  await validateUser(wifi.userId);

  await wifiRepository.deleteWifi(wifiId);
}

async function validateUser(id: number) {
  const wifiUser = await wifiRepository.getByUserId(id);

  if (!wifiUser) throw handleErrors.badRequestError("wi-fi");
}

const wifiService = { create, get, deleteWifi };
export default wifiService;
