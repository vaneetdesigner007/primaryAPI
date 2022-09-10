import { env } from "../../env";

let mongoose = require("mongoose");

const host = env.database.mongo.host;
const port = env.database.mongo.port;
const collection = env.database.mongo.collection;

const connectDB = () => {
  mongoose
    .connect(`mongodb://${host}:${port}/${collection}`)
    .then(async () => {
      console.log("Database connection successful");
    })
    .catch((err: Error) => {
      console.error("Database connection error", err);
    });
};

export default connectDB;
