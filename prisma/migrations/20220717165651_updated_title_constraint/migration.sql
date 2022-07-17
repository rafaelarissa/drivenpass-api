/*
  Warnings:

  - The values [DEBIT,CREDIT,BOTH] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('debit', 'credit', 'multiple');
ALTER TABLE "cards" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- DropIndex
DROP INDEX "cards_title_key";

-- DropIndex
DROP INDEX "credentials_title_key";

-- DropIndex
DROP INDEX "safeNotes_title_key";

-- DropIndex
DROP INDEX "wifi's_title_key";
