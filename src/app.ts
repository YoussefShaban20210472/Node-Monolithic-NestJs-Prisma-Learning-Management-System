import express from "express";
import { errorAppHandler } from "./middleware/error.middleware";
import signedUrlRoute from "./route/signedUrl.route.js";
import fileRoute from "./route/file.route.js";
const app = express();

app.use(express.json());

app.use(fileRoute);

app.use(signedUrlRoute);

app.use(errorAppHandler);
export default app;
