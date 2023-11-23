/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_isArchived_authorId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isArchived",
ADD COLUMN     "archivedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Project_archivedAt_authorId_idx" ON "Project"("archivedAt", "authorId");
