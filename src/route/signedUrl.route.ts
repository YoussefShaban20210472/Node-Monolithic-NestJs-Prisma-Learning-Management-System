import express from "express";
import {
  generateSignedDeleteUrl,
  generateSignedDownloadUrl,
  generateSignedUploadUrl,
} from "../controller/signedUrl.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
router.use(authMiddleware);
router.post("/upload/signedUrl", generateSignedUploadUrl);
router.post("/download/signedUrl", generateSignedDownloadUrl);
router.post("/delete/signedUrl", generateSignedDeleteUrl);

export default router;
