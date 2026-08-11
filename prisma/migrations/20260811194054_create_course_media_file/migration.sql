/*
  Warnings:

  - A unique constraint covering the columns `[file]` on the table `CourseMediaFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file` to the `CourseMediaFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseMediaFile" ADD COLUMN     "file" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseMediaFile_file_key" ON "CourseMediaFile"("file");
