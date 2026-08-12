-- CreateTable
CREATE TABLE "AssignmentMediaFile" (
    "file" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignment_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentMediaFile_file_key" ON "AssignmentMediaFile"("file");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentMediaFile_path_key" ON "AssignmentMediaFile"("path");

-- AddForeignKey
ALTER TABLE "AssignmentMediaFile" ADD CONSTRAINT "AssignmentMediaFile_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
