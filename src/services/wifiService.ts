import dotenv from "dotenv";
import { Wifi } from "@prisma/client";
import wifiRepository from "../repositories/wifiRepository.js";
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

const wifiService = { create };
export default wifiService;
