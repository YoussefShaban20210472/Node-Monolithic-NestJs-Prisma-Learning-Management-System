import redis from "../cache/redis";
import path from "path";
import { assertFileOperation } from "./file.service";
import { fileSchema } from "../validator/file.validator";
import config from "../config";
export async function generateSignedUrl(
  body: {
    file: string;
    directory: string;
  },
  type: "upload" | "download" | "delete",
) {
  fileSchema.parse(body);
  const file = body.file;
  const directory = body.directory;
  const dir = path.join(directory, file);
  const DIR = config.DIR;
  const filePath = path.join(DIR, directory, file);
  assertFileOperation(filePath, type);
  const id = crypto.randomUUID();
  const key = `${type}:${id}`;
  await redis.set(key, dir);
  return id;
}
