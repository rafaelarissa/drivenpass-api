import { CreateWifiData } from "./../services/wifiService.js";
import { prisma } from "../config/database.js";

async function insert(createWifiData: CreateWifiData) {
  return prisma.wifi.create({
    data: createWifiData,
  });
}

async function findMany() {
  return prisma.wifi.findMany();
}

async function getById(id: number) {
  return prisma.wifi.findUnique({ where: { id } });
}

async function getByUserId(userId: number) {
  return prisma.wifi.findMany({ where: { userId } });
}

async function deleteWifi(id: number) {
  return prisma.wifi.delete({ where: { id } });
}

export default { insert, findMany, getById, getByUserId, deleteWifi };
