-- CreateTable
CREATE TABLE "CourseMediaFile" (
    "path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseMediaFile_path_key" ON "CourseMediaFile"("path");

-- AddForeignKey
ALTER TABLE "CourseMediaFile" ADD CONSTRAINT "CourseMediaFile_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
