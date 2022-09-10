import multer from "multer";
import fs from "fs";
import { promisify } from "util";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${file.originalname.split(".").pop()}`
    );
  },
});

export const unlinkAsync = promisify(fs.unlink);

export default multer({
  storage: storage,
  fileFilter: (req: any, file: any, cb: any) => {
    if (["image/png", "image/svg+xml"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type png/svg"), false);
    }
  },
});
