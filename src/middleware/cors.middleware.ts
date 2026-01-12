import cors, { type CorsOptions } from "cors";
import ENV_VARS from "../consts/env.consts.js";

const getAllowedOrigins = (): string[] => {
  const origins = [
    "http://localhost:3000",
    "https://aegis-vault-seven.vercel.app",
  ];
  // if (ENV_VARS.NODE_ENV === "production") {
  //   origins.push(ENV_VARS.CLIENT_URL);
  // }
  return origins;
};

const corsOptions: CorsOptions = {
  origin: getAllowedOrigins(),
  methods: ["GET", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);