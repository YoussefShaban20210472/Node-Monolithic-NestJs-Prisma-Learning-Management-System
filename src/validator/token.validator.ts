import { z } from "zod";

export function getTokenZObject(name: string) {
  return z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${name} is required`
          : `${name} must be string`,
    })
    .regex(/^([0-9a-zA-Z]+\-){4}[0-9a-zA-Z]+$/, `${name} is invalid token`);
}

export const tokenSchema = z.object({
  token: getTokenZObject("token"),
});
