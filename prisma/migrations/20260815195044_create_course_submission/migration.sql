/*
  Warnings:

  - A unique constraint covering the columns `[assignment_id,student_id]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Submission_assignment_id_student_id_key" ON "Submission"("assignment_id", "student_id");
