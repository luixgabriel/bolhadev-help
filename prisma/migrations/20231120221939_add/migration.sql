-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "usersLikeThisComment" TEXT[] DEFAULT ARRAY[]::TEXT[];
