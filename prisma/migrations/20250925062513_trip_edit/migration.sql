/*
  Warnings:

  - You are about to drop the column `startDatr` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "startDatr",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
