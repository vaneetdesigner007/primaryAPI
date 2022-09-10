import { Application } from "express";
import { IconsController } from "../api/controllers";

const loadController = (app: Application) => {
  const routes = [
    ["vaccine-summary", IconsController.router],
    ["icon", IconsController.router],
  ];

  routes.forEach(([route, controller]) =>
    app.use(`/${route}`, controller as any)
  );
};

export default loadController;
