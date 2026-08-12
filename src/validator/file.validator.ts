import { z } from "zod";

export function getPDFFileZObject(name: string) {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be string`,
    })
    .regex(/^[0-9a-zA-Z]+\.pdf$/, `${name} is invalid pdf file`);
}
export function getDirectoryZObject(name: string) {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be string`,
    })
    .regex(
      /^(\/|\\)?([0-9a-zA-Z]+(\/|\\)){1,}[0-9a-zA-Z]+(\/|\\)?$/,
      `${name} is invalid directory`,
    );
}

export const fileSchema = z.object({
  file: getPDFFileZObject("file"),
  directory: getDirectoryZObject("directory"),
});
