/*
  Warnings:

  - Made the column `description` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "Review" ALTER COLUMN "rating" SET NOT NULL;
