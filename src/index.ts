import connectDB from "./databases/mongo/mongoConnection";
import { app, runServer, loadController } from "./loaders";

connectDB();
runServer();
loadController(app);
