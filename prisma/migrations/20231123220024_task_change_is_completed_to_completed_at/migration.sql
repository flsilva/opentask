/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Task_dueDate_isCompleted_authorId_projectId_idx";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isCompleted",
ADD COLUMN     "completedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Task_authorId_completedAt_dueDate_projectId_idx" ON "Task"("authorId", "completedAt", "dueDate", "projectId");
