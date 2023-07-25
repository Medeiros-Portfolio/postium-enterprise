/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `loginToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
ADD COLUMN     "loginToken" TEXT NOT NULL,
ADD COLUMN     "loginTokenExpiresAt" TIMESTAMP(3),
ALTER COLUMN "salt" DROP NOT NULL;
