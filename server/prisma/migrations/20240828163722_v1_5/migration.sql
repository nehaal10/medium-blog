/*
  Warnings:

  - You are about to drop the column `blog_ids` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "blog_ids",
ADD COLUMN     "blogs_ids" TEXT[];
