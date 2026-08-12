import redis from "../cache/redis";
import { Confilct, ObjectNotFound } from "../error/business.error";
import { tokenSchema } from "../validator/token.validator";

export async function assertToken(
  token: unknown,
  type: "upload" | "download" | "delete",
) {
  tokenSchema.parse({ token });
  const dir = await redis.get(`${type}:${token}`);
  if (dir === null) {
    throw new ObjectNotFound("File");
  }
  return dir;
}
