import { Request, Response } from "express";
import config from "../config/index.js";
import path from "path";
import { promises as fs } from "fs";
import * as fileService from "../service/file.service.js";

const DIR = config.DIR;
export async function deleteFile(req: Request, res: Response) {
  let file = path.join(DIR, req.dir!, req.filename!);
  await fs.unlink(file);
  res.status(200).send({ message: "file deleted successfully" });
}

export async function downloadFile(req: Request, res: Response) {
  let file = path.join(DIR, req.dir!, req.filename!);
  res.sendFile(file);
}

export async function uploadFile(req: Request, res: Response) {
  res.status(200).send({ message: "file uploaded successfully" });
}
export async function checkFileExists(req: Request, res: Response) {
  const body = req.body;
  const result = await fileService.checkFileExists(body);
  res.status(200).send({ isFileExsited: result });
}
