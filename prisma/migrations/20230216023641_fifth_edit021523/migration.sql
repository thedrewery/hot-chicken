/*
  Warnings:

  - A unique constraint covering the columns `[id,commentedById]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,commentedOnReviewId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_commentedById_key" ON "Comment"("id", "commentedById");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_commentedOnReviewId_key" ON "Comment"("id", "commentedOnReviewId");
