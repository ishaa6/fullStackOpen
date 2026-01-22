import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";

import config from "./utils/config.js";
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import logger from "./utils/logger.js";
import { errorHandler, userExtractor } from "./utils/middleware.js";

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/blogs", userExtractor, blogsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  const { default: testingRouter } = await import("./controllers/testing.js");
  app.use("/api/testing", testingRouter);
}

app.use(errorHandler);

export default app;
