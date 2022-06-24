/*
  Warnings:

  - Added the required column `firstName` to the `UserModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT E'FEMALE',
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL DEFAULT E'NaN';
