import { Request, Response } from "express";
import * as signedUrlService from "../service/signedUrl.service.js";
import config from "../config/index.js";

export async function generateSignedUploadUrl(req: Request, res: Response) {
  await generateSignedUrl(req, res, "upload");
}
export async function generateSignedDownloadUrl(req: Request, res: Response) {
  await generateSignedUrl(req, res, "download");
}
export async function generateSignedDeleteUrl(req: Request, res: Response) {
  await generateSignedUrl(req, res, "delete");
}

async function generateSignedUrl(
  req: Request,
  res: Response,
  type: "upload" | "download" | "delete",
) {
  const body = req.body;
  const result = await signedUrlService.generateSignedUrl(body, type);
  const server = config.server;
  res.status(200).send({ signedUrl: `${server}${type}?token=${result}` });
}
