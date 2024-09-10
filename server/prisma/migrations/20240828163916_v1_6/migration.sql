/*
  Warnings:

  - You are about to drop the column `blogs_ids` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "blogs_ids",
ADD COLUMN     "blog_ids" TEXT[];
