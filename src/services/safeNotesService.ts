import { SafeNotes } from "@prisma/client";
import safeNotesRepository from "../repositories/safeNotesRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";

export type CreateSafeNotesData = Omit<SafeNotes, "id">;
async function create(
  createSafeNotesData: CreateSafeNotesData,
  userId: number
) {
  await validateTitle(createSafeNotesData.title, userId);

  await safeNotesRepository.insert({
    userId,
    ...createSafeNotesData,
  });
}

async function get(safeNoteId: number, userId: number) {
  const safeNotePerUser = await validateUser(userId);

  if (safeNoteId) return getSafeNoteById(safeNoteId, safeNotePerUser);

  return [...safeNotePerUser];
}

function getSafeNoteById(safeNoteId: number, safeNotes: SafeNotes[]) {
  const safeNote = safeNotes.filter((safeNote) => safeNote.id === safeNoteId);

  if (safeNote.length === 0) throw handleErrors.notFoundError("safe note");

  return safeNote;
}

async function deleteSafeNote(safeNoteId: number, userId: number) {
  const safeNotesPerUser = await validateUser(userId);

  const safeNote = getSafeNoteById(safeNoteId, safeNotesPerUser);

  await safeNotesRepository.deleteSafeNote(safeNote[0].id);
}

async function validateUser(id: number) {
  const safeNotes = await safeNotesRepository.getByUserId(id);

  if (safeNotes.length === 0) throw handleErrors.badRequestError("user");

  return safeNotes;
}

async function validateTitle(title: string, userId: number) {
  const filterSafeNotesByUserId = await safeNotesRepository.getByUserId(userId);

  const containsTitle = filterSafeNotesByUserId.map(
    (safeNote) => safeNote.title === title
  );

  if (containsTitle.includes(true)) throw handleErrors.conflictError("title");
}

const safeNotesService = { create, get, deleteSafeNote };
export default safeNotesService;
