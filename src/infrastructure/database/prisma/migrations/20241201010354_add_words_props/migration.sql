/*
  Warnings:

  - You are about to drop the column `number` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "number",
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "phonetic" TEXT;

-- CreateTable
CREATE TABLE "Phonetic" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "audio" TEXT,
    "word_id" TEXT NOT NULL,

    CONSTRAINT "Phonetic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meaning" (
    "id" TEXT NOT NULL,
    "part_of_Speech" TEXT NOT NULL,
    "word_id" TEXT NOT NULL,

    CONSTRAINT "Meaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Definition" (
    "id" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "example" TEXT,
    "meaning_id" TEXT NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Synonym" (
    "id" TEXT NOT NULL,
    "synonym" TEXT NOT NULL,
    "definition_id" TEXT NOT NULL,

    CONSTRAINT "Synonym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antonym" (
    "id" TEXT NOT NULL,
    "antonym" TEXT NOT NULL,
    "definition_id" TEXT NOT NULL,

    CONSTRAINT "Antonym_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phonetic" ADD CONSTRAINT "Phonetic_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meaning" ADD CONSTRAINT "Meaning_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_meaning_id_fkey" FOREIGN KEY ("meaning_id") REFERENCES "Meaning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_definition_id_fkey" FOREIGN KEY ("definition_id") REFERENCES "Definition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antonym" ADD CONSTRAINT "Antonym_definition_id_fkey" FOREIGN KEY ("definition_id") REFERENCES "Definition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
