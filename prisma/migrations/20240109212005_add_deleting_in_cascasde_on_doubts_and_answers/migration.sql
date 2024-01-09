-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_doubtsId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_answerId_fkey";

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_doubtsId_fkey" FOREIGN KEY ("doubtsId") REFERENCES "Doubts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
