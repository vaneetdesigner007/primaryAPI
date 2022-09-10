import * as dotenv from "dotenv";
import * as path from "path";

import * as pkg from "../package.json";

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`
  ),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || "development",
  app: {
    version: (pkg as any).version,
    description: (pkg as any).description,
  },
  database: {
    mongo: {
        host: process.env.MONGO_DB_HOST,
        port: process.env.MONGO_DB_PORT,
        collection: process.env.MONGO_DB_NAME,
    },
  },
};
