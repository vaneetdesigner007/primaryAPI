import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app: Application = express();
app.use('/uploads', express.static('uploads'));
// receive requests with data in json format OF LIMIT 100mb
app.use(bodyParser.json({ limit: "100mb" }));
// receive requests with data in x-www-form-urlencoded format
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Enables cors
app.use(cors());

const runServer = () => {
  app.listen(7000, () => console.log(`Listening on port ${7000}`));
};

export { app, runServer };
