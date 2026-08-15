-- CreateTable
CREATE TABLE "SubmissionMediaFile" (
    "file" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submission_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionMediaFile_file_key" ON "SubmissionMediaFile"("file");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionMediaFile_path_key" ON "SubmissionMediaFile"("path");

-- AddForeignKey
ALTER TABLE "SubmissionMediaFile" ADD CONSTRAINT "SubmissionMediaFile_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
