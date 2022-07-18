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
  const wifiPerUser = await validateUser(userId);

  if (wifiId) return getWifiById(wifiId, wifiPerUser);

  return [...wifiPerUser];
}

function getWifiById(wifiId: number, wifis: Wifi[]) {
  const wifi = wifis.filter((wifi) => wifi.id === wifiId);

  if (wifi.length === 0) throw handleErrors.notFoundError("wi-fi");

  return wifi;
}

async function deleteWifi(wifiId: number, userId: number) {
  const wifiPerUser = await validateUser(userId);

  const wifi = getWifiById(wifiId, wifiPerUser);

  await wifiRepository.deleteWifi(wifi[0].id);
}

async function validateUser(id: number) {
  const wifi = await wifiRepository.getByUserId(id);

  if (wifi.length === 0) throw handleErrors.badRequestError("user");

  return wifi;
}

const wifiService = { create, get, deleteWifi };
export default wifiService;
