/*
  Warnings:

  - You are about to drop the column `githubToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_githubToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubToken";
