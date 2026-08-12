import express from "express";
import { fileMiddleware } from "../middleware/file.middleware";
import upload from "../storage/storage";
import {
  checkFileExists,
  deleteFile,
  downloadFile,
  uploadFile,
} from "../controller/file.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
router.delete("/delete", fileMiddleware("delete"), deleteFile);
router.get("/download", fileMiddleware("download"), downloadFile);
router.post(
  "/upload",
  fileMiddleware("upload"),
  upload.single("file"),
  uploadFile,
);

router.post("/file", authMiddleware, checkFileExists);

export default router;
