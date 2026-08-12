import config from "../config";
import { Confilct, ObjectNotFound } from "../error/business.error";
import fs from "fs";
import path from "path";
import { assertToken } from "./token.service";
import { fileSchema } from "../validator/file.validator";
const DIR = config.DIR;
export async function assertFile(
  token: unknown,
  type: "upload" | "download" | "delete",
) {
  const dir = await assertToken(token, type);

  const filePath = path.join(DIR, dir);
  assertFileOperation(filePath, type);
  const fileDir = path.dirname(dir);
  const filename = path.basename(dir);
  return { fileDir, filename };
}
function assertFileExists(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new ObjectNotFound("File");
  }
}
function assertFileNotExists(filePath: string) {
  if (fs.existsSync(filePath)) {
    throw new Confilct("The file already exists");
  }
}
export function assertFileOperation(
  filePath: string,
  type: "upload" | "download" | "delete",
) {
  if (type === "upload") {
    assertFileNotExists(filePath);
  } else {
    assertFileExists(filePath);
  }
}

export function checkFileExists(body: { file: string; directory: string }) {
  fileSchema.parse(body);
  const file = body.file;
  const directory = body.directory;
  const dir = path.join(DIR, directory, file);
  return fs.existsSync(dir);
}
