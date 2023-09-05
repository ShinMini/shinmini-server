/*
  Warnings:

  - You are about to alter the column `jobTitle` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jobTitle" SET DATA TYPE VARCHAR(100);
