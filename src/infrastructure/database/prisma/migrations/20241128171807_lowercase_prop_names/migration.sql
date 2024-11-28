/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Auth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropIndex
DROP INDEX "Auth_userId_key";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_user_id_key" ON "Auth"("user_id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
