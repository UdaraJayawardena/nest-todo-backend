/*
  Warnings:

  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `number` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "phone",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
