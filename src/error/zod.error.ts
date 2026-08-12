import { ZodError } from "zod";
export function handleZodError(error: ZodError): {
  status: number;
  message: string;
} {
  let errors = [];
  for (const issue of error.issues) {
    if (issue.path[0] !== undefined) errors.push(issue.message);
    else errors.push("Content-Type must be application/json");
  }
  return { message: errors.join("\n"), status: 400 };
}
