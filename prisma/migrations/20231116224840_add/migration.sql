-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "userLikeThisAnswer" TEXT[] DEFAULT ARRAY[]::TEXT[];
