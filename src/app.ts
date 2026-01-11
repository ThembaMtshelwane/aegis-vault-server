import express, { type Application } from "express";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import routes from "./router/index.js";
import { connectDatabase } from "./config/database.js";
import ENV_VARS from "./consts/env.consts.js";

const app: Application = express();

// Connect to DB (Vercel will reuse this connection across lambda calls)
connectDatabase(ENV_VARS.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

// Vercel needs the app instance exported as default
export default app;
