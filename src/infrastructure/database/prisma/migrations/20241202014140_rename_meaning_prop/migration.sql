/*
  Warnings:

  - You are about to drop the column `part_of_Speech` on the `Meaning` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word_id,part_of_speech]` on the table `Meaning` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word_id,text]` on the table `Phonetic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `part_of_speech` to the `Meaning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meaning" DROP COLUMN "part_of_Speech",
ADD COLUMN     "part_of_speech" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Meaning_word_id_part_of_speech_key" ON "Meaning"("word_id", "part_of_speech");

-- CreateIndex
CREATE UNIQUE INDEX "Phonetic_word_id_text_key" ON "Phonetic"("word_id", "text");
