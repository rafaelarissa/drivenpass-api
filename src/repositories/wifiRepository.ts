import { CreateWifiData } from "./../services/wifiService.js";
import { prisma } from "../config/database.js";

async function insert(createWifiData: CreateWifiData) {
  return prisma.wifi.create({
    data: createWifiData,
  });
}

export default { insert };
