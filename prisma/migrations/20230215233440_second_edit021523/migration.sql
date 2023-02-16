/*
  Warnings:

  - A unique constraint covering the columns `[id,reviewedById]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_id_reviewedById_key" ON "Review"("id", "reviewedById");
