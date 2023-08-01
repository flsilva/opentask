-- CreateTable
CREATE TABLE "Project" (
    "id" VARCHAR(32) NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "description" VARCHAR(2000),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "authorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_isArchived_authorId_idx" ON "Project"("isArchived", "authorId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
