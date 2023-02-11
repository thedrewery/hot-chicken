-- CreateEnum
CREATE TYPE "RATING" AS ENUM ('CHICKEN', 'CHICKEN_CHICKEN', 'CHICKEN_CHICKEN_CHICKEN', 'CHICKEN_CHICKEN_CHICKEN_CHICKEN', 'CHICKEN_CHICKEN_CHICKEN_CHICKEN_CHICKEN');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "establishment" STRING NOT NULL,
    "address" STRING NOT NULL,
    "description" STRING,
    "body" STRING NOT NULL,
    "rating" "RATING",
    "reviewedById" STRING NOT NULL,
    "public" BOOL NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" STRING NOT NULL,
    "commentedById" STRING NOT NULL,
    "commentedOnReviewId" STRING NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedById_fkey" FOREIGN KEY ("commentedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedOnReviewId_fkey" FOREIGN KEY ("commentedOnReviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
