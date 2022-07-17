import { SafeNotes } from "@prisma/client";
import safeNotesRepository from "../repositories/safeNotesRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";

export type CreateSafeNotesData = Omit<SafeNotes, "id">;
async function create(
  createSafeNotesData: CreateSafeNotesData,
  userId: number
) {
  await validateTitle(createSafeNotesData.title);

  await safeNotesRepository.insert({
    userId,
    ...createSafeNotesData,
  });
}

async function validateTitle(title: string) {
  const credential = await safeNotesRepository.getByTitle(title);

  if (credential) throw handleErrors.conflictError("title");
}

const safeNotesService = { create };
export default safeNotesService;
