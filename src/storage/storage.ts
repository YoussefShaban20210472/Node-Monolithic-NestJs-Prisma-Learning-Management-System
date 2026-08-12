import fs from "fs";
import path from "path";
import multer from "multer";
import { Request, Response } from "express";
import config from "../config/index.js";
import { BadRequest } from "../error/business.error.js";

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    let error = req.fileError || null;
    const DIR = config.DIR;
    if (error === null) {
      let dir = path.join(DIR, req.dir!);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    } else {
      cb(error, DIR);
    }
  },

  filename: (req, _, cb) => {
    let filename = req.filename!;
    cb(null, filename);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // allow only specific file types
  const allowedTypes = ["application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequest("Invalid file type"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

export default upload;
