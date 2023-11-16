/*
  Warnings:

  - You are about to drop the column `userLikeThisAnswer` on the `Answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "userLikeThisAnswer",
ADD COLUMN     "usersLikeThisAnswer" TEXT[] DEFAULT ARRAY[]::TEXT[];
