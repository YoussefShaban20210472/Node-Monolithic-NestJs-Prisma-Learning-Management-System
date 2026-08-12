import path from "path";

export default {
  redisExpiresIn: 15 * 60,
  port: Number(process.env.PORT!),
  host: process.env.HOST,
  server: `http://${process.env.HOST}:${Number(process.env.PORT!)}/`,
  api_key: process.env.API_KEY,
  DIR: path.join(process.cwd(), "storage", "uploads"),
};
