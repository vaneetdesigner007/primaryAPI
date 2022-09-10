import { Request, Response, Router } from "express";
import { IconsService } from "../services/IconsService";
import uploadIcon from "../middlewares/multer";

export class IconsController {
  public router = Router();

  constructor(private iconsService: IconsService) {
    this.setRoutes();
  }

  public setRoutes() {
    // this.router.get("/", (req: Request, res: Response) => {
    //   return this.iconsService.getVaccineSummary(req, res);
    // });

    this.router.post(
      "/",
      uploadIcon.fields([
        {
          name: "iconPng",
          maxCount: 1,
        },
        {
          name: "iconSvg",
          maxCount: 1,
        },
      ]),
      (req: Request, res: Response) => {
        return this.iconsService.addPngIcon(req, res);
      }
    );

    this.router.get("/", (req: Request, res: Response) => {
      return this.iconsService.getIcons(req, res);
    });

    this.router.delete("/:id", (req: Request, res: Response) => {
      return this.iconsService.deleteIcon(req, res);
    });
  }
}

export default new IconsController(new IconsService());
