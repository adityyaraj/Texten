/*
  Warnings:

  - You are about to drop the column `imageKey` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageKey",
DROP COLUMN "imageName",
ADD COLUMN     "title" TEXT NOT NULL;
