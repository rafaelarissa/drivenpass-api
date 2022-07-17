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

async function get(safeNoteId: number, userId: number) {
  await validateUser(userId);

  if (safeNoteId) return await getSafeNoteById(safeNoteId);

  const safeNotes = await safeNotesRepository.findMany();
  if (!safeNotes) throw handleErrors.notFoundError("safe note");

  return [...safeNotes];
}

async function getSafeNoteById(safeNoteId: number) {
  const safeNote = await safeNotesRepository.getById(safeNoteId);

  if (!safeNote) throw handleErrors.notFoundError("safe note");

  return safeNote;
}

async function deleteSafeNote(safeNoteId: number) {
  const safeNote = await getSafeNoteById(safeNoteId);

  await validateUser(safeNote.userId);

  await safeNotesRepository.deleteSafeNote(safeNoteId);
}

async function validateUser(id: number) {
  const safeNoteUser = await safeNotesRepository.getByUserId(id);

  if (!safeNoteUser) throw handleErrors.badRequestError("safe note");
}

async function validateTitle(title: string) {
  const safeNote = await safeNotesRepository.getByTitle(title);

  if (safeNote) throw handleErrors.conflictError("title");
}

const safeNotesService = { create, get, deleteSafeNote };
export default safeNotesService;
