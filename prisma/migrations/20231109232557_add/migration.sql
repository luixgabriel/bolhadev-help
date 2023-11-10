/*
  Warnings:

  - A unique constraint covering the columns `[githubToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_githubToken_key" ON "User"("githubToken");
